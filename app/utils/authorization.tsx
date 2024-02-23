import { OAUTH_SCOPE, CLIENT_SECRET, CLIENT_ID, OAUTH_URL } from "../constants";

 export async function getAccessToken() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer access_token");
  const formdata = new FormData();
  formdata.append("grant_type", "client_credentials");
  formdata.append("client_id", CLIENT_ID);
  formdata.append("client_secret", CLIENT_SECRET);
  formdata.append("scope", OAUTH_SCOPE);

  try {
    const response = await fetch(  OAUTH_URL, {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    });
 
    if (!response.ok) {
      throw new Error("Bad fetch response");
    }

    return  await response.json() 

  } catch(error) {
    
    console.error("An error has ocurred:", error)
  }
}

