import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Main from "../assets/img/a2.png";
import MainCharacter from "../assets/img/MainCharacter.png";
import scrollToTop from "../utils/ScrollTop";
import video1 from "../assets/video/orientatorVideo.mp4";
import thumbnail from "../assets/img/thumbnail.jpg";
import Cookies from "../utils/Cookies";
import CookiesPopup from "../utils/CookiesPopup";
import CookiesPopup2 from "../utils/CookiesPopup2";
import Contactus from "../utils/Contactus";
import RefuserPopup from "../utils/RefuserPopup";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import f1 from "../assets/img/f1.png";
import f2 from "../assets/img/f2.png";
import f3 from "../assets/img/f3.png";
import arrowright from "../assets/img/arrow.png";
import Footer from "./Footer";

import api from "../api";

import CountUp from "react-countup";

const Landing = ({ step, setStep, statetextforscroll }) => {
  const [openCookieePopup, setOpenCookieePopup] = useState(false);
  const [reuserPopup, setRefuserPopup] = useState(false);
  const [openCookieePopup2, setOpenCookieePopup2] = useState(false);
  const [checkCookies, setCookies] = useState(false);
  const items = [
    {
      text: "Fonctionnalités liées aux réseaux sociaux",
      accept: false,
      refuse: false,
    },
    { text: "Mesure d'audience", accept: false, refuse: false },
    {
      text: "Fonctionnalités liées à l'amélioration de votre expérience",
      accept: false,
      refuse: false,
    },
    {
      text: "Stocker et/ou accéder à des informations sur un terminal",
      accept: false,
      refuse: false,
    },
    {
      text: "Personnalisation du contenu éditorial et mesure de la performance",
      accept: false,
      refuse: false,
    },
    {
      text: "Personnalisation des publicités et mesure de la performance",
      accept: false,
      refuse: false,
    },
    {
      text: "Développer et améliorer les produits",
      accept: false,
      refuse: false,
    },
    {
      text: "Utiliser des données de géolocalisation précises",
      accept: false,
      refuse: false,
    },
    {
      text: "Analyser activement les caractéristiques du terminal pour l’identification",
      accept: false,
      refuse: false,
    },
  ];
  const [data, setData] = useState(items);
  const [siteViews, setSiteViews] = useState(null);
  const { state } = useLocation();
  const capture1 = React.createRef();
  const video = document.getElementById("video");

  const scrollToTop = () => {
    window.scrollTo({
      top: 11,
      behavior: "smooth",
    });
  };
  const scrollToTopforComment = () => {
    window.scrollTo({
      top: 800,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setCookies(true);
    }, 5000);
  }, []);

  useEffect(() => {
    video?.play();
    scrollToTop();

    statetextforscroll == "Accueil" && scrollToTop();
    (statetextforscroll == "Comment" || state == "Comment") &&
      setTimeout(() => {
        scrollToTopforComment();
      }, 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  useEffect(() => {
    updateSiteViews();
  }, []);

  const updateSiteViews = async () => {
    const data = await api("post", "/siteViews");
    if (data.data) {
      setSiteViews(data.data.siteViews);
    }
  };

  return (
    <>
      <Helmet>
        <link rel="preload" as="image" href={Main} />
        <link rel="preload" as="image" href={MainCharacter} />
        <link rel="preload" as="image" href={arrowright} />
        <link rel="preload" as="image" href={f1} />
        <link rel="preload" as="image" href={f2} />
        <link rel="preload" as="image" href={f3} />
      </Helmet>
      <div className="main" id="top">
        <img src={Main} className="bodyimg forweb" />
        <img
          src={MainCharacter}
          alt="Orientator's Mian charachter"
          className="bodyimg formobile "
        />
        <Grid container spacing={2} className="body-rectangle">
          <Grid item xs={12} sm={9} className="body-rectangleGrid2">
            <h1 className="h3">Commençons le test d'orientation!</h1>
            <p className="p1">
              À la fin de ce questionnaire, une proposition de voeux pour
              Parcoursup te sera formulée!
            </p>
          </Grid>
          <Grid item xs={12} sm={3} className="body-rectangleGrid3">
            <div className="partibuttondiv">
              <button
                className="partiButton"
                onClick={() =>
                  localStorage.cookies ? setStep(1) : setOpenCookieePopup(true)
                }
              >
                C'est parti!
              </button>
              <img src={arrowright} className="arrowright" alt="arrowIcon" />
            </div>
          </Grid>
        </Grid>
        <div id="comment" className="vidoSection">
          <h2 className="h2">Comment ça marche?</h2>
        </div>
        <div style={{ margin: "10px" }}>
          <video
            id="video"
            src={video1}
            poster={thumbnail}
            className="videImage"
            controls="controls"
            autoplay={true}
            type="video/mp4"
            loop
          />
        </div>

        <Grid
          container
          spacing={3}
          className="footerGrid"
          id="my-node"
          ref={capture1}
        >
          <Grid item xs={12} sm={4}>
            <img src={f1} className="footerimg" alt="footerImg" />
            <h4 className="h4">Étape 1</h4>
            <p className="p3">Dis à Orientator qui tu es.</p>
          </Grid>
          <Grid item xs={12} sm={4}>
            <img src={f2} className="footerimg" alt="etape2" />
            <h4 className="h4">Étape 2</h4>
            <p className="p3">Réponds aux questions d'Orientator.</p>
          </Grid>
          <Grid item xs={12} sm={4} id="MyElementIdHere">
            <img src={f3} className="footerimg" alt="etape3" />
            <h4 className="h4">Étape 3</h4>
            <p className="p3">
              Orientator te propose une liste de voeux pour ton Parcoursup!
            </p>
          </Grid>
        </Grid>
        {/* <button onClick={onButtonClick}>Download PDF</button> */}
      </div>
      {!siteViews ? (
        <></>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontSize: "30px",
              fontWeight: "600",
              color: "#D4D8E5",
            }}
          >
            Nombre de visiteurs
          </p>
          <CountUp
            start={1}
            end={
              siteViews.count > 800 ? siteViews.count : siteViews.count + 800
            }
            duration={5}
            style={{
              fontSize: "100px",
              color: "#FFFFFF",
              alignSelf: "center",
              background: "#010F2C",
              letterSpacing: "18px",
              textIndent: "18px",
            }}
          />
        </div>
      )}
      <Contactus />
      <Footer />
      <CookiesPopup
        open={openCookieePopup}
        setOpen={setOpenCookieePopup}
        setOpenCookieePopup2={setOpenCookieePopup2}
        data={data}
        setData={setData}
      />
      <CookiesPopup2
        open={openCookieePopup2}
        setOpen={setOpenCookieePopup2}
        setData={setData}
      />
      {checkCookies
        ? !localStorage.cookies && (
            <Cookies
              setCookies={setCookies}
              setOpenCookieePopup={setOpenCookieePopup}
              setRefuserPopup={setRefuserPopup}
            />
          )
        : ""}
      <RefuserPopup
        open={reuserPopup}
        setOpen={setRefuserPopup}
        setData={setData}
        setOpenCookieePopup={setOpenCookieePopup}
      />
    </>
  );
};
export default Landing;
