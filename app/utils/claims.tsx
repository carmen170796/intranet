import { getAccessToken } from "./authorization";
import { API_URL } from "../constants";

type Filters = {
  login: string;
  status: string;
  type: string;
  startDate: string;
  endDate: string;
  product: string;
  ma: string;
};

export async function getNewClaims({
  login,
  status,
  type,
  startDate,
  endDate,
  product,
  ma,
}: Filters) {
  try {
    const token = await getAccessToken();
    if (!token)  {
      return "No token"
    }

    const requestOptions = {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${token.access_token}`
      }
    }
    const response = await fetch( API_URL + "newClaims?" + new URLSearchParams({
      login: login,
      status: status,
      type: type,
      startDate: startDate,
      endDate: endDate,
      product: product,
      ma: ma,
      }), requestOptions
        )

    if (response.ok) {
      const data = await response.json()
      const claims = data.claims 
      return claims 
      }

    else if (response.status === 404 || response.status === 500) {
      return (await response.text())
    }

    else {
      // For other error status codes, throw a generic error
      //throw new Error(`Status: ${response.status}`);
      const message = "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. "
      return Promise.reject({message:message})
    }

     
  } catch (err) {
    const message = "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. "
    return Promise.reject({message:message})

  }
}

export async function getEditedClaims({
  login,
  status,
  type,
  startDate,
  endDate,
  product,
  ma,
}: Filters) {
  try {
    const token = await getAccessToken();
    if (!token)  {
      return "No token"
    }

    const requestOptions = {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${token.access_token}`
      }
    }
    const response = await fetch( API_URL + "processedClaims?" + new URLSearchParams({
      login: login,
      status: status,
      type: type,
      startDate: startDate,
      endDate: endDate,
      product: product,
      ma: ma,
      }), requestOptions
        )

    if (response.ok) {
      const data = await response.json()
      const claims = data.claims 
      return claims 
      }

    else if (response.status === 404 || response.status === 500) {
      return (await response.text())
    }

    else {
      const message = "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. "
      return Promise.reject({message:message})
    }

     
  } catch (err) {
    const message = "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. "
    return Promise.reject({message:message})
  }
}

export async function getEmployees() {
  try {
    const token = await getAccessToken();
    if (!token)  {
      return "No token"
    }

    const requestOptions = {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${token.access_token}`
      }
    }
    const response = await fetch( API_URL +"employees", requestOptions)
    const data = await response.json()
    if (response.ok) {
      const employees = data.employees;
        return employees 
      }
    } catch (err) {
    return Promise.reject(err);
  }
}
