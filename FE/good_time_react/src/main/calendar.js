import React from "react";
import moment from "moment";
import "moment/locale/ko";
import "../css/calendar.css";

const Calendar = ({ selectedDate, onDateChange }) => {
  const renderCalendar = () => {
    const daysInMonth = selectedDate.daysInMonth();
    const firstDayOfMonth = moment(selectedDate).startOf("month");
    const startOfWeek = firstDayOfMonth.day(); // 해당 주 시작 위치
    const days = [];

    // 이전 달
    for (let i = 0; i < startOfWeek; i++) {
      const prevMonthDate = firstDayOfMonth
        .clone()
        .subtract(startOfWeek - i, "day");
      days.push(renderCalendarDay(prevMonthDate, "empty-day"));
    }

    // 현재 달
    for (let i = 1; i <= daysInMonth; i++) {
      const date = moment(selectedDate).date(i);
      const isSelected = date.isSame(selectedDate, "day");
      const isWeekend = date.day() === 0 || date.day() === 6;

      days.push(
        renderCalendarDay(
          date,
          `calendar-day ${isSelected ? "selected" : ""} ${
            isWeekend ? "weekend" : ""
          }`
        )
      );
    }

    // 다음 달
    const remainingDays = (7 - ((startOfWeek + daysInMonth) % 7)) % 7; // 남은 일수 계산
    for (let i = 0; i < remainingDays; i++) {
      const nextMonthDate = firstDayOfMonth
        .clone()
        .add(1, "month")
        .date(i + 1);
      days.push(renderCalendarDay(nextMonthDate, "empty-day"));
    }

    return days;
  };

  const renderCalendarDay = (date, className) => (
    <div
      key={date.format("YYYYMMDD")}
      className={className}
      onClick={() => onDateChange(date)}
    >
      {date.date()}
    </div>
  );

  const handleMonthChange = (modifier) => {
    onDateChange(selectedDate.clone().add(modifier, "month"));
  };

  return (
    <div className='calendar'>
      <div className='calendar-header'>
        <button onClick={() => handleMonthChange(-1)}>이전 달</button>
        <h2>{selectedDate.format("MMMM YYYY")}</h2>
        <button onClick={() => handleMonthChange(1)}>다음 달</button>
      </div>
      <div className='calendar-body'>
        <div className='weekdays'>
          {moment.weekdaysShort().map((day) => (
            <div key={day} className='weekday'>
              {day}
            </div>
          ))}
        </div>
        <div className='days'>{renderCalendar()}</div>
      </div>
    </div>
  );
};

export default Calendar;
