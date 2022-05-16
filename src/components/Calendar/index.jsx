import React, { Component } from "react";
import classNames from "classnames";
import styles from "./Calendar.module.css";
import {
  format,
  getDay,
  addDays,
  getDaysInMonth,
  addMonths,
  subMonths,
  startOfWeek,
  startOfMonth,
  isBefore,
  isEqual,
  isSaturday,
  nextSaturday,
  isSameDay,
} from "date-fns";

class Calendar extends Component {
  state = {
    currentDate: new Date(),
    selectedDate: new Date(),
  };

  addMonth = () => {
    this.setState({ currentDate: addMonths(this.state.currentDate, 1) });
  };
  subMonth = () => {
    this.setState({ currentDate: subMonths(this.state.currentDate, 1) });
  };
  changeDate = (date) => {
    this.setState({
      currentDate: new Date(date),
      selectedDate: new Date(date),
    });
  };

  fillDates = (DayOfTheWeekNumber) => {
    const { currentDate, selectedDate } = this.state;
    let tempDate = new Date(startOfMonth(currentDate));
    const tempArr = [];

    for (let i = 0; i < getDaysInMonth(currentDate); i++) {
      const tempChangeDate = tempDate;
      if (getDay(tempDate) === DayOfTheWeekNumber) {
        tempArr.push(
          <tr key={i} onClick={() => this.changeDate(tempChangeDate)}>
            <span
              className={classNames(styles.day, {
                [styles.selectedDay]: isSameDay(tempDate, selectedDate),
              })}
            >
              {Number(format(tempDate, "d"))}
            </span>
          </tr>
        );
      }
      tempDate = new Date(addDays(tempDate, 1));
    }

    // для дальнейшего вертикального выравнивания столбца
    let saturday = new Date();
    tempDate = new Date(startOfMonth(currentDate));
    if (isSaturday(tempDate)) {
      saturday = tempDate;
    } else {
      saturday = nextSaturday(tempDate);
    }
    let firstDayOfColumn = Number(tempArr[0].key);
    firstDayOfColumn = new Date(
      addDays(startOfMonth(currentDate), firstDayOfColumn)
    );

    return (
      <td
        style={
          isBefore(firstDayOfColumn, saturday) ||
          isEqual(firstDayOfColumn, saturday)
            ? { verticalAlign: "top" }
            : { verticalAlign: "bottom" }
        }
      >
        {tempArr}
      </td>
    );
  };

  render() {
    const { currentDate } = this.state;
    return (
      <>
        <p>{format(currentDate, "EEEE d").toUpperCase()}</p>
        <button onClick={this.subMonth}>sub month</button>
        <button onClick={this.addMonth}>add month</button>
        <p>{format(currentDate, "LLLL Y").toUpperCase()}</p>
        <table>
          <thead>
            {new Array(7).fill(null).map((item, index) => (
              <td key={index}>
                {format(addDays(startOfWeek(currentDate), index), "EEEEE")}
              </td>
            ))}
          </thead>
          <tbody>
            {new Array(7)
              .fill(null)
              .map((item, index) => this.fillDates(index))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Calendar;
