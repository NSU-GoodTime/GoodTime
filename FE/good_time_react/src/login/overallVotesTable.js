import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "../css/vote.css";

const OverallVotesTable = ({ roomId }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [tableData, setTableData] = useState([]);
  const [weightData, setWeightData] = useState({});

  useEffect(() => {
    // 시작 시간 종료 시간 가져오기
    axios
      .get(`/v1/room/${roomId}/goodtime`)
      .then((response) => {
        const { startTime, endTime } = response.data;
        setStartTime(startTime);
        setEndTime(endTime);

        // 테이블 데이터 생성
        const newData = generateTableData(startTime, endTime);
        setTableData(newData);

        console.log("시작 시간:", startTime);
        console.log("종료 시간:", endTime);
        console.log("생성된 테이블 데이터:", newData);
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });

    // 가중치 데이터 가져오기
    axios
      .get(`/v1/${roomId}/utimes`)
      .then((response) => {
        setWeightData(response.data);

        console.log("가중치 데이터:", response.data);
      })
      .catch((error) => {
        console.error("가중치 데이터를 불러오는 중 에러 발생:", error);
      });
  }, [roomId]);

  const generateTableData = (startTime, endTime) => {
    const timeFormat = "HH:mm";
    const startMoment = moment(startTime, timeFormat);
    const endMoment = moment(endTime, timeFormat);
    const intervalHours = 1;
    const currentTime = moment(startMoment);
    const timeData = [];

    // 각 시간 슬롯에 대한 초기 데이터 생성
    while (currentTime.isSameOrBefore(endMoment)) {
      const timeSlot = {
        time: currentTime.format(timeFormat),
        attendee: "",
      };

      timeData.push(timeSlot);
      currentTime.add(intervalHours, "hours");
    }

    return timeData;
  };

  return (
    <div>
      <h2>
        전체 투표 현황 테이블 ({startTime} ~ {endTime})
      </h2>
      <div className='vote-table'>
        {tableData.map((timeSlot) => (
          <div
            key={timeSlot.time}
            className='time-slot'
            style={{
              backgroundColor: `rgba(0, 0, 255, ${
                weightData[timeSlot.time] || 0
              })`,
            }}
          >
            {timeSlot.time}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverallVotesTable;
