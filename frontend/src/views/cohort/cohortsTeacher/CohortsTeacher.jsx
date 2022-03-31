import React from "react";
import { CardCohort } from "../../../components/cards/cohort/CardCohort";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import apiAgora from "../../../api";

import styles from "./CohortsTeacher.module.css";
export function CohortsTeacher() {
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;

  const [cohortsTeacher, setCohortsTeacher] = useState([]);

  const fetchCohortsTeacher = async (id) => {
    const res = await apiAgora.get(
      `/api/agora/get-cohorts-teacher/${id}`,
      {
        headers: { Authorization: id},
      }
    );
    setCohortsTeacher(res.data);
  };
  useEffect(() => {
    fetchCohortsTeacher(id_user );
  }, [id_user ]);
  return (
    <div className={styles.cohorts}>
      <div className={styles.wrapper}>
        <h2 className={styles.typing_demo}>Cohortes Asignadas</h2>
      </div>
      <div>
        {cohortsTeacher.map((cohort, index) => (
          <CardCohort
            info={cohort}
            key={index}
            principal={false}
            teacher={true}
          />
        ))}
      </div>
    </div>
  );
}
