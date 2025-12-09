export type WorkshopSlide = {
  id: string;
  title: string;
  content: string[];
};

export const workshopSlides: WorkshopSlide[] = [
  {
    id: "slide-1",
    title: "Welcome to Lightning Login",
    content: [
      "Today we'll explore how authentication works on the modern web",
      "And how Lightning Login offers a sovereign alternative",
    ],
  },
  {
    id: "slide-2",
    title: "The Problem with Legacy Auth",
    content: [
      "Passwords are reused, phished, and leaked",
      "Big tech controls identity through SSO",
      "Single points of failure",
      "Surveillance and data collection",
    ],
  },
  {
    id: "slide-3",
    title: "Modern Solutions",
    content: [
      "Passkeys and WebAuthn use public-key cryptography",
      "Phishing-resistant by design",
      "But still often tied to platforms",
    ],
  },
  {
    id: "slide-4",
    title: "What is Lightning Login?",
    content: [
      "Authentication using your Bitcoin wallet keys",
      "No passwords, no email required",
      "Domain-specific keys for privacy",
      "Pseudonymous by default",
    ],
  },
  {
    id: "slide-5",
    title: "How It Works",
    content: [
      "Service generates a random challenge (k1)",
      "Your wallet signs it with a private key",
      "Service verifies the signature",
      "You're logged in!",
    ],
  },
  {
    id: "slide-6",
    title: "Try It Yourself",
    content: [
      "Head to the demo page",
      "Scan the QR code with your Lightning wallet",
      "Approve the login",
      "Experience sovereign authentication",
    ],
  },
];

