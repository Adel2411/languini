import os

from gtts import gTTS

# Define all translations
translations = {
    "man": {
        "es": "el hombre",
        "fr": "l'homme",
        "hr": "čovjek",
        "jp": "男",
        "it": "l'uomo",
    },
    "woman": {
        "es": "la mujer",
        "fr": "la femme",
        "hr": "žena",
        "jp": "女",
        "it": "la donna",
    },
    "boy": {
        "es": "el chico",
        "fr": "le garçon",
        "hr": "dječak",
        "jp": "男の子",
        "it": "il ragazzo",
    },
    "zombie": {
        "es": "el zombie",
        "fr": "le zombie",
        "hr": "zombi",
        "jp": "ゾンビ",
        "it": "lo zombi",
    },
    "robot": {
        "es": "el robot",
        "fr": "le robot",
        "hr": "robot",
        "jp": "ロボット",
        "it": "il robot",
    },
    "girl": {
        "es": "la niña",
        "fr": "la fille",
        "hr": "djevojka",
        "jp": "女の子",
        "it": "la ragazza",
    },
}

# Language code mapping for TTS
tts_lang_codes = {
    "es": "es",
    "fr": "fr",
    "hr": "hr",
    "it": "it",
    "jp": "ja",  # Japanese is 'ja' in gTTS
}

# Create output directory if it doesn't exist
os.makedirs("output", exist_ok=True)

# Generate audio files for each word in each language
generated_files = []

for word in translations:
    for lang_code, text in translations[word].items():
        tts_lang = tts_lang_codes.get(lang_code, lang_code)
        filename = f"{lang_code}_{word}.mp3"
        output_path = f"../public/{filename}"

        try:
            print(f"Generating {output_path} - '{text}' in {tts_lang}")
            tts = gTTS(text=text, lang=tts_lang, slow=False)
            tts.save(output_path)
            generated_files.append(filename)
        except Exception as e:
            print(f"Error generating {output_path}: {e}")

print(f"Generated {len(generated_files)} MP3 files in the 'output' directory.")
print("Files generated:", ", ".join(generated_files))
