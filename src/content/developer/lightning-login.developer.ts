export const lightningLoginDeveloperContent = {
  id: "lightning-login-developer-v1",
  title: "Lightning Login for Developers",
  tagline: "How LNURL-auth works under the hood and how to build it yourself.",
  navOrder: [
    "overview",
    "architecture",
    "protocol-flow",
    "implementing-simple",
    "implementing-nextauth",
    "libraries",
    "comparison",
    "faq",
  ],
  sections: [
    {
      id: "overview",
      slug: "overview",
      kind: "overview",
      title: "What Developers Need to Know",
      paragraphs: [
        "Lightning Login is an authentication protocol using LNURL-auth that allows users to authenticate with websites using their Bitcoin/Lightning wallet instead of passwords or email-based accounts.",
        "This documentation covers the technical implementation details, protocol flow, code examples, and integration patterns for developers who want to add Lightning Login to their applications.",
        "Whether you're building a simple Node.js server or integrating with NextAuth.js, this guide will walk you through the process step by step.",
      ],
    },
    {
      id: "architecture",
      slug: "architecture",
      kind: "architecture",
      title: "High-Level Architecture",
      paragraphs: [
        "LNURL-auth requires a backend that generates k1 challenges, verifies signatures, and manages sessions. The protocol flow involves coordination between your web application, an LNURL endpoint, and the user's Lightning wallet.",
        "The architecture consists of three main components: your web application (frontend and backend), an LNURL-auth endpoint, and the user's Lightning wallet that signs challenges.",
      ],
      bulletPoints: [
        "Client requests LNURL from your server",
        "Server generates a random k1 challenge and stores it temporarily",
        "Wallet scans QR code or receives LNURL",
        "Wallet signs the k1 challenge with a domain-specific key",
        "Server verifies the signature against the public key",
        "Session is created upon successful verification",
      ],
    },
    {
      id: "protocol-flow",
      slug: "protocol-flow",
      kind: "protocol",
      title: "Protocol Flow",
      paragraphs: [
        "The LNURL-auth protocol follows a specific sequence of steps. Understanding this flow is crucial for proper implementation.",
      ],
      codeExamples: [
        {
          id: "flow-diagram",
          title: "Simplified Protocol Flow",
          language: "text",
          code: `Website -> LNURL endpoint -> Wallet -> Signed k1 -> Validation -> Session`,
        },
      ],
    },
    {
      id: "implementing-simple",
      slug: "implementing-simple",
      kind: "code-example",
      title: "Implementing LNURL-auth (Simple Server)",
      paragraphs: [
        "Here's a basic implementation of LNURL-auth for a simple Node.js or Next.js server. This example shows the core concepts without additional abstractions.",
      ],
      codeExamples: [
        {
          id: "simple-server",
          title: "Simple Node/Next.js Endpoint",
          description: "Basic LNURL-auth endpoint implementation",
          language: "typescript",
          code: `export async function GET() {
  // Generate random k1 challenge
  const k1 = crypto.randomBytes(32).toString('hex');
  
  // Store k1 temporarily (in-memory or Redis)
  // Store with expiration (e.g., 5 minutes)
  
  // Return LNURL response
  return Response.json({
    tag: 'login',
    k1: k1,
    callback: 'https://yoursite.com/api/lnurl-auth/callback',
    host: 'yoursite.com',
  });
}`,
        },
      ],
    },
    {
      id: "implementing-nextauth",
      slug: "implementing-nextauth",
      kind: "code-example",
      title: "Integrating with NextAuth",
      paragraphs: [
        "NextAuth can wrap LNURL-auth for session management. This allows you to leverage NextAuth's built-in session handling while using Lightning Login for authentication.",
        "You'll need to create a custom NextAuth provider that implements the LNURL-auth flow.",
      ],
      codeExamples: [
        {
          id: "nextauth-provider",
          title: "NextAuth LNURL Provider",
          description: "Custom provider implementation",
          language: "typescript",
          code: `// Placeholder for NextAuth integration
// This will be expanded in a future update`,
        },
      ],
    },
    {
      id: "libraries",
      slug: "libraries",
      kind: "library",
      title: "Library Ecosystem",
      paragraphs: [
        "Several libraries exist to help you implement LNURL-auth. Here are the main options available in the JavaScript/TypeScript ecosystem.",
      ],
      bulletPoints: [
        "lnurl: Low-level primitives for LNURL operations",
        "passport-lnurl-auth: Express/Passport strategy for LNURL-auth",
        "Lightning-specific JS tools: Libraries for key derivation and signature verification",
      ],
    },
    {
      id: "comparison",
      slug: "comparison",
      kind: "comparison",
      title: "Methods Comparison",
      paragraphs: [
        "Different implementation approaches have different trade-offs. Choose the method that best fits your application's needs.",
      ],
      comparisonTable: {
        columns: ["Method", "Effort", "Flexibility", "Use Case"],
        rows: [
          ["Simple Endpoint", "Low", "Medium", "Custom servers"],
          ["NextAuth Provider", "Medium", "High", "Web apps needing sessions"],
          ["Passport Strategy", "Medium", "High", "Express/Node APIs"],
        ],
      },
    },
    {
      id: "faq",
      slug: "faq",
      kind: "faq",
      title: "Developer FAQ",
      paragraphs: [
        "Q: Do I need a Lightning node to implement LNURL-auth?",
        "A: No, you don't need your own Lightning node. The protocol only requires that users have a Lightning wallet that can sign challenges. Your server just needs to verify signatures.",
        "",
        "Q: How do I handle key derivation for domain-specific keys?",
        "A: LNURL-auth uses BIP32 derivation paths. Each domain gets its own linking key derived from the user's wallet seed. Libraries like lnurl handle this automatically.",
        "",
        "Q: What happens if a user loses their wallet?",
        "A: If a user loses access to their wallet and doesn't have a backup, they lose that identity. Consider implementing account recovery mechanisms (linking additional keys, email fallback, etc.) if needed for your use case.",
        "",
        "Q: Can I use LNURL-auth with existing user accounts?",
        "A: Yes, you can link Lightning Login to existing accounts or use it as the primary authentication method. The choice depends on your application's requirements.",
      ],
    },
  ],
} as const;

