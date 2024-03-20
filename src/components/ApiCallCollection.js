const auth = sessionStorage.getItem("accessToken");


export const ApiCallCollection = {

    getCollection: async (id) => {
        let headerAuth = (auth !== null ? `Bearer ${sessionStorage.getItem("accessToken")}` : `Client-ID ${process.env.REACT_APP_CLIENT_ID}`)
        return (await fetch(
            `${process.env.REACT_APP_API_URL}/collections/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: headerAuth,
                },
            }
        )

        )
    },
    getCollectionPhotos: async (id) => {
        let headerAuth = (auth !== null ? `Bearer ${sessionStorage.getItem("accessToken")}` : `Client-ID ${process.env.REACT_APP_CLIENT_ID}`)
        return (await fetch(
            `${process.env.REACT_APP_API_URL}/collections/${id}/photos`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: headerAuth,
                },
            }
        )

        )
    },
    getCollectionList: async () => {
        let headerAuth = (auth !== null ? `Bearer ${sessionStorage.getItem("accessToken")}` : `Client-ID ${process.env.REACT_APP_CLIENT_ID}`)
        return (await fetch(
            `${process.env.REACT_APP_API_URL}/collections`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: headerAuth,
                },
            }
        )

        )
    },
    deleteCollection: async (collectionID) => {
        let headerAuth = (auth !== null ? `Bearer ${sessionStorage.getItem("accessToken")}` : `Client-ID ${process.env.REACT_APP_CLIENT_ID}`)

        return (await fetch(
            `${process.env.REACT_APP_API_URL}/collections/${collectionID}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: headerAuth,
                },
            }
        )

        )
    },
    deleteCollectionPhoto: async (collectionID,photoID) => {
        let headerAuth = (auth !== null ? `Bearer ${sessionStorage.getItem("accessToken")}` : `Client-ID ${process.env.REACT_APP_CLIENT_ID}`)

        return (await fetch(
            `${process.env.REACT_APP_API_URL}/collections/${collectionID}/remove?photo_id=${photoID}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: headerAuth,
                },
            }
        )

        )
    }
}