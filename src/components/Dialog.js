import React, { useState, useEffect } from "react";
import { styled } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import { Checkbox } from "@material-ui/core";
import close from "../assets/icons/close.png";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
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
export default function DialogBox({ open, setOpen }) {
  const { user } = Store();
  const [formData, setFormData] = useState({
    phone: user?.phone,
    email: user?.email,
    advice: true,
    contact: true,
  });
  // Destructuring of UserForm State
  const { phone, email, advice, contact } = formData;
  // onChange Function for Input Field
  const onChange = (e) => {
    if (e.target.name === "advice" || e.target.name === "contact") {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = async () => {
    if (phone.length != 10 || phone[0] != 0) {
      return toast.error(
        "Le numéro de téléphone doit être composé de 10 chiffres et commencer par 0"
      );
    }
    let res = await api("post", "/users/update", {
      ...formData,
      id: user._id,
    });
    if (res) {
      toast.success("Merci, vous serez contacté prochainement");

      setOpen(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        open={open}
        style={{ backdropFilter: "blur(20px)" }}
      >
        <IconButton
          className="closeButton"
          aria-label="close"
          onClick={handleClose}
        >
          <HorizontalRuleIcon fontSize="large" />
        </IconButton>
        <DialogContent className="modalcontent">
          <h3 className="dialogHeading">
            Besoin de plus d'informations sur <br className="br" /> ton projet
            d'études ?{" "}
          </h3>
          <Grid container spacing={1} className="popupcheckbox">
            <Checkbox
              inputProps={{ "aria-label": "secondary checkbox" }}
              style={{ color: "white" }}
              className="checkboxpop"
              name="advice"
              defaultChecked
              value={advice}
              onChange={onChange}
            />
            <span className="dialogcheckboxtext">
              Je veux recevoir des conseils, des informations, et des
              invitations à des événements d'orientation en rapport avec mon
              projet.
            </span>
          </Grid>
          <Grid container spacing={1} className="popupcheckbox">
            <Checkbox
              inputProps={{ "aria-label": "secondary checkbox" }}
              style={{ color: "white" }}
              className="checkboxpop"
              name="contact"
              defaultChecked
              value={contact}
              onChange={onChange}
            />
            <span className="dialogcheckboxtext">
              Je souhaite être contacté gratuitement par un conseiller
              Orientator pour répondre davantage à mes questions ou clarifier
              certains aspects de mon
              <br className="br" /> projet.
            </span>
          </Grid>
          <Grid container spacing={1} className="dialoginputGrid">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="E-mail"
              className="dialoginputField"
              required
            />
          </Grid>
          <Grid container spacing={1} className="dialoginputGrid">
            <input
              type="phone"
              name="phone"
              value={phone}
              onChange={onChange}
              placeholder="06.64.31.31.43"
              className="dialoginputField"
              required
            />
          </Grid>
        </DialogContent>
        <div className="dialogAction">
          <button className="modalButon" onClick={handleSubmit}>
            Envoyer
          </button>
        </div>
      </BootstrapDialog>
    </div>
  );
}
