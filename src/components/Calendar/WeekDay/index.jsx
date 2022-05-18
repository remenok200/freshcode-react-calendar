import { format } from "date-fns";
import React from "react";
import styles from "./WeekDay.module.scss";

const WeekDay = (props) => {
  return (
    <div className={styles.leftBlock}>
      <p className={styles.weekDay}>
        {format(props.currentDate, "EEEE").toUpperCase()}
      </p>
      <p className={styles.weekDayNumber}>{format(props.currentDate, "d")}</p>
    </div>
  );
};

export default WeekDay;
