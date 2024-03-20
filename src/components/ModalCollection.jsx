import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ApiCalls } from "./ApiCalls";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ModalCollection = (props) => {
  const [collectionList, setCollectionList] = useState();
  const [collectionListLoad, setCollectionListLoad] = useState(false);

  const getCollectionList = async () => {
    setCollectionListLoad(false);
    const response = await ApiCalls.userSelectedInput(sessionStorage.getItem("userName"),"collections","1");
    if (response.ok) {
      const responseData = await response.json();
      setCollectionList(responseData);
      setCollectionListLoad(true);
      console.log(responseData);
    }
  };

  useEffect(() => {
    getCollectionList();
  }, []);
  console.log(collectionListLoad);
  return (
    <>
      <div>
        {collectionListLoad ? (
          <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {collectionList.map((list) => {
                return (
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {list.title}
                  </Typography>
                );
              })}
            </Box>
          </Modal>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};
