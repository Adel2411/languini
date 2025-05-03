import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import {
  Loader,
  Check,
  Languages,
  BookOpen,
  Medal,
  Brain,
  ArrowRight,
  Play,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const features = [
  {
    icon: <Languages className="h-10 w-10 text-green-600" />,
    title: "Multiple Languages",
    description:
      "Learn Croatian, Spanish, French, Italian, Japanese and more, all in one place.",
  },
  {
    icon: <BookOpen className="h-10 w-10 text-green-600" />,
    title: "Structured Learning",
    description:
      "Follow a carefully designed curriculum that builds your skills progressively.",
  },
  {
    icon: <Medal className="h-10 w-10 text-green-600" />,
    title: "Achievement System",
    description:
      "Stay motivated with badges, streaks, and milestones that track your progress.",
  },
  {
    icon: <Brain className="h-10 w-10 text-green-600" />,
    title: "Smart Learning",
    description:
      "Our adaptive algorithm focuses on what you need to practice most.",
  },
];

const languages = [
  { name: "Croatian", flag: "/hr.svg", learners: "10K+" },
  { name: "Spanish", flag: "/es.svg", learners: "50K+" },
  { name: "French", flag: "/fr.svg", learners: "30K+" },
  { name: "Italian", flag: "/it.svg", learners: "20K+" },
  { name: "Japanese", flag: "/jp.svg", learners: "25K+" },
];

const testimonials = [
  {
    name: "Alex P.",
    role: "Software Developer",
    image: "man.svg",
    text: "Languini helped me learn Spanish for my trip to Mexico. The bite-sized lessons made it easy to practice daily.",
    rating: 5,
  },
  {
    name: "Sarah M.",
    role: "Student",
    image: "woman.svg",
    text: "I've tried many language apps, but Languini's approach just clicked for me. I'm now conversational in French!",
    rating: 5,
  },
  {
    name: "David K.",
    role: "Business Professional",
    image: "man.svg",
    text: "Learning Japanese seemed daunting until I found Languini. The interactive exercises make it fun and effective.",
    rating: 4,
  },
];

const steps = [
  {
    number: "01",
    title: "Choose your language",
    description:
      "Select from our collection of popular languages to start your learning journey.",
  },
  {
    number: "02",
    title: "Complete daily lessons",
    description:
      "Spend just 5-15 minutes each day with our engaging, interactive lessons.",
  },
  {
    number: "03",
    title: "Track your progress",
    description:
      "Watch your skills grow with our comprehensive progress tracking system.",
  },
  {
    number: "04",
    title: "Achieve fluency",
    description:
      "Reach your language goals through consistent practice and our proven methodology.",
  },
];

export default function MarketingPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-8 px-4 py-12 md:py-20 lg:flex-row">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="mb-2 rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
            Your language journey starts here
          </span>

          <h1 className="mb-6 max-w-[580px] text-3xl font-extrabold leading-tight text-gray-800 md:text-4xl lg:text-5xl">
            Learn, practice and <span className="text-green-600">master</span>{" "}
            new languages with Languini
          </h1>

          <p className="mb-8 max-w-[480px] text-lg text-gray-600">
            Join millions of learners worldwide and discover a fun, effective
            way to learn languages. Perfect for beginners and advanced learners
            alike.
          </p>

          <div className="flex w-full max-w-[330px] flex-col items-center gap-y-3">
            <ClerkLoading>
              <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
            </ClerkLoading>

            <ClerkLoaded>
              <SignedOut>
                <div className="flex w-full flex-col gap-3 sm:flex-row">
                  <SignUpButton
                    mode="modal"
                    forceRedirectUrl="/learn"
                    signInForceRedirectUrl="/learn"
                  >
                    <Button size="lg" variant="secondary" className="w-full">
                      Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </SignUpButton>

                  <SignInButton
                    mode="modal"
                    forceRedirectUrl="/learn"
                    signUpForceRedirectUrl="/learn"
                  >
                    <Button
                      size="lg"
                      variant="primaryOutline"
                      className="w-full"
                    >
                      Log In
                    </Button>
                  </SignInButton>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
              </SignedOut>

              <SignedIn>
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full"
                  asChild
                >
                  <Link href="/learn">
                    Continue Learning <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </SignedIn>
            </ClerkLoaded>
          </div>
        </div>

        <div className="relative h-[300px] w-[300px] lg:h-[500px] lg:w-[500px]">
          <div className="absolute -left-4 -top-4 h-full w-full rounded-full bg-green-100 lg:-left-6 lg:-top-6"></div>
          <div className="absolute h-full w-full">
            <Image
              src="/hero.svg"
              alt="Languini Language Learning"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Language Showcase */}
      <section className="w-full bg-gray-50 py-16">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">
              Languages You Can Learn
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-600">
              Expand your horizons with our growing collection of languages
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {languages.map((language) => (
              <div
                key={language.name}
                className="flex flex-col items-center rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 rounded-md border border-gray-100 p-1">
                  <Image
                    src={language.flag}
                    alt={language.name}
                    width={60}
                    height={45}
                    className="rounded-md"
                  />
                </div>
                <h3 className="mb-1 font-medium text-gray-800">
                  {language.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {language.learners} learners
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-[1200px] px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">
            Why Choose Languini
          </h2>
          <p className="mx-auto max-w-[600px] text-gray-600">
            Our science-backed approach makes language learning effective and
            enjoyable
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 inline-flex rounded-full bg-green-50 p-3">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-medium text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full bg-green-50 py-16">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">
              How Languini Works
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-600">
              Our simple 4-step process gets you from beginner to confident
              speaker
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative rounded-xl bg-white p-6 shadow-sm"
              >
                <span className="absolute -top-4 left-6 text-5xl font-extrabold text-green-300">
                  {step.number}
                </span>
                <h3 className="mb-3 mt-4 text-xl font-medium text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <ClerkLoaded>
              <SignedOut>
                <SignUpButton
                  mode="modal"
                  forceRedirectUrl="/learn"
                  signInForceRedirectUrl="/learn"
                >
                  <Button size="lg" variant="secondary">
                    Start Learning Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/learn">
                    Continue Your Journey{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </SignedIn>
            </ClerkLoaded>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-[1200px] px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">
            What Our Learners Say
          </h2>
          <p className="mx-auto max-w-[600px] text-gray-600">
            Join thousands of satisfied language learners around the world
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>

              <p className="mb-4 text-gray-600">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="flex">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-[1200px] px-4 py-16">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-green-400 p-8 text-white shadow-lg md:p-12">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="max-w-[600px] text-center lg:text-left">
              <h2 className="mb-4 text-3xl font-bold">
                Ready to start your language journey?
              </h2>
              <p className="mb-6 text-lg opacity-90">
                Join Languini today and discover the joy of learning a new
                language. It&apos;s free to get started!
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <ClerkLoaded>
                  <SignedOut>
                    <SignUpButton
                      mode="modal"
                      forceRedirectUrl="/learn"
                      signInForceRedirectUrl="/learn"
                    >
                      <Button
                        size="lg"
                        className="border-white bg-white text-green-600 hover:bg-gray-100"
                      >
                        Sign Up Free <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </SignUpButton>

                    <Button
                      size="lg"
                      variant={"primary"}
                      className="border-white text-white hover:bg-green-500"
                      asChild
                    >
                      <Link href="https://www.loom.com/share/c5322f7026104bdcb649fe4199f4a8ac?sid=3e1c7c7e-013d-4e83-9ff1-79c99975b10f">
                        <Play className="mr-2 h-4 w-4" /> See how it works
                      </Link>
                    </Button>
                  </SignedOut>

                  <SignedIn>
                    <Button
                      size="lg"
                      className="border-white bg-white text-green-600 hover:bg-gray-100"
                      asChild
                    >
                      <Link href="/learn">
                        Continue Learning{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </SignedIn>
                </ClerkLoaded>
              </div>
            </div>

            <div className="hidden lg:block">
              <Image
                src="/mascot.svg"
                alt="Languini Mascot"
                width={180}
                height={180}
                className="animate-bounce"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
