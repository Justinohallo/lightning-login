export const lightningLoginEducation = {
  id: "lightning-login-education-v1",
  slug: "lightning-login",
  title: "Lightning Login: Towards Sovereign Authentication",
  tagline:
    "Why legacy login is broken, how modern auth is evolving, and where Lightning Login fits into a more sovereign future.",
  audience: ["newcomers", "builders", "product", "design", "developers"],
  goals: [
    "Explain why current big-tech-centric auth is problematic.",
    "Show how modern authentication technologies attempt to fix those problems.",
    "Introduce Lightning Login (LNURL-auth) as one building block towards digital sovereignty.",
  ],
  sections: [
    {
      id: "hero",
      kind: "hero",
      title: "Logging in is more political than it looks",
      intro:
        "Every time you click 'Sign in with Google' or type a password into a big platform, you're participating in an invisible power structure. A handful of companies sit between you and everything you do online.",
      paragraphs: [
        "Authentication is how the internet decides who you are and what you're allowed to do. Over the last 20 years, big tech turned login from a simple password box into a massive identity and data industry.",
        "On the surface, this was about convenience: fewer passwords, fewer forms, fewer forgotten logins. Underneath, it concentrated power, created new surveillance incentives, and made it easier than ever to lock people out of the digital world.",
        "This app exists to unpack that story in plain language, show how new technologies are improving it, and then demonstrate one concrete option: Lightning Login, an authentication method built on Bitcoin's key-based model.",
      ],
      bullets: [
        "Why legacy login systems are fragile and centralized.",
        "How modern approaches like passkeys, WebAuthn, and self-sovereign identity address those flaws.",
        "How Lightning Login (LNURL-auth) uses your Bitcoin wallet keys instead of passwords or corporate identity providers.",
      ],
      callToAction: {
        label: "Skip to the demo",
        href: "/demo",
      },
    },

    // 1) Problem: legacy + big-tech auth
    {
      id: "legacy-auth-problems",
      kind: "problem",
      title: "How legacy authentication ended up owned by big tech",
      intro:
        "Most of today's login flows are built on top of passwords, emails, and identity providers run by a small number of large companies.",
      paragraphs: [
        "The first generation of online authentication was simple: pick a username and password for every site. Very quickly, this model failed in practice. People reused the same passwords everywhere, wrote them down, and fell for phishing links. Massive password leaks became routine.",
        "To reduce friction, companies began offering 'Sign in with X' buttons. OAuth and OpenID Connect made it easy to let Google, Facebook, Apple, or Microsoft vouch for your identity across thousands of sites. This solved some UX problems, but it also turned those companies into gatekeepers of who gets to log in where.",
        "Today, if your Google or Apple account is suspended, you might lose access to dozens of apps and services that delegated authentication to them. This creates a single point of failure — both technically and socially.",
        "On top of that, the identity provider sees where and when you log in, and can correlate your activity across many sites. This data has commercial value, so the incentives push towards more tracking and profiling, not less.",
      ],
      bulletPoints: [
        "Password-based systems are vulnerable to reuse, phishing, and large-scale breaches.",
        "SSO / social login centralizes power into a few companies that can lock you out across many apps.",
        "Big tech identity providers see a large portion of your online activity, creating strong incentives for data collection.",
        "Most accounts are tied directly to your real-world identity (email, phone, government ID), which limits pseudonymity.",
      ],
      takeaway:
        "Legacy auth prioritized convenience and onboarding metrics, not user sovereignty. It made the internet feel easier, but also more centralized, tracked, and fragile.",
    },

    // 2) Modern mitigations: MFA, passkeys, WebAuthn, etc.
    {
      id: "modern-auth-evolution",
      kind: "evolution",
      title: "How modern authentication is trying to fix this",
      intro:
        "The good news: the security world knows passwords are broken. A lot of smart people are working on better primitives.",
      paragraphs: [
        "Modern authentication standards like FIDO2, WebAuthn, and passkeys replace shared secrets (passwords) with public-key cryptography. Instead of sending a password to a website, your device proves possession of a private key that never leaves the device. This makes phishing, credential stuffing, and password database leaks much harder.",
        "Passkeys and WebAuthn are a big step forward: they are phishing-resistant, often multi-factor by design (your device + biometric/PIN), and credentials are scoped per website so they can't be replayed elsewhere.",
        "Biometrics (fingerprint, FaceID, etc.) make strong cryptography usable for normal people. But they introduce their own risks: if biometric templates are stored poorly or used for broad surveillance, they can become a privacy and security liability. AI voice cloning, for example, has already weakened trust in voice biometrics.",
        "Risk-based and 'invisible' authentication systems monitor behavior (device, location, typing style, browsing patterns) to decide how much friction to apply. These can reduce obvious login prompts, but they also encourage large-scale data collection and opaque risk scoring.",
      ],
      bulletPoints: [
        "Passkeys and WebAuthn dramatically improve security and usability over passwords.",
        "Biometrics make strong cryptography more usable, but raise significant privacy and ethics questions.",
        "Behavioral and 'invisible' auth reduce friction but often increase surveillance.",
      ],
      takeaway:
        "Modern auth tech fixes many technical flaws of passwords, but it doesn't automatically fix centralization, data collection, or dependence on a few trusted platforms. Security is improving, but sovereignty is still an open question.",
    },

    // 3) Sovereignty & self-sovereign identity
    {
      id: "sovereignty-and-ssi",
      kind: "concept",
      title: "What does sovereignty in authentication actually mean?",
      intro:
        "Security asks: \"Is this really you?\" Sovereignty adds a second question: \"Who gets to decide, and who controls the data?\"",
      paragraphs: [
        "Self-sovereign identity (SSI) and decentralized identifiers (DIDs) propose a different mental model: instead of logging in through a company that owns your account, you hold your own identifiers and credentials, and selectively reveal them to others.",
        "In an SSI-style system, you don't create a new account for every site. You have a wallet of identifiers and verifiable credentials that you control. Services can request proofs (\"Are you over 18?\", \"Do you own this domain?\", \"Are you a customer of X?\") without needing to store all of your raw personal data.",
        "DIDs give you identifiers that are not tied to email providers or governments, and can be anchored on decentralized networks. The goal is to reduce dependence on centralized identity providers and giant databases of sensitive information.",
        "Done well, this improves privacy (less data sharing), reduces correlation between your activities, and lets you rotate or revoke identifiers without asking a platform for permission. Done poorly, it can be too complex for users or accidentally recreate centralization around new wallet providers.",
      ],
      bulletPoints: [
        "Sovereignty means you can own and control your digital identifiers, not just rent them from platforms.",
        "SSI and DIDs aim to reduce reliance on centralized identity providers and big identity databases.",
        "Sovereign auth doesn't have to reveal your real-world identity to be useful — pseudonymous, reputation-based identities can still be powerful.",
      ],
      takeaway:
        "Sovereign authentication is about control and reversibility. You should be able to decide who gets to see what, move your identity between services, and recover from failure without begging a platform.",
    },

    // 4) Lightning Login itself
    {
      id: "lightning-login-intro",
      kind: "technology",
      title: "Lightning Login: using your Bitcoin wallet as your key",
      intro:
        "Lightning Login (LNURL-auth) is one way to move closer to sovereignty, especially for Bitcoin-native apps and communities.",
      paragraphs: [
        "LNURL-auth is a simple authentication protocol built on top of public-key cryptography, inspired by how Bitcoin wallets already work. Instead of passwords or email-based accounts, a service asks your wallet to sign a random challenge (k1) with a private key. If the signature checks out, the service knows it's you — without ever seeing your secret.",
        "Under the hood, LNURL-auth derives domain-specific keys from your wallet seed. That means each website gets its own public key (often called a linkingKey), limiting how easily your activity can be correlated across services. If one site is compromised or goes bad, you can stop using that specific key without sacrificing others.",
        "From a user perspective, Lightning Login feels like this: open a site, click 'Log in with Lightning', scan a QR code with your Lightning wallet, approve the login, and you're in — no passwords, no email confirmation.",
        "Because it is based on keys you already control in your Bitcoin wallet, Lightning Login leans towards pseudonymous identity by default. A site can choose to ask for extra information, but the base identity is a public key, not your government ID or corporate account.",
      ],
      bulletPoints: [
        "No passwords, no email required – just a key-based login using your Lightning/Bitcoin wallet.",
        "Domain-specific keys make it harder to track you across sites from the login layer alone.",
        "You can have multiple identities across different wallets or keys, which fits well with pseudonymous communities.",
      ],
      takeaway:
        "Lightning Login is not 'the one true answer' to all identity problems, but it's a powerful tool if you already live in the Bitcoin / Lightning world and want logins that feel more like cryptographic ownership than corporate account rental.",
    },

    // 5) Tradeoffs & comparison
    {
      id: "tradeoffs-and-comparison",
      kind: "comparison",
      title: "How Lightning Login compares to passkeys and SSI",
      intro:
        "It's useful to see Lightning Login as one option in a broader toolbox, not a replacement for everything.",
      paragraphs: [
        "Passkeys/WebAuthn and Lightning Login are similar in spirit: both use public-key cryptography instead of passwords, both can offer phishing resistance, and both issue site-specific keys so the same credential can't be replayed on another domain.",
        "The big difference is where the keys live and who the ecosystem is built for. Passkeys are deeply integrated into device platforms and browsers, aimed at mainstream consumer apps. Lightning Login is built around Bitcoin/Lightning wallets, aimed at Bitcoin-native apps and communities.",
        "SSI/DID systems focus on verifiable claims and rich identity data (proof-of-age, membership, credentials). Lightning Login is narrower: it proves control of a key and can act as a stable pseudonymous identifier, but doesn't define rich credential formats by itself.",
        "From a sovereignty perspective, Lightning Login shines where you want pseudonymous, key-based accounts that are not coupled to your real-world identity. It may be less ideal for regulated domains that require strong KYC and verifiable credentials (banks, governments, etc.), where SSI-style credentials or passkeys tied to KYC'd accounts might make more sense.",
      ],
      comparisonTable: {
        columns: ["Approach", "What it uses", "Who controls keys", "Best for"],
        rows: [
          [
            "Passwords + Social Login",
            "Passwords, email, big-tech IdPs",
            "Providers + you",
            "Legacy apps, convenience, fast onboarding",
          ],
          [
            "Passkeys / WebAuthn",
            "Device-bound or synced FIDO credentials",
            "Device/platform & you",
            "Mainstream apps needing strong phishing-resistant auth",
          ],
          [
            "SSI / DIDs",
            "Decentralized identifiers + verifiable credentials",
            "You, via identity wallet",
            "Rich identity, selective disclosure, compliance-heavy use cases",
          ],
          [
            "Lightning Login (LNURL-auth)",
            "Bitcoin/Lightning wallet keys",
            "You, via Bitcoin wallet",
            "Bitcoin-native apps, pseudonymous communities, builder tools",
          ],
        ],
      },
      takeaway:
        "Lightning Login sits alongside passkeys and SSI: it's a great fit for Bitcoin-native contexts and pseudonymous communities, and can coexist with passkeys and richer credential systems when needed.",
    },

    // 6) Closing & next steps
    {
      id: "summary-and-next-steps",
      kind: "summary",
      title: "Putting it together: from rented identity to owned keys",
      intro:
        "Legacy auth gave us convenience at the cost of centralization. Modern auth is giving us security. Now we're working on sovereignty.",
      paragraphs: [
        "Passwords and big-tech identity providers solved early internet problems but created new ones: single points of failure, surveillance incentives, and accounts that feel more rented than owned.",
        "Passkeys, WebAuthn, biometrics, and modern MFA are fixing many technical problems around phishing and credential theft. They're a huge upgrade over passwords, but they're not automatically sovereign: in many cases, platform companies still sit in the middle of your identity story.",
        "Self-sovereign identity and decentralized identifiers push control back to the user by letting you hold your own identifiers and verifiable credentials. Lightning Login brings a complementary idea from the Bitcoin world: use keys you already control in your wallet for authentication, without passwords or big-tech accounts.",
        "In this app, you'll be able to see Lightning Login in action, learn how it works, and — if you're a developer — explore how to integrate it into your own projects.",
      ],
      callToAction: {
        label: "See Lightning Login in action",
        href: "/demo",
      },
    },
  ],

  faqs: [
    {
      id: "faq-1",
      question: "Does Lightning Login replace passkeys and WebAuthn?",
      answer:
        "No. Lightning Login is complementary. Passkeys/WebAuthn are general-purpose, browser-integrated standards for passwordless authentication. Lightning Login is specialized for Bitcoin/Lightning contexts, using your wallet keys as your login identity. A single app can support both.",
    },
    {
      id: "faq-2",
      question: "Do I have to reveal my real identity to use Lightning Login?",
      answer:
        "Not by default. Lightning Login authenticates a public key derived from your wallet seed. Apps can ask for extra information (like a username or email), but the base identity is a key, not your government ID.",
    },
    {
      id: "faq-3",
      question: "What happens if I lose my wallet or keys?",
      answer:
        "If you lose access to the wallet used for Lightning Login and you don't have a backup, you lose that identity. That's similar to losing a hardware security key. Apps can offer account recovery paths (linking another key, email, or credential), but the core model assumes you are responsible for your keys.",
    },
    {
      id: "faq-4",
      question: "Can Lightning Login work together with self-sovereign identity?",
      answer:
        "Yes. Lightning Login can act as a stable pseudonymous identifier or account key, while SSI/DID systems handle rich verifiable credentials. In the future, your Lightning identity could be one of several identifiers inside a broader identity wallet.",
    },
    {
      id: "faq-5",
      question: "Is Lightning Login only for hardcore Bitcoin users?",
      answer:
        "It's Bitcoin-native, so it shines where people already use Lightning wallets. But good UX (wallet recommendations, clear onboarding, simple flows) can make it approachable for motivated newcomers — especially in builder communities and workshops.",
    },
  ],

  glossary: [
    {
      term: "Identity Provider (IdP)",
      definition:
        "A service (often run by a big tech company) that tells other apps who you are — for example, when you click 'Sign in with Google'.",
    },
    {
      term: "Passkey",
      definition:
        "A FIDO-based credential that lets you sign in with public-key cryptography instead of a password, often using biometrics on your device.",
    },
    {
      term: "Self-Sovereign Identity (SSI)",
      definition:
        "An identity model where people and organizations control their own identifiers and credentials, instead of relying on centralized identity providers.",
    },
    {
      term: "Decentralized Identifier (DID)",
      definition:
        "A cryptographically verifiable identifier (like did:example:123...) that is controlled by its owner and not tied to any single company or government.",
    },
    {
      term: "LNURL-auth / Lightning Login",
      definition:
        "An authentication protocol that lets you log into websites by signing a challenge with keys derived from your Bitcoin/Lightning wallet seed, instead of using passwords or email.",
    },
  ],

  ctaStrip: {
    title: "Ready to see it live?",
    body: "Once you've read through the concepts, head over to the demo page to try logging in with your own Lightning wallet.",
    primary: {
      label: "Go to demo",
      href: "/demo",
    },
    secondary: {
      label: "For developers",
      href: "/developer",
    },
  },
} as const;

