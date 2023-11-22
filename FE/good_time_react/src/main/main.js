import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const generateTimeOptions = () => {
    const timeOptions = [];
    for (let hour = 0; hour <= 24; hour++) {
      const time = moment().set({ hour, minute: 0 });
      timeOptions.push(time.format("HH:mm"));
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
    if (!title || !selectedDate || !startTime || !endTime || !numberOfPeople) {
      setAlertMessage("모든 필수 항목을 선택해주세요.");
      return;
    }

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
      startTime: parseInt(startTime),
      endTime: parseInt(endTime),
      numberOfPeople,
      title,
    };

    console.log("전송 데이터:", reservationData);

    axios
      .post("/v1/room", reservationData)
      .then((response) => {
        console.log("백엔드 응답:", response.data);
        if (response.data.success) {
          const roomId = response.data.roomId;
          navigate(`/loginPage/${roomId}`);
        }
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
