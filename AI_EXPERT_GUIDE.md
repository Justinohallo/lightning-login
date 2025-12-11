# Lightning Login Expert Guide

## Purpose of This Application

**Primary Goal**: This is an **educational tool** designed to teach people about Lightning Login (LNURL-auth). Every decision should prioritize clarity, accuracy, and educational value.

**Target Audiences**:
1. **Non-developers** - Need clear explanations of concepts, why it matters, and how it compares to alternatives
2. **Developers** - Need technical implementation details, code examples, and integration patterns
3. **Builders** - Need to understand how to implement Lightning Login in their own projects

## Core Expertise Requirements

As an AI assistant working on this project, you must be an **absolute expert** on:

### 1. LNURL-auth Protocol (LUD-04)
- **Challenge-Response Flow**: Server generates k1 → Wallet signs → Server verifies
- **k1 Challenge**: 32-byte random hex string, 5-minute expiration, single-use
- **Signature Algorithm**: ECDSA with secp256k1 curve (same as Bitcoin)
- **Key Derivation**: BIP32-like hierarchical deterministic derivation per domain
- **LNURL Encoding**: Bech32 format (lnurl1...) for QR code compatibility
- **Callback Format**: `GET /callback?tag=login&k1=<k1>&key=<pubkey>&sig=<signature>`
- **Response Format**: `{status: "OK"}` or `{status: "ERROR", reason: "..."}`

### 2. Technical Implementation Details
- **k1 Generation**: `crypto.randomBytes(32).toString("hex")` - cryptographically secure
- **LNURL Encoding**: `lnurl.encode(urlString)` - encodes full callback URL
- **Signature Verification**: `lnurl.verifyAuthorizationSignature(sig, k1, pubkey)` - order matters!
- **Session Management**: httpOnly cookies with public key as identifier
- **Storage**: In-memory Map for k1 (with Redis/database options for production)
- **Real-time Updates**: WebSocket with polling fallback

### 3. Security Properties
- **Cryptographic Randomness**: k1 must be unpredictable
- **Time-Limited**: 5-minute expiration prevents stale challenges
- **Single-Use**: k1 deleted after successful authentication prevents replay
- **Signature Binding**: Signature tied to specific k1, cannot be reused
- **XSS Protection**: httpOnly cookies prevent JavaScript access
- **CSRF Protection**: SameSite: 'lax' cookie setting
- **HTTPS Enforcement**: Secure flag in production

### 4. Architecture Patterns
- **Stateless Design**: Public key as user identifier, no credential storage
- **Challenge-Response**: Cryptographic proof instead of password verification
- **Domain Isolation**: Each domain gets unique keypair (prevents cross-site correlation)
- **Multi-Instance Support**: Session cookies work across server instances

## Content Structure Standards

### File Organization
```
src/content/
├── lightning-login.education.json    # Non-technical explanations
├── developer/
│   ├── lightning-login.developer.json  # Main developer content (sections)
│   ├── overview.json                   # Developer overview sections
│   ├── deep-dive.json                  # Technical deep dive
│   ├── examples.json                   # Code examples
│   ├── integration-patterns.json       # Integration patterns
│   └── wallets.json                    # Wallet support list
```

### Content Consistency Rules

1. **Terminology** (use consistently):
   - "k1 challenge" (not just "k1" or "challenge")
   - "public key" or "pubkey" (technical contexts)
   - "linking key" (user-friendly contexts)
   - "LNURL-auth" (protocol name)
   - "Lightning Login" (product/brand name)

2. **Technical Specifications** (always accurate):
   - k1: 32-byte random hex string (64 characters)
   - Expiration: 5 minutes
   - Signature: ECDSA with secp256k1
   - Encoding: Bech32 (lnurl1...)
   - Cookie: httpOnly, secure (production), sameSite: 'lax'

3. **Flow Descriptions** (must match):
   - Server generates k1
   - Server encodes callback URL to LNURL
   - Frontend displays QR code
   - Wallet scans, decodes, derives key, signs k1
   - Wallet calls callback with key, sig, k1
   - Server verifies k1 and signature
   - Server creates session cookie
   - Frontend detects authentication

4. **Wallet Lists** (keep synchronized):
   - Alby (Browser extension, Web)
   - Breez (iOS, Android)
   - Wallet of Satoshi (iOS, Android, Web)
   - Phoenix (iOS, Android) - coming soon

## Code Example Standards

### Requirements
- **Must match actual implementation** - Code should be copy-paste ready
- **Include file paths** - Reference actual files in codebase
- **Add comments** - Explain what each part does
- **Show error handling** - Include try-catch and validation
- **Use correct API** - `lnurl.encode(urlString)`, not `lnurl.encode({...})`
- **Correct parameter order** - `verifyAuthorizationSignature(sig, k1, pubkey)`

### Example Format
```typescript
// File: src/lib/lnurl/generateK1.ts
import { randomBytes } from "crypto";

export function generateK1(): string {
  // Generate 32 random bytes, convert to hex string (64 characters)
  return randomBytes(32).toString("hex");
}
```

## Documentation Standards

### When Writing Content

1. **Be Precise**: Use exact technical terms, don't simplify incorrectly
2. **Be Complete**: Include all relevant details (expiration times, sizes, algorithms)
3. **Be Consistent**: Use same terminology across all content files
4. **Be Educational**: Explain "why" not just "what"
5. **Be Accurate**: Every technical claim must be verifiable

### When Reviewing Content

1. **Check Terminology**: Ensure consistent use across all files
2. **Verify Technical Details**: k1 size, expiration, algorithms must match
3. **Validate Code Examples**: Must match actual implementation
4. **Cross-Reference**: Ensure education and developer content align
5. **Check Wallet Lists**: Must be synchronized everywhere

## Common Mistakes to Avoid

### Technical Errors
- ❌ Using `lnurl.encode({tag, k1, callback})` - WRONG
- ✅ Using `lnurl.encode(urlString)` - CORRECT
- ❌ `verifySignature(pubkey, sig, k1)` - WRONG order
- ✅ `verifyAuthorizationSignature(sig, k1, pubkey)` - CORRECT order
- ❌ Saying "Ed25519" without clarifying current standard is secp256k1
- ✅ Always specify "ECDSA with secp256k1 (current standard)"

### Content Inconsistencies
- ❌ Different expiration times in different files
- ✅ Always "5 minutes" everywhere
- ❌ Different wallet lists in different places
- ✅ Use wallets.json as source of truth
- ❌ Contradictory flow descriptions
- ✅ Use deep-dive.json flow as canonical reference

### Educational Gaps
- ❌ Explaining "what" without "why"
- ✅ Always explain the reasoning behind design decisions
- ❌ Using jargon without explanation
- ✅ Define terms on first use, link to glossary
- ❌ Missing cross-references between sections
- ✅ Link related concepts (education ↔ developer)

## Content Synchronization Checklist

When updating content, verify:

- [ ] Terminology matches across all files
- [ ] Technical specs match (k1 size, expiration, algorithms)
- [ ] Flow descriptions align (education, developer, deep-dive)
- [ ] Wallet lists synchronized (wallets.json is source of truth)
- [ ] Code examples match actual implementation
- [ ] FAQ answers don't contradict each other
- [ ] Cross-references added where appropriate
- [ ] Build succeeds after changes
- [ ] No linter errors

## Key Concepts to Master

### Cryptographic Fundamentals
- **Public Key Cryptography**: Private key signs, public key verifies
- **ECDSA**: Elliptic Curve Digital Signature Algorithm
- **secp256k1**: The elliptic curve used by Bitcoin
- **Bech32**: Encoding format for LNURL (error detection, QR-friendly)
- **BIP32**: Hierarchical deterministic key derivation

### Protocol Mechanics
- **Challenge-Response**: Server challenges, wallet responds with proof
- **Nonce**: k1 is a cryptographic nonce (number used once)
- **Replay Attack Prevention**: Single-use + time-limited challenges
- **Domain Isolation**: Unique keypair per domain prevents correlation
- **Stateless Authentication**: Public key as identifier, no credential storage

### Implementation Patterns
- **Session Cookies**: httpOnly, secure, sameSite for security
- **Polling**: Use /api/auth/status for auth detection
- **Multi-Instance Support**: Session cookies work across server instances
- **Error Handling**: Comprehensive logging for production debugging
- **CORS Headers**: Required for wallet callbacks

## File Reference Guide

### Core Implementation Files
- `src/lib/lnurl/generateK1.ts` - k1 generation
- `src/lib/lnurl/encodeLNURL.ts` - LNURL encoding
- `src/lib/lnurl/verifySignature.ts` - Signature verification
- `src/lib/store/pendingLogins.ts` - k1 storage (in-memory)
- `src/lib/session/createSession.ts` - Session cookie creation
- `src/lib/session/getSession.ts` - Session cookie reading
- `src/app/api/auth/lnurl/route.ts` - LNURL endpoint
- `src/app/api/auth/callback/route.ts` - Callback handler
- `src/app/api/auth/status/route.ts` - Status checking

### Content Files
- `src/content/lightning-login.education.json` - Education content
- `src/content/developer/lightning-login.developer.json` - Developer sections
- `src/content/developer/overview.json` - Developer overview
- `src/content/developer/deep-dive.json` - Technical deep dive
- `src/content/developer/examples.json` - Code examples
- `src/content/developer/integration-patterns.json` - Integration patterns
- `src/content/developer/wallets.json` - Wallet support (source of truth)

## Response Format Standards

When helping with this project:

1. **Always verify against actual code** - Read implementation files before making claims
2. **Reference specific files** - Use file paths when discussing code
3. **Maintain consistency** - Check existing content before adding new content
4. **Prioritize education** - Explain concepts clearly, not just show code
5. **Validate changes** - Always run build after content changes
6. **Cross-check** - Ensure new content aligns with existing content

## Quick Reference: Technical Specifications

| Concept | Specification | Notes |
|---------|--------------|-------|
| k1 Challenge | 32 bytes (64 hex chars) | Cryptographically random |
| k1 Expiration | 5 minutes | Prevents stale challenges |
| k1 Usage | Single-use | Deleted after auth |
| Signature Algorithm | ECDSA | secp256k1 curve |
| Encoding Format | Bech32 | lnurl1... prefix |
| Session Cookie | httpOnly, secure, sameSite: 'lax' | Public key as value |
| Key Derivation | BIP32-like | Domain-specific |
| Callback Method | GET | Query parameters |
| Response Format | JSON | {status: "OK"} or {status: "ERROR"} |

## Educational Principles

1. **Start Simple**: Explain concepts before diving into implementation
2. **Build Complexity**: Layer details progressively
3. **Use Analogies**: Compare to familiar concepts when helpful
4. **Show Examples**: Real code from actual implementation
5. **Explain Why**: Design decisions matter as much as what was built
6. **Connect Concepts**: Link related ideas across sections
7. **Be Accurate**: Every claim must be technically correct
8. **Be Complete**: Don't skip important details

## When in Doubt

1. **Read the actual code** - Implementation is the source of truth
2. **Check multiple content files** - Ensure consistency
3. **Verify technical specs** - Use this guide's specifications
4. **Test changes** - Always run build and check for errors
5. **Maintain standards** - Follow the patterns established in existing content

---

**Remember**: This is an educational tool. Every piece of content should help someone understand Lightning Login better. Accuracy, clarity, and consistency are paramount.

