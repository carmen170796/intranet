import { createCookieSessionStorage} from "@remix-run/node";
import invariant from "tiny-invariant";

const url = "test.com"

export async function loginReal( username: string, password :string ) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  let payload = JSON.stringify({
    'userInfo': [
      {
        'userLogin': username,
        'password': password,
        'loginOK' : false,
        'userName' : null,
        'profil' : null,
        'dBError' : null
      }
    ]
  });

  const response = await fetch( url, {
    method: 'POST',
    headers: myHeaders,
    body: payload,
  });

  if(response.status === 200) {
    const responseData = await response.json();
    // set the session details 
    if (responseData.loginOk > 0) {
      //  $_SESSION["Login_OK"] = TRUE;
      //  $_SESSION["Login_ok"] = TRUE;
      //  $_SESSION["LoginUsername"] = $UserName;
      //  $_SESSION["Profil"] = $profil;
      //  $_SESSION["User"] = $usr;
      //  $_SESSION["loginIP"] = $_SERVER["REMOTE_ADDR"];
    }
    // throw Error 
  }
  return null;
}

export async function login(username:any, password:any) {
  if (username === "test" && password === "test") {
    return "Authenticated"
  }
  return null
}

export async function submitFilters( login:string, status: string, zeitVon:string, zeitBis:string, product:string, typ:string, ma:string) {
  product = product.replace('*','%')
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  let payload = JSON.stringify({
    'filters': [
      {
        'login': login,
        'status': status,
        'from' :zeitVon,
        'until' : zeitBis,
        'typ' : typ,
        'product': product,
        'ma' : ma, 
        'DBError': null
      }
    ]
  });

  const response = await fetch( url, {
    method: 'POST',
    headers: myHeaders,
    body: payload,
  });

  if(response.status === 200) {
    const responseData = await response.json();
    // throw Error 
  }
  return null;
}

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    maxAge:  60 * 60 * 24 * 60,
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production"
  }
});

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession()
  session.set('userId', userId)
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  })
}

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function deleteSession(request: Request) {
  const session = await getSession(request);
  return await sessionStorage.destroySession(session);
}
