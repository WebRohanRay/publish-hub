// Universal cryptographic authentication for Edge Middleware and Server Handlers

const SECRET_KEY =
  process.env.ADMIN_SESSION_SECRET || "axiom-editorial-super-secret-key-2026-secure";
export const ADMIN_DEFAULT_EMAIL =
  process.env.ADMIN_EMAIL || "admin@axiom.org";
export const ADMIN_DEFAULT_PASSWORD =
  process.env.ADMIN_PASSWORD || "axiom2026!";

export const COOKIE_NAME = "axiom_admin_session";

async function getCryptoKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET_KEY),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBuffer(hex: string): ArrayBuffer {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes.buffer;
}

export interface SessionPayload {
  email: string;
  role: "administrator";
  exp: number; // Unix timestamp ms
}

export async function createSessionToken(email: string): Promise<string> {
  const payload: SessionPayload = {
    email,
    role: "administrator",
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  const payloadString = JSON.stringify(payload);
  const payloadBase64 = btoa(payloadString);

  const key = await getCryptoKey();
  const enc = new TextEncoder();
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(payloadBase64));
  const signatureHex = bufferToHex(signatureBuffer);

  return `${payloadBase64}.${signatureHex}`;
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    if (!token || !token.includes(".")) return null;
    const [payloadBase64, signatureHex] = token.split(".");
    if (!payloadBase64 || !signatureHex) return null;

    const key = await getCryptoKey();
    const enc = new TextEncoder();
    const signatureBuffer = hexToBuffer(signatureHex);

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBuffer,
      enc.encode(payloadBase64)
    );

    if (!isValid) return null;

    const payloadString = atob(payloadBase64);
    const payload: SessionPayload = JSON.parse(payloadString);

    if (Date.now() > payload.exp) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}
