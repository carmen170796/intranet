// app/sessions.ts
import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

type SessionData = {
    login_ok: boolean,
    loginUsername: string,
    profil:string,
    user:string,

};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      cookie: {
        name: "__session",
        httpOnly: true,
        maxAge:  60 * 60 * 24 * 60,
        path: "/",
        sameSite: "lax",
        secrets: ["s3cret1"], // to change into env 
        secure: true,
        
      },
    }
  );

export { getSession, commitSession, destroySession };