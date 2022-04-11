import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Store, UpdateStore } from "../StoreContext";
import TypeOfCourse from "../components/TypeOfCourse";
import api from "../api";

const Result = () => {
  let typeOfCourses = ["BTS", "BUT", "CPGE", "Ecole Post-Bac", "Licence"];
  const updateStore = UpdateStore();
  const { singleUserResult } = Store();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(true);
  //   Single Result of User
  useEffect(() => {
    getUserResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let getUserResult = async () => {
    setLoading(true);
    let res = await api("get", `/admin/results/single-result/${id}`);
    if (res) {
      updateStore({ singleUserResult: res?.data?.result });
      setLoading(false);
    }
  };
  // get courses arrays base on there types
  const getSingleTypeofCourse = (type) => {
    return singleUserResult?.courses.filter(
      (course) => type === course?.courseId?.type_of_course
    );
  };
  return (
    <div
      style={{
        height: "100vh",
        background:
          "radial-gradient(97.47% 66.83% at 50% 50%,#35384e 0%,#000000 100%)",
      }}
    >
      <div
        style={{
          paddingTop: "5%",
          marginLeft: "275px",
          width: "80%",
          textAlign: "center",
          color: "white",
        }}
      >
        <h2>Domain:{singleUserResult?.domain}</h2>
        <h3>Job-Exapmle:{singleUserResult?.example_of_job}</h3>
      </div>
      <div style={{}}>
        {!loading ? (
          <div style={{ padding: "5px", marginLeft: "10%" }}>
            {singleUserResult?.courses &&
            singleUserResult?.courses.length >= 1 ? (
              <div className="">
                {typeOfCourses.map((type) => (
                  <>
                    {getSingleTypeofCourse(type)[0]?.courseId?.type_of_course ==
                      type && (
                      <TypeOfCourse
                        type={type}
                        flag={flag}
                        setFlag={setFlag}
                        percentage={getSingleTypeofCourse(type)[0]?.percentage}
                        courses={getSingleTypeofCourse(type)}
                      />
                    )}
                  </>
                ))}
              </div>
            ) : (
              <div className="cardflex" style={{ color: "white" }}>
                {" "}
                <h1>aucun cours disponible</h1>
              </div>
            )}
          </div>
        ) : (
          <div className="cardflex" style={{ color: "white" }}>
            {" "}
            <h1>Chargement...</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
