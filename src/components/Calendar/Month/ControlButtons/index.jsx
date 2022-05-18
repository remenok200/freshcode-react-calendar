import { addMonths, startOfMonth, subMonths } from "date-fns";
import styles from "./ControlButtons.module.scss";
import React from "react";

const ControlButtons = (props) => {
  const addMonth = () => {
    props.updateCurrentDate({
      currentDate: new Date(startOfMonth(addMonths(props.currentDate, 1))),
    });
    props.updateSelectedDate({
      selectedDate: new Date(
        startOfMonth(addMonths(props.currentDate, 1))
      ),
    });
  };
  const subMonth = () => {
    props.updateCurrentDate({
      currentDate: new Date(startOfMonth(subMonths(props.currentDate, 1))),
    });
    props.updateSelectedDate({
      selectedDate: new Date(
        startOfMonth(subMonths(props.currentDate, 1))
      ),
    });
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.controlButtons} onClick={subMonth}>
        ←
      </button>
      <button className={styles.controlButtons} onClick={addMonth}>
        →
      </button>
    </div>
  );
};

export default ControlButtons;
