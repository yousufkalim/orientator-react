import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DetailofCourses from "../components/DetailofCourses";
import { Store, UpdateStore, TypeUpdate } from "../StoreContext";
import search from "../assets/icons/search.png";
import showhide from "../assets/icons/showhide.png";
import hide from "../assets/icons/hide.png";
import * as html2canvas from "html2canvas";

const TypeOfCourse = ({ type, percentage, courses, result, user }) => {
  const updateStore = UpdateStore();
  const typeUpdate = TypeUpdate();
  const { screenshoots, results } = Store();

  const [showDetail, setShowDetail] = useState(true);

  useEffect(() => {
    getresultpageforPdf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getresultpageforPdf = () => {
    let domElement = document.getElementById(type);
    html2canvas(domElement, {
      // ignoreElements: function (element) {
      //   if ("resultButtondiv" === element.id) {
      //     return true;
      //   }
      // },
      // width: 1300,
      // height: 1750,
      backgroundColor: "#282b38",
    }).then((canvas) => {
      typeUpdate({ canvas, type });
      setShowDetail(false);
    });
  };

  const [open, setOpen] = useState(false);
  const getPercentageColor = (percentage) => {
    if (percentage >= 41) {
      // green
      return "linear-gradient(180deg, #84FF70 -54%, #2DA070 100%)";
    } else if (percentage >= 24 && percentage <= 40) {
      // light green
      return "linear-gradient(rgb(40 255 106) 0%, rgb(31 223 212) 100%)";
    } else if (percentage >= 8 && percentage <= 23) {
      // yellow
      return "linear-gradient(90deg, rgba(240,244,99,1) 0%, rgba(247,232,106,1) 50%, rgba(232,236,100,1) 100%)";
    } else if (percentage >= 3 && percentage <= 7) {
      // orange
      return "linear-gradient(90deg, rgba(246,185,8,1) 0%, rgba(242,182,7,1) 50%, rgba(237,174,5,1) 100%)";
    } else {
      // red
      return "linear-gradient(90deg, rgba(246,161,8,1) 0%, rgba(242,162,7,1) 50%, rgba(237,162,5,1) 100%)";
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="typeOfCourses" id={type}>
        <Grid
          container
          spacing={3}
          style={{ cursor: "pointer" }}
          className="coursediv"
          onClick={() => {
            setShowDetail(!showDetail);
          }}
        >
          <Grid item xs={4} sm={8} className="courseType">
            {" "}
            {type}
          </Grid>
          <Grid
            item
            xs={5}
            sm={3}
            style={{ background: `${getPercentageColor(percentage)}` }}
            className="percentageGrid"
          >
            <img src={search} className="searchimg" />
            <b style={{ marginTop: "5px" }}>Compatible à {percentage}%</b>
          </Grid>
          <Grid item xs={1} sm={1} className="showhide">
            {showDetail ? (
              <img src={hide} className="showhideIcon" />
            ) : (
              <img src={showhide} className="showhideIcon" />
            )}{" "}
          </Grid>
        </Grid>
        {showDetail && (
          <DetailofCourses
            courses={courses}
            open={open}
            setOpen={setOpen}
            id="detailofone"
            user={user}
          />
        )}
      </div>
    </>
  );
};

export default TypeOfCourse;
