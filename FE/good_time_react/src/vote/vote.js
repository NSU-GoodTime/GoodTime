import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import moment from "moment";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
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

const VoteTable = ({ roomId }) => {
  const { userId } = useParams();
  console.log("userId:", userId);
  const navigate = useNavigate();
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

        console.log("시작 시간:", startTime);
        console.log("종료 시간:", endTime);
        console.log("생성된 테이블 데이터:", newData);
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

  // 제출 버튼 클릭 시
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
            uEndTime: moment(currentSlot.endTime, "HH:mm").format("HH:mm"),
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
        // 제출 후 알림창 표시
        showConfirmationAlert();
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  };

  // 결과보기 버튼 클릭 시
  const handleResultView = () => {
    // 결과보기 클릭 후 알림창 표시 및 추천시간 페이지로 이동
    showConfirmationAlert("/v1/recommendationPage");
  };

  const showConfirmationAlert = (redirectPath) => {
    confirmAlert({
      title: "투표 종료",
      message: "투표를 종료하고 추천 시간을 받아보시겠습니까?",
      buttons: [
        {
          label: "예",
          onClick: () => {
            if (redirectPath) {
              navigate(redirectPath);
            }
          },
        },
        {
          label: "아니요",
          onClick: () => {
            // "아니요"를 선택하면 로그인 페이지로 이동(전체 투표 현황 확인)
            navigate("/loginPage");
          },
        },
      ],
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h2>
          투표 테이블 ({startTime} ~ {endTime})
        </h2>
        <button onClick={handleSubmit}>제출</button>
        <button onClick={handleResultView}>결과보기</button>
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
