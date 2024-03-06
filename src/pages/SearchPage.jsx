import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Search } from "../components/Search";
import { useSearchParams, useParams } from "react-router-dom";
import { ApiCallSearch } from "../components/ApiCallSearch";
import { Constants } from "../components/Constants";
import "../styles/searchPage.css";

export const SearchPage = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userSelectedInput, setUserSelectedInput] = useState("photos");
  const [query] = useSearchParams();
  const [prevQuery, setPrevQuery] = useState(query.get("query"));
  const [searchQueryData, setSearchQueryData] = useState("");
  const [searchQueryDataLoading, setSearchQueryDataLoading] = useState(false);
  const handleSearch = async (userSelectedInput, queryWord, page) => {
    setSearchQueryDataLoading(false);
    const response = await ApiCallSearch.getSearch(
      userSelectedInput,
      queryWord,
      page
    );
    if (response.ok) {
      const responseData = await response.json();
      setSearchQueryData(responseData.results);
      setSearchQueryDataLoading(true);
      setTotalPages(response.total_pages);
      // if (totalPages === 1) {
      //   const calTotalPages = Math.ceil(
      //     response.headers.get("X-Total") / Constants.per_page
      //   );
      //}
    }
  };

  const handleUserSelected = (items) => {
    setPage(1);
    setSearchQueryDataLoading(false);
    setUserSelectedInput(items);
    handleSearch(Constants.userPhoColSta[items], query.get("query"), page);
  };

  useEffect(() => {
    setPrevQuery(query.get("query"));
    if (query.get("query") != prevQuery) {
      setPage(1);
    }
    handleSearch(userSelectedInput, query.get("query"), page);
  }, [query, page]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="search-page">
      <Header />
      <div className="user-select-options">
        <span
          onClick={() => handleUserSelected("photos")}
          className={userSelectedInput === "photos" ? "selected" : ""}
        >
          Photos
        </span>

        <span
          onClick={() => handleUserSelected("collections")}
          className={userSelectedInput === "collections" ? "selected" : ""}
        >
          Collections
        </span>
        <span
          onClick={() => handleUserSelected("users")}
          className={userSelectedInput === "users" ? "selected" : ""}
        >
          User
        </span>
      </div>

      <div>
        {searchQueryDataLoading ? (
          searchQueryData.length !== 0 ? (
            <Search
              handleSearch={handleSearch}
              page={page}
              query={query.get("query")}
              searchQueryDataLoading={searchQueryDataLoading}
              searchQueryData={searchQueryData}
              userSelectedInput={userSelectedInput}
            />
          ) : (
            <p>
              No {userSelectedInput} with name {query.get("query")}
            </p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {searchQueryData.length !== 0 && (
        <div className="pagination-buttons">
          <button onClick={handlePrevPage} disabled={page === 1}>
            Previous Page
          </button>
          {searchQueryDataLoading && <p>{page}</p>}

          <button onClick={handleNextPage} disabled={page === totalPages}>
            Next Page
          </button>
        </div>
      )}
    </div>
  );
};
