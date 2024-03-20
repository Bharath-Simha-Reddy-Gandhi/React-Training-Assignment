import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Constants } from "./Constants";
import { ApiCalls } from "../components/ApiCalls";

export const Login = (props) => {
  const navigate = useNavigate();
  const authorizationCode = new URLSearchParams(window.location.search).get(
    "code"
  );
  const authorizationUrl = `https://unsplash.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&response_type=code&scope=${Constants.unsplashScope}`;
  const accessTokenAuth = sessionStorage.getItem("accessToken");


  const exchangeAuthorizationCode = async (authorizationCode) => {
    const response = await ApiCalls.exchangeAuthCode(authorizationCode);

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.access_token;
      sessionStorage.setItem("accessToken", accessToken);
      userDetails();
      props.setTriggerRandomImage((prev) => !prev);
      navigate("/");
    } else {
      handleLogin();
      alert(
        "Error exchanging authorization code for access token:",
        response.statusText
      );
    }
  };
  const userDetails = async () =>{
    const response = await ApiCalls.getProfileDetail()
    if(response.ok){
      const resposneData= await response.json()
      sessionStorage.setItem("userID",resposneData.id);
      sessionStorage.setItem("userName",resposneData.username);
    }
  }

  const handleLogin = () => {
    window.location.href = authorizationUrl;
  };

  const handleLogOut = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userID");
    sessionStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    if (authorizationCode) {
      exchangeAuthorizationCode(authorizationCode);
    }
  }, []);
  return (
    <>
      {accessTokenAuth ? (
        <div className="logged-in-user">
          <button className="user-profile">
            {" "}
            <a href="/profile-page">User Profile</a>
          </button>
          <button className="logout-button" onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      ) : (
        <button className="login-button">
          <a onClick={handleLogin}>Login</a>
        </button>
      )}
    </>
  );
};
