import React, { Component } from "react";
import styles from "./Calendar.module.scss";
import Month from "./Month";
import WeekDay from "./WeekDay";

class Calendar extends Component {
  state = {
    currentDate: new Date(),
    selectedDate: new Date(),
  };

  updateCurrentDate = ({ currentDate }) => {
    this.setState({ currentDate });
  };

  updateSelectedDate = ({ selectedDate }) => {
    this.setState({ selectedDate });
  };

  render() {
    const { currentDate, selectedDate } = this.state;
    return (
      <>
        <div className={styles.mainWrapper}>
          <WeekDay currentDate={currentDate} />

          <Month
            currentDate={currentDate}
            selectedDate={selectedDate}
            updateCurrentDate={this.updateCurrentDate}
            updateSelectedDate={this.updateSelectedDate}
          />
        </div>
      </>
    );
  }
}

export default Calendar;
