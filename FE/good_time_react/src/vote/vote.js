import React, { useState, useEffect, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import moment from "moment";
import axios from "axios";
import "../css/vote.css";

const DraggableCell = ({ timeSlot, onDrop, onClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CELL",
    item: { time: timeSlot.time },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "CELL",
    drop: (draggedItem) => {
      onDrop(draggedItem.time, timeSlot.time);
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`time-slot ${timeSlot.selected ? "selected" : ""} ${
        isDragging ? "dragging" : ""
      }`}
      draggable
      onClick={onClick}
    >
      {timeSlot.time}
    </div>
  );
};

const VoteTable = ({ roomId, userId }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [tableData, setTableData] = useState([]);

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

        console.log(newData);
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  }, [roomId]);

  // 시작 시간과 종료 시간으로 테이블 데이터 생성
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
        selected: false,
      };

      timeData.push(timeSlot);
      currentTime.add(intervalHours, "hours");
    }

    return timeData;
  };

  // 드롭 이벤트
  const handleDrop = useCallback((start, end) => {
    setTableData((prevTableData) => {
      const updatedTableData = prevTableData.map((timeSlot) => {
        if (timeSlot.time >= start && timeSlot.time <= end) {
          return { ...timeSlot, selected: !timeSlot.selected };
        }
        return timeSlot;
      });
      return updatedTableData;
    });
  }, []);

  // 시간 슬롯 클릭 처리
  const handleCellClick = (time) => {
    setTableData((prevTableData) => {
      const updatedTableData = prevTableData.map((timeSlot) => {
        if (timeSlot.time === time) {
          return { ...timeSlot, selected: !timeSlot.selected };
        }
        return timeSlot;
      });
      return updatedTableData;
    });
  };

  const handleSubmit = () => {
    const selectedSlots = [];
    let currentSlot = null;

    tableData.forEach((timeSlot) => {
      if (timeSlot.selected) {
        if (!currentSlot) {
          // 선택된 첫 번째 시간대
          currentSlot = { startTime: timeSlot.time };
        }
      } else {
        if (currentSlot) {
          // 선택이 해제된 경우 현재까지의 시간대를 추가
          currentSlot.endTime = timeSlot.time;
          selectedSlots.push({
            uStartTime: currentSlot.startTime,
            uEndTime: moment(currentSlot.endTime, "HH:mm")
              .add(1, "hours")
              .format("HH:mm"),
          });
          currentSlot = null;
        }
      }
    });

    // 마지막 시간대가 선택된 경우 처리
    if (currentSlot) {
      currentSlot.endTime = tableData[tableData.length - 1].time;
      selectedSlots.push({
        uStartTime: currentSlot.startTime,
        uEndTime: moment(currentSlot.endTime, "HH:mm").format("HH:mm"),
      });
    }

    console.log("선택한 시간대:", selectedSlots);

    // 선택한 시간대 서버로 전송
    axios
      .post(`/v1/utime/${userId}`, selectedSlots)
      .then((response) => {
        console.log("선택한 시간대 서버 응답:", response.data);
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h2>
          투표 테이블 ({startTime} ~ {endTime})
        </h2>
        <button onClick={handleSubmit}>제출</button>
        <div className='vote-table'>
          {tableData.map((timeSlot) => (
            <DraggableCell
              key={timeSlot.time}
              timeSlot={timeSlot}
              onDrop={handleDrop}
              onClick={() => handleCellClick(timeSlot.time)}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default VoteTable;
