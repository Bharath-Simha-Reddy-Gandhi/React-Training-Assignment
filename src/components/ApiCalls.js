import { Constants } from "./Constants";
const auth = sessionStorage.getItem("accessToken");

export const ApiCalls = {
  exchangeAuthCode: async (authorizationCode) => {
    return await fetch("https://unsplash.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: Constants.unsplashClientId,
        client_secret: process.env.REACT_APP_API_KEY,
        redirect_uri: Constants.unsplashRedirectUri,
        code: authorizationCode,
        grant_type: "authorization_code",
      }),
    });
  },

  getProfileDetail: async () => {
    return await fetch(`${Constants.api_url}/me`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
  },

  getPublicUserProfile: async (username) =>{
    let headerAuth =
    auth !== null
      ? `Bearer ${sessionStorage.getItem("accessToken")}`
      : `Client-ID ${process.env.REACT_APP_CLIENT_ID}`;
      console.log(headerAuth)
    return await fetch(`${Constants.api_url}/users/${username}`, {
      headers: {
        Authorization: headerAuth,
      },
    });
  },

  userSelectedInput: async (userData, userSelected, page) => {
    let headerAuth =
    auth !== null
      ? `Bearer ${sessionStorage.getItem("accessToken")}`
      : `Client-ID ${process.env.REACT_APP_CLIENT_ID}`;
    return await fetch(
      `${Constants.api_url}/users/${userData}/${userSelected}?page=${page}`,
      {
        headers: {
          Authorization: headerAuth,
        },
      }
    );
  },

  getPhotoDetails: async (auth, id) => {
    let headerAuth =
      auth !== null
        ? `Bearer ${sessionStorage.getItem("accessToken")}`
        : `Client-ID ${process.env.REACT_APP_CLIENT_ID}`;
    return await fetch(`${process.env.REACT_APP_API_URL}/photos/${id}`, {
      headers: {
        Authorization: headerAuth,
      },
    });
  }

};
