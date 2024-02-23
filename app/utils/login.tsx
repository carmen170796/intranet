//import type {SessionData} from '~/routes/sessions';
import { getAccessToken } from './authorization';
import { API_URL } from "../constants";


export async function loginUser( username: string, password :string ) { 
  const token = await getAccessToken()
  
  if(!token){
    return null
  }

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization',  `Bearer ${token.access_token}`);
 
  let payload = JSON.stringify({
        'username': username,
        'password': password
  }
  );  

  try {
    const response = await fetch( API_URL + "login", {
      method: 'POST',
      headers: myHeaders,
      body: payload,
    });

    
    if (response.ok) {
      const data = await response.json()
      return data
    } 
    
    else {
      const error = new Error( "There was a problem with our database. Please try again")
      return Promise.reject({message: error, status: response.status })
    }
  }  
  catch (err) {
    return Promise.reject(err)
  }
}
