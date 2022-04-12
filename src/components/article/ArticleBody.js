// Init
import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Avatar2 from "../../assets/icons/logo.png";
import FbIcon from "../../assets/icons/fb2.svg";
import TwitterIcon from "../../assets/icons/twittericon.svg";
import PintrestIcon from "../../assets/icons/pin2.svg";
import Dot from "../../assets/icons/dot2.svg";
import LinkedinIcon from "../../assets/icons/linkedin2.svg";
import YouMayLike from "./YouMayLike";
import { useParams } from "react-router-dom";
import blogImg from "../../assets/3.png";
import { url } from "../../config";
import { Helmet } from "react-helmet";
import moment from "moment";

export default function ArticleBody({ singlBlog, loading, blogs }) {
  const { id } = useParams();
  function htmlfile() {
    return {
      __html: `
      <div class="htmlmaindiv">
        <p class="htmlp1">${singlBlog?.blog_desc}</p>
        <p class="htmlp1">${singlBlog?.blog_content}</p>
        ${
          singlBlog?.yt_link
            ? `
          <iframe
            width="560"
            height="315"
            src=${singlBlog?.yt_link}
            title="YouTube video player"
            frameborder="0"
            allow=
            "accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture"
            allowfullscreen
          />
          `
            : ""
        }
      </div>
      `,
    };
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 1,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {loading ? (
        <h1>Chargement en cours...</h1>
      ) : (
        <div className="articleBodycontainer">
          <Helmet>
            <title>Orientator</title>
            <meta
              name="description"
              content="Commençons le test d'orientation! À la fin de ce questionnaire, une proposition de voeux pour Parcoursup te sera formulée!"
            />
            <meta
              name="keywords"
              content="ParcourSup,Orientator,Post-bac,études,formation,Orientator te propose une liste de voeux pour ton Parcoursup!,votre,étape,navigation,orientator,pour,comment,vous,une"
            />
          </Helmet>
          <img
            // src={blogImg}
            src={url + singlBlog?.blog_images}
            className="articleimg"
            alt="blog"
          />
          <div style={{ width: "85%" }}>
            <h1 className="h1article">{singlBlog?.blog_title}</h1>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={8} sm={9}>
              <div className="articleavatardiv">
                <img src={Avatar2} className="articleavatar" alt="avatar" />
                <div className="articlediv2">
                  <p className="articlep1">Orientator</p>
                  {/* <p className="articlep2">May 15・1 min read</p> */}
                  <p className="articlep2">
                    {moment(singlBlog?.createdAt).format("DD/MM/YYYY")}
                  </p>
                </div>
              </div>
            </Grid>
          </Grid>
          <div dangerouslySetInnerHTML={htmlfile()} />
          <YouMayLike blogs={blogs} loading={loading} />
        </div>
      )}
      {/* <BlogFoote /> */}
    </>
  );
}
