import React from "react";
import { Dialog } from "@mui/material";
import InputComponent from "../InputComponent/InputComponent";
import { useDispatch } from "react-redux";


const AmountInputModal = ({ setOpen, amount, setAmount, clickedRowId }) => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    setOpen(false);
  }

  return (
    <Dialog
      open={true}
      sx={{
        "& .MuiDialog-paper": {
          padding: "20px 30px",
          height: "20vh",
          width: "20%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        },
      }}
    >
      <InputComponent
        label="Amount"
        type="number"
        value={amount}
        setValue={setAmount}
      />
      <button
        style={{ marginTop: "20px", marginLeft: "auto", marginBottom: "0" }}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </Dialog>
  );
};

export default AmountInputModal;
