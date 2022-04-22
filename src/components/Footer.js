import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import AnchorLink from "react-anchor-link-smooth-scroll";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <>
      <div className="FooterDiv">
        <div className="cguBar">
          <div>
            <h3 className="footeraccueil" style={{ textAlign: "" }}>
              {/* <AnchorLink
              href="#top"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Accueil
            </AnchorLink> */}
            </h3>

            <div>
              <p>ORIENTATOR</p>
              <p>01 84 80 74 81</p>
              <p>75116 Paris, France</p>
              {/* <p>E-mail : contact@orientator.com</p>
              <p>Téléphone : 01 84 80 74 81</p> */}
            </div>
          </div>
          <div className="developbydiv">
            <p className="developby" style={{ textAlign: "" }}>
              {/* Développé par */}
              <a
                href="https:www.falconconsulting.fr"
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: " gray",
                  margin: "5px"
                }}
              >
                {" "}
                {/* Falcon Consulting */}
              </a>{" "}
              2021. Tous droits réservés
            </p>
            <div>
              <a
                href="https://mobile.twitter.com/Orientator_FR"
                target="_blank"
              >
                <TwitterIcon
                  style={{
                    padding: "0 9px",
                    cursor: "pointer",
                    color: "white"
                  }}
                />
              </a>
              <a
                href="https://www.linkedin.com/company/orientator/"
                target="_blank"
              >
                <LinkedInIcon
                  style={{
                    padding: "0 9px",
                    cursor: "pointer",
                    color: "white"
                  }}
                />
              </a>

              <a
                href="https://www.facebook.com/OrientatorFrance/"
                target="_blank"
              >
                <FacebookIcon
                  style={{
                    padding: "0 9px",
                    cursor: "pointer",
                    color: "white"
                  }}
                />
              </a>
              <a
                href="https://www.instagram.com/orientator_france/"
                target="_blank"
              >
                <InstagramIcon
                  style={{
                    padding: "0 9px",
                    cursor: "pointer",
                    color: "white"
                  }}
                />
              </a>
              <a
                href="https://www.youtube.com/channel/UCPOjsSGMJg3Zwo-RjUoV3oA/videos"
                target="_blank"
              >
                <YouTubeIcon
                  style={{
                    padding: "0 9px",
                    cursor: "pointer",
                    color: "white"
                  }}
                />
              </a>
            </div>
          </div>
          {/* <div className="cguDiv"> */}
          <div>
            <div className="footercgu" style={{ textAlign: "" }}>
              <Link
                to="/CGU"
                className="cgufont"
                style={{ color: "white", textDecoration: "none" }}
              >
                CGU
              </Link>
              <p style={{ margin: "20px" }} />
              <Link
                to="/MentionsLegal"
                className="MentionsLegal"
                style={{ color: "white", textDecoration: "none" }}
              >
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
