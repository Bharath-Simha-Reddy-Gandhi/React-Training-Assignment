import { useRef, useState } from "react";
import { Link, createSearchParams, useNavigate } from "react-router-dom";

import "../styles/header.css";
import { Login } from "./Login";

export const Header = (props) => {
  const navigate = useNavigate();
  const [query,setQuery] = useState();
  let searchInputValue = useRef("");
  const handleSearch = (e) => {
    e.preventDefault();
    navigate({
      pathname:"/search",
      search: createSearchParams({
        query: query
      }).toString()
    });
  };
  return (
    <>
      <div className="header">
        <Link to={"/"} className="header-title-name">
          Photo Search
        </Link>
        <div className="search-input">
          <input
            type="search"
            className="header-input"
            placeholder="Type Something To Search"
            ref={searchInputValue}
            onChange={(e)=>setQuery(e.target.value)}
          />
          <button onClick={handleSearch}> Search</button>
          </div>
        <Login setTriggerRandomImage={props.setTriggerRandomImages} />
      </div>
    </>
  );
};
