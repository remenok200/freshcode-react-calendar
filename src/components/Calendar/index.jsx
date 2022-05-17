import React, { Component } from "react";
import classNames from "classnames";
import styles from "./Calendar.module.scss";
import {
  format,
  addDays,
  addMonths,
  subMonths,
  startOfWeek,
  startOfMonth,
  isSameDay,
  getWeeksInMonth,
  isSameMonth,
} from "date-fns";

class Calendar extends Component {
  state = {
    currentDate: new Date(),
    selectedDate: new Date(),
  };

  addMonth = () => {
    this.setState({
      currentDate: new Date(startOfMonth(addMonths(this.state.currentDate, 1))),
      selectedDate: new Date(
        startOfMonth(addMonths(this.state.currentDate, 1))
      ),
    });
  };
  subMonth = () => {
    this.setState({
      currentDate: new Date(startOfMonth(subMonths(this.state.currentDate, 1))),
      selectedDate: new Date(
        startOfMonth(subMonths(this.state.currentDate, 1))
      ),
    });
  };
  changeDate = (date) => {
    this.setState({
      currentDate: new Date(date),
      selectedDate: new Date(date),
    });
  };

  fillDates = () => {
    const { currentDate, selectedDate } = this.state;
    let tempDateCurrentWeek = new Date(startOfWeek(startOfMonth(currentDate)));
    const monthDates = [];

    for (
      let i = 0;
      i < getWeeksInMonth(currentDate, { weekStartsOn: 1 });
      i++
    ) {
      const weekDates = [];
      for (let j = 0; j < 7; j++) {
        const tempChangeDate = tempDateCurrentWeek;
        weekDates.push(
          <td
            onClick={
              isSameMonth(currentDate, tempChangeDate) === true
                ? () => this.changeDate(tempChangeDate)
                : null
            }
            className={classNames(styles.day, {
              [styles.dayNotOfThisMonth]:
                isSameMonth(tempDateCurrentWeek, currentDate) === false
                  ? true
                  : false,
              [styles.selectedDay]: isSameDay(
                tempDateCurrentWeek,
                selectedDate
              ),
            })}
            key={j}
          >
            {Number(format(tempDateCurrentWeek, "d"))}
          </td>
        );
        tempDateCurrentWeek = new Date(addDays(tempDateCurrentWeek, 1));
      }
      monthDates.push(<tr key={i}>{weekDates}</tr>);
    }

    return monthDates;
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
            <tr>
              {new Array(7).fill(null).map((item, index) => (
                <th key={index}>
                  {format(addDays(startOfWeek(currentDate), index), "EEEEE")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{this.fillDates()}</tbody>
        </table>
      </>
    );
  }
}

export default Calendar;
