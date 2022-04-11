import React, { useState, useEffect } from "react";
import { styled } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import Grid from "@material-ui/core/Grid";

import { Store, UpdateStore } from "../StoreContext";
import api from "../api";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default function ConfirmationPop({
  confirmationOpen,
  SetconfirmationOpen,
  setStep,
  setActiveStep,
  otpbyemail,
  userformdata,
  handleSubmit,
  loadingresend,
  timeLeft,
}) {
  const updateStore = UpdateStore();
  const { user } = Store();
  const [loading, setLoading] = useState(false);
  const [resendloading, setResendloading] = useState(false);
  const [formData, setFormData] = useState({
    otp: "",
  });
  // Destructuring of UserForm State
  const { otp } = formData;
  // onChange Function for Input Field
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitverify = async () => {
    setLoading(true);

    let res = await api("post", "/users/verify", {
      otp,
    });
    if (res.status === 200) {
      SetconfirmationOpen(false);
      updateStore({
        questions: res?.data?.questions,
        answers: res?.data?.answers,
        user: res?.data?.user,
      });
      setLoading(false);
      setFormData({ otp: "" });
      setStep(2);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setLoading(false);
      setFormData({ otp: "" });
      toast.error("Votre OTP n'est pas correct");
    }
    // let res = await api("post", "/users/invite", {
    //   ...formData,
    // });
    // if (res) {
    //   toast.success("invitation envoyée avec succès");
    //   setFormData({ email: "" });
    //   setLoading(false);
    //   SetconfirmationOpen(false);
    // }
  };
  const handleClose = () => {
    SetconfirmationOpen(false);
  };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        open={confirmationOpen}
        style={{ backdropFilter: "blur(20px)" }}
      >
        <IconButton
          className="InvitecloseButton"
          aria-label="close"
          onClick={handleClose}
        >
          <HorizontalRuleIcon fontSize="large" />
          {/* <img src={close} className="closeimg" /> */}
        </IconButton>
        <DialogContent className="modalcontent">
          <h3 className="dialogHeading">
            {otpbyemail
              ? "Entrez le code de vérification reçu par e-mail"
              : "Entrez le code de vérification à six chiffres"}
          </h3>
          <Grid container spacing={1} className="invitedialoginputGrid">
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={onChange}
              placeholder="Entrez le code de vérification"
              className="dialoginputField"
              required
            />
          </Grid>
        </DialogContent>

        <div className="invitedialogAction">
          <button
            className="resendButton"
            onClick={handleSubmit}
            disabled={loadingresend}
          >
            Renvoyer {loadingresend && timeLeft}
          </button>
          <button
            size="Large"
            className="InvitemodalButon"
            onClick={handleSubmitverify}
            disabled={loading}
          >
            Vérifier
          </button>
        </div>
      </BootstrapDialog>
    </div>
  );
}
