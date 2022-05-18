import React from "react";
import ControlButtons from "./ControlButtons";
import DatesTable from "./DatesTable";
import styles from "./Month.module.scss";

const Month = (props) => {
  return (
    <div className={styles.backgroundColorGray}>
      <ControlButtons
        currentDate={props.currentDate}
        selectedDate={props.selectedDate}
        updateCurrentDate={props.updateCurrentDate}
        updateSelectedDate={props.updateSelectedDate}
      />
      <DatesTable
        currentDate={props.currentDate}
        selectedDate={props.selectedDate}
        updateCurrentDate={props.updateCurrentDate}
        updateSelectedDate={props.updateSelectedDate}
      />
    </div>
  );
};

export default Month;
