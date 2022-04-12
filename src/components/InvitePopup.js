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
export default function InviteBox({ open, setOpen }) {
  const { user } = Store();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    inviteBy: user?.email,
    firstName: user?.first_name,
    lastName: user?.last_name,
  });
  // Destructuring of UserForm State
  const { phone, email, advice, contact, firstName } = formData;
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
    var mailFormat =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(mailFormat)) {
      return toast.error("s'il vous plaît entrez l'e-mail");
    }

    if (!email) {
      return toast.error("s'il vous plaît entrez l'e-mail");
    }
    let newData = {
      email,
      firstName: user?.first_name,
      lastName: user?.last_name,
    };

    setLoading(true);
    let res = await api("post", "/users/invite", {
      ...newData,
    });
    if (res) {
      toast.success("Invitation envoyée avec succès");
      setFormData({ email: "" });
      setLoading(false);
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
          className="InvitecloseButton"
          aria-label="close"
          onClick={handleClose}
        >
          <HorizontalRuleIcon fontSize="large" />
        </IconButton>
        <DialogContent className="modalcontent">
          <h3 className="dialogHeading">Invite un ami</h3>
          <Grid container spacing={1} className="invitedialoginputGrid">
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
        </DialogContent>
        <div className="invitedialogAction">
          <button
            size="Large"
            className="InvitemodalButon"
            onClick={handleSubmit}
            disabled={loading}
          >
            Invite
          </button>
        </div>
      </BootstrapDialog>
    </div>
  );
}
