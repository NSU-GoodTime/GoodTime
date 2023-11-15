import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import Calendar from "../main/calendar";

const Main = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [title, setTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const generateTimeOptions = () => {
    const timeOptions = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const time = moment().set({ hour, minute });
        timeOptions.push(time.format("HH:mm"));
      }
    }
    return timeOptions;
  };

  const handleTimeChange = (field, value) => {
    if (generateTimeOptions().includes(value) || value === "") {
      if (field === "startTime") {
        setStartTime(value);
        setAlertMessage("");
      } else if (field === "endTime") {
        setEndTime(value);
        setAlertMessage("");
      }
    }
  };

  const handleNumberOfPeopleChange = (value) => {
    // 인원 수 0부터 10까지 확인
    const intValue = parseInt(value, 10);
    if (!isNaN(intValue) && intValue >= 0 && intValue <= 10) {
      setNumberOfPeople(intValue.toString());
    }
  };

  const handleTitleChange = (value) => {
    setTitle(value);
  };

  const handleSubmit = () => {
    // 시작 시간 종료 시간 비교
    const startMoment = moment(startTime, "HH:mm");
    const endMoment = moment(endTime, "HH:mm");

    if (startMoment.isAfter(endMoment)) {
      setAlertMessage("종료 시간을 시작 시간보다 늦게 설정해주세요.");
      return;
    }

    // 종료 시간 알림 초기화
    setAlertMessage("");

    const reservationData = {
      date: selectedDate.format("YYYY-MM-DD"),
      startTime,
      endTime,
      numberOfPeople,
      title,
    };

    axios
      .post("", reservationData) // url 수정
      .then((response) => {
        console.log("백엔드 응답:", response.data);
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  };

  return (
    <div>
      {alertMessage && <div style={{ color: "red" }}>{alertMessage}</div>}

      <div>
        <label>방 제목:</label>
        <input
          type='text'
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
      </div>

      <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} />

      <div>
        <label>시작 시간:</label>
        <select
          value={startTime}
          onChange={(e) => handleTimeChange("startTime", e.target.value)}
        >
          {generateTimeOptions().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>

        <label>끝나는 시간:</label>
        <select
          value={endTime}
          onChange={(e) => handleTimeChange("endTime", e.target.value)}
        >
          {generateTimeOptions().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>

        <label>인원 수:</label>
        <input
          type='number'
          value={numberOfPeople}
          onChange={(e) => handleNumberOfPeopleChange(e.target.value)}
          min='0'
          max='10'
        />
      </div>

      <button onClick={handleSubmit}>방 만들기</button>
    </div>
  );
};

export default Main;
