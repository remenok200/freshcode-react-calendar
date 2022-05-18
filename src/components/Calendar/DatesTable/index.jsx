import React, { Component } from "react";
import {
  addDays,
  format,
  getWeeksInMonth,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import styles from "./DatesTable.module.scss";
import classNames from "classnames";

class DatesTable extends Component {
  changeDate = (date) => {
    this.props.updateCurrentDate({ currentDate: new Date(date) });
    this.props.updateSelectedDate({ selectedDate: new Date(date) });
  };

  createLetters = () => {
    const letters = [];

    letters.push(
      new Array(7).fill(null).map((item, index) => (
        <th className={styles.weekLetters} key={index}>
          {format(addDays(startOfWeek(this.props.currentDate), index), "EEEEE")}
        </th>
      ))
    );

    return <tr>{letters}</tr>;
  };

  fillDates = () => {
    const { currentDate, selectedDate } = this.props;
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
    return (
      <div className={styles.wrapper}>
        <table>
          <caption className={styles.currentMonth}>
            {format(this.props.currentDate, "LLLL Y").toUpperCase()}
          </caption>
          <thead>{this.createLetters()}</thead>
          <tbody>{this.fillDates()}</tbody>
        </table>
      </div>
    );
  }
}

export default DatesTable;
