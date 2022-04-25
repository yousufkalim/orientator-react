// Init
import React, { useState, useEffect } from "react";
import BlogBodyimg from "../../assets/img/blogcover2.png";
import BlogBodyimg1 from "../../assets/blogimg1.png";
import LatestArticle from "./LatestArticle";
import YouMayLike from "./YouMayLike";
import api from "../../api";
import { Store, UpdateStore } from "../../StoreContext";
import Carousel from "react-material-ui-carousel";
import { url } from "../../config";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function BlogBody() {
  const [loading, setLoading] = useState(false);
  // init
  const updateStore = UpdateStore();
  const { blogs } = Store();
  useEffect(() => {
    // get blogs
    getBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let getBlogs = async () => {
    setLoading(true);
    let res = await api("get", "/blogs");
    if (res) {
      updateStore({ blogs: res?.data });
    }
    setLoading(false);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 1,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        "Chargement en cours..."
      ) : (
        <>
          <Helmet>
            <title>NOTRE BLOG</title>
            <meta
              name="description"
              content="Commençons le test d'orientation! À la fin de ce questionnaire, une proposition de voeux pour Parcoursup te sera formulée!"
            />
            <meta
              name="keywords"
              content="ParcourSup,Orientator,Post-bac,études,formation,Orientator te propose une liste de voeux pour ton Parcoursup!,votre,étape,navigation,orientator,pour,comment,vous,une"
            />
          </Helmet>
          <div className="BlogBodycontainer">
            <div className="blogimgDiv">
              <img
                src={BlogBodyimg1}
                className="BlogbodyImage"
                alt="blogbody"
              />
            </div>

            <div className="BlogtextonImg">
              <h1 className="BlogtextimgH1">Le Blog Orientator</h1>
              {/* <p className="BlogtextonImgP">Tag Line Here</p> */}
            </div>
          </div>
        </>
      )}

      <LatestArticle blogs={blogs} loading={loading} setLoading={setLoading} />
      <YouMayLike blogs={blogs} loading={loading} setLoading={setLoading} />
    </>
  );
}
