import React, { useState, useEffect } from "react";
import { styled } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { Store, UpdateStore } from "../StoreContext";
import { Link } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default function CookiesPopup({
  open,
  setOpen,
  setOpenCookieePopup2,
  data,
  setData,
}) {
  const { user } = Store();

  const handleClose = () => {
    setOpen(false);
  };
  const handleRefuse = (i) => {
    let newitems = data.map((item) =>
      item.text === i.text ? { ...item, refuse: true, accept: false } : item
    );
    setData(newitems);
  };
  const handleAccept = (i) => {
    let newit = data.map((item) =>
      item.text === i.text ? { ...item, refuse: false, accept: true } : item
    );
    setData(newit);
  };
  const handleSavepopup = () => {
    let refuse = false;
    let accept = true;
    data.map((item) => {
      if (item.refuse) {
        refuse = true;
      }
      if (!item.accept) {
        accept = false;
      }
    });
    if (refuse) {
      return setOpenCookieePopup2(true);
    }
    if (accept) {
      localStorage.setItem("cookies", true);
      setOpen(false);
    }
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
          {/* <img src={close} className="closeimg" /> */}
        </IconButton>
        <DialogContent className="modalcontentcookie">
          <p style={{ margin: "0" }} className="toptextpopup">
            Orientator et ses partenaires sélectionnés traitent des données
            personnelles en lien avec votre navigation sur nos contenus pour les
            finalités listées ci-dessous.
          </p>
          <p style={{ margin: "0" }} className="toptextpopup">
            Pour en savoir plus sur nos pratiques en matière de protection des
            données personnelles et la façon dont nous utilisons vos données,
            vous pouvez consulter
            <Link to="/confidentialite" target="_blank" className="cookieeLink">
              {" "}
              politique de confidentialité
            </Link>
          </p>
        </DialogContent>
        <div className="invitedialogAction">
          <div className="cookieeDiv">
            <li className="popupli">
              Fonctionnalités basiques de navigation requises
            </li>
            <div>
              <button className={`${"rejectbtndisabled"}`} disabled>
                Refuser
              </button>
              <button className={`${"acceptbtnActive"}`}>Accepter</button>
            </div>
          </div>
          {data.map((item) => (
            <div className="cookieeDiv">
              <li className="popupli">{item.text}</li>
              <div>
                <button
                  className={`${item.refuse ? "rejectbtnActive" : "rejectbtn"}`}
                  onClick={() => handleRefuse(item)}
                >
                  Refuser
                </button>
                <button
                  className={`${item.accept ? "acceptbtnActive" : "acceptbtn"}`}
                  onClick={() => handleAccept(item)}
                >
                  Accepter
                </button>
              </div>
            </div>
          ))}
          <div>
            <p className="popuptext2">
              Ce site et ses partenaires pourront également réaliser les
              traitements de données suivants : Assurer la sécurité, Prévenir la
              fraude et débogguer, diffuser techniquement les publicités ou le
              contenu, mettre en correspondance et combiner des sources de
              données hors ligne, recevoir et utiliser des caractéristiques
              d’identification d’appareil envoyées automatiquement, et relier
              différents terminaux.
            </p>
            <div className="popupbtndiv">
              {" "}
              <button className="popupsavebtn" onClick={handleSavepopup}>
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </BootstrapDialog>
    </div>
  );
}
