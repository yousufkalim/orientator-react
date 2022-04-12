// Init
import React, { useState, useEffect } from "react";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Index from "./routes/index";
import "./css/index.css";
import { Helmet } from "react-helmet";
import SetAuthToken from "./utils/SetAuthToken";
// Component
function App() {
  useEffect(() => {
    window.addEventListener(
      "orientationchange",
      function () {
        // if (window.screen.orientation.angle !== 0) {
        //   alert("This App Not support to landscape mode");
        // }
        let mql = window.matchMedia("(orientation: portrait)");
        if (mql.matches) {
          alert(
            "Pour une meilleure expérieur utilisateur, nous vous conseillons de pivoter votre appareil pour être en mode Portrait."
          );
        }
      },
      false
    );
  }, []);
  if (localStorage.token) {
    SetAuthToken(localStorage.token);
  }
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Structured data for Orientator",
    description:
      "Commençons le test d'orientation! À la fin de ce questionnaire, une proposition de voeux pour Parcoursup te sera formulée!",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/JSON-LD.svg",
    datePublished: new Date("2021-09-04T09:25:01.340Z").toISOString(),
    author: {
      "@type": "Orientator",
      name: "Orientator",
      url: "https://orientator.com",
    },
  };
  return (
    <div className={`App `}>
      <script type="application/ld+json">
        {JSON.stringify(articleStructuredData)}
      </script>
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
        <meta property="og:title" content="__OG_TITLE__" />
        <meta property="og:description" content="__OG_DESCRIPTION__" />
        <meta property="og:url" content="__OG_URL__" />
        <meta property="og:image" content="__OG_IMAGE__" />
      </Helmet>
      {/* tostify Container for Notification */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        transition={Flip}
        limit={2}
      />
      {/* Routes */}
      <Index />
    </div>
  );
}
// Export
export default App;
