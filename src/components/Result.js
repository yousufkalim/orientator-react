import React, { useState, useEffect } from "react";
import { Store, UpdateStore } from "../StoreContext";
import api from "../api";
import Grid from "@material-ui/core/Grid";
import MainCharacter from "../assets/img/MainCharacter.png";
import CircularProgress from "@material-ui/core/CircularProgress";
import TypeOfCourse from "./TypeOfCourse";
import userimg from "../assets/icons/user.png";
import share from "../assets/icons/share.png";
import InvitePopup from "./InvitePopup";
import SharePopup from "./Sharepopup";
import jsPDF from "jspdf";
import * as html2canvas from "html2canvas";
import logo from "../assets/img/logo1.png";
const Result = () => {
  // init
  const updateStore = UpdateStore();
  const {
    history,
    user,
    disc_ans_id,
    result,
    mainresultPage,
    screenshoots,
    allTypes,
  } = Store();
  const [loading, setLoading] = useState(false);
  const [resultStep, setresultStep] = useState(0);
  const [exportLoading, setExportLoading] = useState(false);
  const [screenshootloading, setScreenshootloading] = useState(false);

  const [open, setOpen] = useState(false);
  const [flagforpopup, setFlagforpopup] = useState(false);
  const [openinvitepopup, setOpenInvitepopup] = useState(false);
  const [opensharepopup, setOpenSharepopup] = useState(false);
  useEffect(() => {
    if (resultStep == 1) {
      setFlagforpopup(true);
      setTimeout(() => {
        !flagforpopup && setOpen(true);
      }, 30000);
    }
    if (resultStep == 0) {
      getResult();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultStep]);
  // get Result from api
  let getResult = async () => {
    setLoading(true);
    // let lastAnswerId = history?.find((his) => his.next_question === null);
    let lastAnswerId = history?.find(
      (his) => his.next_question == "61111167760c9840b8d2c9d2"
    );
    const userData = {
      disc_answers: disc_ans_id,
      user_id: user?._id,
      last_answer: lastAnswerId?._id,
    };

    let res = await api("post", "/results", userData);
    if (res) {
      updateStore({ result: res?.data?.result });
    }
    setLoading(false);
  };
  // get courses arrays base on there type
  const getSingleTypeofCourse = (type) => {
    let b = result.courses.filter(
      (course) => type === course?.courseId?.type_of_course
    );
    return b;
  };
  const showResultDetail = () => {
    setScreenshootloading(true);
    setTimeout(() => {
      onButtonClick();
      // setScreenshootloading(false);
      setresultStep(1);
    }, 500);
  };

  const onButtonClick = async () => {
    let domElement = document.getElementById("resultBox");

    html2canvas(domElement, {
      ignoreElements: function (element) {
        if ("resultButtondiv" === element.id) {
          return true;
        }
      },
      backgroundColor: "#282b38",
    }).then((canvas) => {
      updateStore({ mainresultPage: canvas });
      setScreenshootloading(false);
      // document.body.appendChild(canvas);
    });
  };

  const exportPdf = async () => {
    setExportLoading(true);
    setTimeout(() => {
      var pdf = new jsPDF();
      pdf.setFillColor(40, 43, 56);
      pdf.rect(0, 0, 350, 350, "F");
      pdf.addImage(logo, "PNG", 65, 15, 80, 15);
      pdf.addImage(MainCharacter, "PNG", 40, 38, 125, 130);
      if (mainresultPage) {
        pdf.addImage(mainresultPage, "PNG", 30, 165, 150, 100);
      }
      allTypes?.map((type) => {
        pdf.addPage();
        // backgroung Color
        pdf.setFillColor(40, 43, 56);
        pdf.rect(0, 0, 350, 350, "F");
        // for specific width height
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();
        pdf.addImage(type?.canvas, "PNG", 0, 0, width, height);
        // for desktop
        // pdf.addImage(licenceResult, "PNG", 0, 0, 210, 300);
        // for ten result
        // pdf.addImage(btsResult, "PNG", 0, 0, 210, 300);
      });

      pdf.save("Ma liste Orientator.pdf");
      setExportLoading(false);
      // document.body.appendChild(canvas);
    }, 500);
  };

  return (
    <>
      {resultStep == 0 && (
        <Grid container spacing={2} className="mainresultscreen">
          <Grid item xs={12} sm={12} md={5} className="">
            <img
              src={MainCharacter}
              className="facialImgQuestionforResult"
              alt="maincharacter"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={7} className="">
            <div
              className={`resultBox ${screenshootloading ? "lessopacity" : ""}`}
              id="resultBox"
            >
              <div className="resultBoxText">
                <h1 className="resultHeading" style={{ textAlign: "center" }}>
                  Bravo! Tu as répondu à toutes les questions!
                </h1>
                {/* <button onClick={onButtonClick}>Download PDF</button> */}
                {loading ? (
                  <p className="resultText">
                    <CircularProgress color="inherit" />
                  </p>
                ) : (
                  <p className="resultText">
                    <span style={{ color: "#9198A5" }}>
                      {" "}
                      D'après tes réponses, je pense que ton profil est tourné
                      vers
                    </span>
                    <br />
                    <b>
                      {" "}
                      <span
                        style={{
                          color: "white",
                          fontWeight: "900",
                          wordBreak: "break-word",
                        }}
                      >
                        {loading ? (
                          <div>
                            <CircularProgress color="inherit" />
                          </div>
                        ) : result?.type_of_job ? (
                          result.type_of_job
                        ) : (
                          "Il n’y a actuellement pas de job disponible."
                        )}{" "}
                      </span>
                    </b>{" "}
                    <span style={{ color: "#9198A5" }}>comme par exemple</span>{" "}
                    <span
                      style={{
                        color: "white",
                        fontWeight: "900",
                        wordBreak: "break-word",
                      }}
                    >
                      {" "}
                      {loading
                        ? "loading"
                        : result?.example_of_job
                        ? result.example_of_job
                        : "Currently no example available"}
                    </span>
                  </p>
                )}
                {!loading && (
                  <p className="resultText">
                    <span style={{ color: "#9198A5" }}>
                      Je te propose une liste de voeux Parcoursup qui
                      correspondrait à ton profil.
                    </span>
                  </p>
                )}
              </div>

              <div className="resultButtondiv" id="resultButtondiv">
                <button
                  className="resultButton"
                  onClick={() => showResultDetail()}
                  style={{ opacity: loading ? 0.4 : 1 }}
                  disabled={loading}
                >
                  <b>
                    {" "}
                    {screenshootloading
                      ? "veuillez patienter"
                      : "Ma liste Parcoursup"}
                  </b>
                </button>
              </div>
            </div>
            <div></div>
          </Grid>
        </Grid>
      )}
      {resultStep == 1 && (
        <>
          <InvitePopup open={openinvitepopup} setOpen={setOpenInvitepopup} />
          <SharePopup open={opensharepopup} setOpen={setOpenSharepopup} />
          <Grid
            container
            spacing={1}
            className={`mainresultscreen ${exportLoading ? "lessopacity" : ""}`}
          >
            <Grid item xs={12} sm={12} className="">
              <div>
                {!loading ? (
                  <div>
                    {result.data ? (
                      <div>
                        {result?.data?.map((item, index) => (
                          <>
                            {item.courses ? (
                              <TypeOfCourse
                                type={item?.type}
                                result={result?.data}
                                percentage={item?.percentage}
                                courses={item?.courses}
                                user={user}
                              />
                            ) : (
                              <div
                                className=""
                                style={{ margin: "10px", textAlign: "center" }}
                              >
                                <h1> Désolé pas de cours disponible</h1>
                              </div>
                            )}
                          </>
                        ))}
                        <div
                          style={{
                            width: "70%",
                            textAlign: "center",
                            margin: "auto",
                            color: "grey",
                          }}
                          // className="desktopView"
                        >
                          <p>
                            Tu ne trouves pas ce que tu t’attendais à voir dans
                            cette liste? Pas de panique! C’est sûrement que la
                            formation à laquelle tu penses n’est pas sur
                            Parcousup. Tu seras contacté par la suite pour
                            compléter cette liste avec d’autres fomations
                            “hors-parcoursup” qui pourraient te correspondre!
                          </p>
                        </div>
                        <div className="desktopView goback">
                          <button
                            className="goBackbutton"
                            onClick={exportPdf}
                            disabled={exportLoading}
                          >
                            {exportLoading
                              ? "Veuillez patienter"
                              : "Exporter le PDF"}
                          </button>
                        </div>
                        <div
                          style={{
                            width: "70%",
                            textAlign: "center",
                            margin: "auto",
                            color: "grey",
                          }}
                          className="mobileView"
                        >
                          <p>
                            N'hésite pas à prendre des captures d'écran de cette
                            page. Tu peux aussi te connecter à ton ordinateur
                            pour obtenir cette liste au format PDF.
                          </p>
                        </div>

                        <div className="buttonDiv">
                          <button
                            className="sharebutton"
                            onClick={() => setOpenInvitepopup(true)}
                          >
                            <img src={userimg} alt="userImage" />
                            <b className="invitetext">Invite un ami</b>
                          </button>
                          <button
                            className=" partager"
                            onClick={() => setOpenSharepopup(true)}
                          >
                            <img src={share} alt="share" />
                            <b className="partagertext"> Partager </b>
                          </button>
                        </div>
                        <div className="goback">
                          <button
                            className="goBackbutton"
                            onClick={() => setresultStep(0)}
                          >
                            <b className="">Précédent</b>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className=""
                        style={{ margin: "10px", textAlign: "center" }}
                      >
                        <h1> Désolé pas de cours disponible</h1>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className=""
                    style={{ margin: "10%", textAlign: "center" }}
                  >
                    <h1>Chargement en cours...</h1>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Result;
