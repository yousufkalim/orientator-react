import React, { useState, useEffect } from "react";
import { Store, UpdateStore } from "../StoreContext";
import Table from "../components/dashboard/Table";
import api from "../api";

const Results = () => {
  const updateStore = UpdateStore();
  const { results } = Store();
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [loading, setLoading] = useState(false);

  //  All Results of All Users Table Headings
  const Heading = [
    { id: "user", label: "User", minWidth: 170 },

    {
      id: "domain",
      label: "Domain ",
      minWidth: 170,
      align: "right",
    },
    {
      id: "example_of_job",
      label: "Example of Job",
      minWidth: 170,
      align: "right",
    },
    // {
    //   id: "last_answer",
    //   label: "Last Answer",
    //   minWidth: 170,
    //   align: "right",
    // },
  ];

  // Get All Results of All Users
  useEffect(() => {
    getAllResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  let getAllResults = async () => {
    setLoading(true);
    let res = await api(
      "get",
      `admin/results/get-results?pageNumber=${page}&pageSize=${rowsPerPage}`
    );

    if (res) {
      updateStore({ results: res?.data?.results });
      setCount(res?.data?.totalResults);
      setLoading(false);
    }
  };
  return (
    <>
      <Table
        Heading={Heading}
        Users={results}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        count={count}
        loading={loading}
      />
    </>
  );
};

export default Results;
