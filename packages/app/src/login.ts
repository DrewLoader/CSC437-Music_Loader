// packages/app/src/login.ts
import { define, Auth } from "@calpoly/mustang";

// Define <mu-auth> on this page from the same NPM package your app uses
define({ "mu-auth": Auth.Provider });

const form = document.getElementById("login-form") as HTMLFormElement | null;
const err = document.getElementById("login-error") as HTMLParagraphElement | null;

// Pick where to go after login. Change to whatever you want:
const REDIRECT_AFTER_LOGIN = "/app/playlist/Country";

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  err && (err.textContent = "");

  const fd = new FormData(form);
  const username = String(fd.get("username") ?? "");
  const password = String(fd.get("password") ?? "");

  try {
    const res = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      const msg = await safeError(res);
      throw new Error(msg || `Login failed (${res.status})`);
    }

    const { token } = (await res.json()) as { token: string };

    // Tell <mu-auth provides="music:auth"> to store the token & navigate
    const ev = new CustomEvent("auth:message", {
      bubbles: true,
      composed: true,
      detail: ["auth/signin", { token, redirect: REDIRECT_AFTER_LOGIN }]
    });

    document.querySelector("mu-auth")?.dispatchEvent(ev);
  } catch (e: any) {
    if (err) err.textContent = e?.message ?? "Login failed";
    console.error(e);
  }
});

async function safeError(res: Response) {
  try {
    const text = await res.text();
    return text;
  } catch {
    return "";
  }
}