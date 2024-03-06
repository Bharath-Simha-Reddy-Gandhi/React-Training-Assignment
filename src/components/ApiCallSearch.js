const auth = sessionStorage.getItem("accessToken");

export const ApiCallSearch = {

    getSearch: async (selectedInfo,searchQuery,page) =>{
        let headerAuth =
        auth !== null
          ? `Bearer ${sessionStorage.getItem("accessToken")}`
          : `Client-ID ${process.env.REACT_APP_CLIENT_ID}`;
          console.log("headerAuth",searchQuery)
          return await fetch(`${process.env.REACT_APP_API_URL}/search/${selectedInfo}?query=${searchQuery}&page=${page}`, {
            headers: {
              Authorization: headerAuth,
            },
          });
    }
}