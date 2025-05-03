"use client";

import { useState, useEffect, useRef } from "react";

import {
  Video,
  PhoneOff,
  Mic,
  MicOff,
  MessageSquare,
  Send,
  Loader,
  UserRound,
  Languages,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Languages available for exchange
const languages = [
  { name: "Croatian", flag: "/hr.svg", code: "hr" },
  { name: "Spanish", flag: "/es.svg", code: "es" },
  { name: "French", flag: "/fr.svg", code: "fr" },
  { name: "Italian", flag: "/it.svg", code: "it" },
  { name: "Japanese", flag: "/jp.svg", code: "jp" },
];

// Define the UI states
type ExchangeState = "selecting" | "waiting" | "connected";

// Chat message type
type ChatMessage = {
  id: string;
  sender: "me" | "partner";
  text: string;
  timestamp: Date;
};

export default function LanguageExchangePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // State for selected language
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  // State for the UI flow
  const [exchangeState, setExchangeState] =
    useState<ExchangeState>("selecting");
  // State for partner information
  const [partner, setPartner] = useState<{
    name: string;
    image: string;
  } | null>(null);
  // State for chat messages
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  // State for the current message being typed
  const [currentMessage, setCurrentMessage] = useState("");
  // State for media controls
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  // References for video elements
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Reference for chat container to auto-scroll
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Function to start looking for a partner
  const startMatching = () => {
    if (!selectedLanguage) return;

    setExchangeState("waiting");

    // Simulate finding a partner after a delay
    setTimeout(() => {
      const partnerNames = ["Moh"];
      // , "Sato", "Pierre"];
      const randomName =
        partnerNames[Math.floor(Math.random() * partnerNames.length)];

      setPartner({
        name: randomName,
        image: `mascot.svg`,
      });
      setExchangeState("connected");

      // In a real implementation, this would initialize WebRTC connection
    }, 3000);
  };

  // Function to end the call
  const endCall = () => {
    setExchangeState("selecting");
    setPartner(null);
    setMessages([]);

    // In a real implementation, this would close the WebRTC connection
  };

  // Function to toggle mic
  const toggleMic = () => {
    setIsMuted(!isMuted);
    // In a real implementation, this would mute the WebRTC audio track
  };

  // Function to toggle video
  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    // In a real implementation, this would disable the WebRTC video track
  };

  // Function to send a message
  const sendMessage = () => {
    if (!currentMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "me",
      text: currentMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setCurrentMessage("");

    // Mock response from partner after a short delay
    setTimeout(() => {
      const partnerResponses = [
        "Salut ! Je viens de [ton pays]",
        "J'ai toujours été fasciné par la culture",
        "Mon mot préféré jusqu'à présent est 'bonjour' parce que c'est le premier que j'ai appris !",
        "Pas encore, mais j'aimerais essayer un jour",
        "Je pense que c'est amusant d'apprendre de nouveaux mots et d'essayer de les utiliser dans des phrases !",
        "J'essaie de me fixer de petits objectifs et de célébrer quand je les atteins",
      ];

      const sequentialResponse =
        partnerResponses[currentIndex % partnerResponses.length];

      const responseMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "partner",
        text: sequentialResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, responseMessage]);

      // Move to next question/response pair
      setCurrentIndex((prev) => prev + 1);
    }, 1500);
  };

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Set up camera when connected
  useEffect(() => {
    /* Original stream code commented out for demo */

    if (exchangeState === "connected") {
      // For local video, use the actual camera and mic
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = mediaStream;
          }
        })
        .catch((err) => {
          console.error("Error accessing camera:", err);
          // Fallback to placeholder if camera access fails
          setupImagePlaceholder(
            localVideoRef,
            "Your Video (Camera access failed)"
          );
        });

      // For remote video, use image placeholder
      const setupImagePlaceholder = (
        videoRef: React.RefObject<HTMLVideoElement>,
        label: string
      ) => {
        if (videoRef.current) {
          const canvas = document.createElement("canvas");
          canvas.width = 640;
          canvas.height = 480;
          const ctx = canvas.getContext("2d");

          if (ctx) {
            // Create an image element and draw it on the canvas
            const img = new window.Image();
            img.onload = () => {
              // Draw the image to fill the canvas
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

              // Add label text if needed
              ctx.font = "24px sans-serif";
              ctx.fillStyle = "white";
              ctx.fillText(label, canvas.width / 2 - 100, canvas.height - 30);

              // Create a stream from the canvas
              const placeholderStream = canvas.captureStream(1);
              videoRef.current!.srcObject = placeholderStream;
            };

            // Set the image source - assuming it's in the public directory
            img.src = "/moh-call.png";
          }
        }
      };

      // Setup placeholder for remote video only
      setupImagePlaceholder(remoteVideoRef, "Partner Video");
    }

    // Cleanup function
    return () => {
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const tracks = (
          localVideoRef.current.srcObject as MediaStream
        ).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [exchangeState]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-extrabold text-gray-800">
        <Languages className="mr-2 inline-block text-green-600" size={32} />
        Language Exchange
        {exchangeState !== "selecting" && (
          <span className="ml-2 text-base font-normal text-gray-500">
            • {languages.find((l) => l.code === selectedLanguage)?.name}
          </span>
        )}
      </h1>

      {/* Language Selection Screen */}
      {exchangeState === "selecting" && (
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 rounded-xl bg-green-50 p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Connect with language learners around the world
            </h2>
            <p className="mb-2 text-lg text-gray-600">
              Practice your language skills with native speakers and fellow
              learners.
            </p>
            <p className="text-gray-600">
              Choose your target language and we&apos;ll match you with someone
              to chat with!
            </p>
          </div>

          <h3 className="mb-6 text-center text-xl font-bold text-gray-800">
            Select a language
          </h3>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {languages.map((language) => (
              <div
                key={language.code}
                className={`
                  flex cursor-pointer flex-col items-center rounded-xl p-6 transition-all
                  ${
                    selectedLanguage === language.code
                      ? "border-2 border-green-500 bg-green-100 shadow-md"
                      : "border border-gray-200 bg-white hover:border-green-300 hover:shadow-sm"
                  }
                `}
                onClick={() => setSelectedLanguage(language.code)}
              >
                <div className="mb-4 rounded-md border border-gray-100 p-1">
                  <Image
                    src={language.flag}
                    alt={language.name}
                    width={70}
                    height={53}
                    className="rounded-md"
                  />
                </div>
                <h4 className="font-medium text-gray-800">{language.name}</h4>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={startMatching}
              disabled={!selectedLanguage}
              className={
                !selectedLanguage ? "cursor-not-allowed opacity-50" : ""
              }
            >
              Start Matching
            </Button>
          </div>
        </div>
      )}

      {/* Waiting for Match Screen */}
      {exchangeState === "waiting" && (
        <div className="mx-auto max-w-md rounded-xl bg-white p-10 text-center shadow-md">
          <Loader className="mx-auto mb-8 h-16 w-16 animate-spin text-green-600" />
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Looking for a partner...
          </h2>
          <p className="mb-10 text-gray-600">
            We&apos;re searching for someone who wants to practice{" "}
            <span className="font-medium text-gray-800">
              {languages.find((l) => l.code === selectedLanguage)?.name}
            </span>
          </p>
          <Button
            variant="secondary"
            onClick={() => setExchangeState("selecting")}
            className="px-6"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </div>
      )}

      {/* Connected/Call Screen */}
      {exchangeState === "connected" && partner && (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Video call area */}
          <div className="lg:col-span-2">
            <Card className="h-full w-full overflow-hidden border-gray-200">
              <div className="relative h-[70vh] w-full bg-gray-900">
                {/* Remote video (fullscreen) */}
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="h-full w-full object-cover"
                />

                {/* Local video (picture-in-picture) */}
                <div className="absolute bottom-4 right-4 h-28 w-36 overflow-hidden rounded-lg border-2 border-white shadow-lg">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="h-full w-full object-cover"
                  />
                  {isVideoOff && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                      <UserRound className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Control buttons */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform items-center space-x-5">
                  <Button
                    onClick={toggleMic}
                    variant={isMuted ? "danger" : "secondary"}
                    size="icon"
                    className="h-12 w-12 rounded-full shadow-lg"
                  >
                    {isMuted ? <MicOff /> : <Mic />}
                  </Button>

                  <Button
                    onClick={endCall}
                    variant="danger"
                    size="icon"
                    className="h-14 w-14 rounded-full shadow-lg"
                  >
                    <PhoneOff />
                  </Button>

                  <Button
                    onClick={toggleVideo}
                    variant={isVideoOff ? "danger" : "secondary"}
                    size="icon"
                    className="h-12 w-12 rounded-full shadow-lg"
                  >
                    <Video />
                  </Button>
                </div>

                {/* Partner info */}
                <div className="absolute left-4 top-4 flex items-center rounded-full bg-black bg-opacity-50 px-4 py-1.5">
                  <div className="mr-2 h-8 w-8 overflow-hidden rounded-full">
                    <Image
                      src={partner.image}
                      alt={partner.name}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-white">{partner.name}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Chat area */}
          <div className="lg:col-span-1">
            <Card className="flex h-[70vh] w-full flex-col border-gray-200">
              <div className="bg-green-600 px-4 py-3 text-white">
                <div className="flex items-center">
                  <MessageSquare className="mr-2" size={18} />
                  <h3 className="font-medium">Chat with {partner.name}</h3>
                </div>
              </div>

              {/* Messages container */}
              <div
                ref={chatContainerRef}
                className="flex-grow space-y-4 overflow-y-auto p-4"
              >
                {messages.length === 0 ? (
                  <div className="flex h-full items-center justify-center">
                    <p className="px-4 text-center text-gray-500">
                      Send a message to start the conversation. Practice your{" "}
                      {languages.find((l) => l.code === selectedLanguage)?.name}{" "}
                      skills!
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "me"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.sender === "partner" && (
                        <div className="mr-2 h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                          <Image
                            src={partner.image}
                            alt={partner.name}
                            width={32}
                            height={32}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.sender === "me"
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p>{message.text}</p>
                        <p
                          className={`mt-1 text-xs ${
                            message.sender === "me"
                              ? "text-green-100"
                              : "text-gray-500"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message input */}
              <div className="flex border-t p-3">
                <Input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-grow"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                />
                <Button
                  onClick={sendMessage}
                  variant="secondary"
                  className="ml-2"
                  disabled={!currentMessage.trim()}
                >
                  <Send size={18} />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
