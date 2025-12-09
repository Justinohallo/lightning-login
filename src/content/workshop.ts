export type WorkshopSlideContent =
  | { type: "text"; value: string }
  | { type: "code"; value: string; language?: string }
  | { type: "image"; value: string; alt?: string };

export type WorkshopSlide = {
  id: string;
  title: string;
  content: WorkshopSlideContent[];
};

export const slides: WorkshopSlide[] = [
  {
    id: "intro",
    title: "Lightning Login Workshop",
    content: [
      {
        type: "text",
        value: "An overview of Lightning Login and modern auth",
      },
      {
        type: "text",
        value: "Today we'll explore how authentication works on the modern web",
      },
      {
        type: "text",
        value: "And how Lightning Login offers a sovereign alternative",
      },
    ],
  },
  {
    id: "legacy-auth-problems",
    title: "The Problem with Legacy Auth",
    content: [
      {
        type: "text",
        value: "How legacy authentication ended up owned by big tech",
      },
      {
        type: "text",
        value: "Passwords are reused, phished, and leaked",
      },
      {
        type: "text",
        value: "Big tech controls identity through SSO",
      },
      {
        type: "text",
        value: "Single points of failure",
      },
      {
        type: "text",
        value: "Surveillance and data collection",
      },
    ],
  },
  {
    id: "modern-auth-evolution",
    title: "Modern Solutions",
    content: [
      {
        type: "text",
        value: "How modern authentication is trying to fix this",
      },
      {
        type: "text",
        value: "Passkeys and WebAuthn use public-key cryptography",
      },
      {
        type: "text",
        value: "Phishing-resistant by design",
      },
      {
        type: "text",
        value: "But still often tied to platforms",
      },
    ],
  },
  {
    id: "sovereignty-concept",
    title: "What Does Sovereignty Mean?",
    content: [
      {
        type: "text",
        value: "Security asks: 'Is this really you?'",
      },
      {
        type: "text",
        value: "Sovereignty adds: 'Who gets to decide, and who controls the data?'",
      },
      {
        type: "text",
        value: "You should control your digital identifiers",
      },
      {
        type: "text",
        value: "Not rent them from platforms",
      },
    ],
  },
  {
    id: "lightning-login-intro",
    title: "What is Lightning Login?",
    content: [
      {
        type: "text",
        value: "Lightning Login: using your Bitcoin wallet as your key",
      },
      {
        type: "text",
        value: "Authentication using your Bitcoin wallet keys",
      },
      {
        type: "text",
        value: "No passwords, no email required",
      },
      {
        type: "text",
        value: "Domain-specific keys for privacy",
      },
      {
        type: "text",
        value: "Pseudonymous by default",
      },
    ],
  },
  {
    id: "how-it-works",
    title: "How It Works",
    content: [
      {
        type: "text",
        value: "LNURL-auth protocol flow:",
      },
      {
        type: "text",
        value: "1. Service generates a random challenge (k1)",
      },
      {
        type: "text",
        value: "2. Your wallet signs it with a private key",
      },
      {
        type: "text",
        value: "3. Service verifies the signature",
      },
      {
        type: "text",
        value: "4. You're logged in!",
      },
      {
        type: "code",
        value: `// Simplified flow
const challenge = generateRandomChallenge();
const signature = await wallet.sign(challenge);
const isValid = verifySignature(signature, publicKey);
if (isValid) {
  // User is authenticated
}`,
        language: "javascript",
      },
    ],
  },
  {
    id: "comparison",
    title: "How Lightning Login Compares",
    content: [
      {
        type: "text",
        value: "Lightning Login vs Passkeys vs SSI",
      },
      {
        type: "text",
        value: "Passkeys: Browser-integrated, mainstream apps",
      },
      {
        type: "text",
        value: "SSI: Rich credentials, compliance-heavy use cases",
      },
      {
        type: "text",
        value: "Lightning Login: Bitcoin-native, pseudonymous communities",
      },
    ],
  },
  {
    id: "try-it",
    title: "Try It Yourself",
    content: [
      {
        type: "text",
        value: "Head to the demo page",
      },
      {
        type: "text",
        value: "Scan the QR code with your Lightning wallet",
      },
      {
        type: "text",
        value: "Approve the login",
      },
      {
        type: "text",
        value: "Experience sovereign authentication",
      },
    ],
  },
];

export const totalSlides = slides.length;
export const workshopSlides = slides; // Keep for backward compatibility

