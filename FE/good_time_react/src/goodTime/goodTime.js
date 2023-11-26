import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/times.css";

function GoodTimes() {
  // 시간 목록을 담을 상태 변수 설정
  const [timeList, setTimeList] = useState([]);
  const roomId = localStorage.getItem("roomId");

  useEffect(() => {
    axios
      .get(`/v1/${roomId}/goodTime`)
      .then((response) => {
        // 받은 시간 목록을 정렬하여 상태 업데이트
        const sortedList = response.data.sort((a, b) => a - b);
        setTimeList(sortedList);
      })
      .catch((error) => {
        console.error("추천시간 오류:", error);
        // 에러 처리
      });
  }, [roomId]); // 빈 배열을 전달하여 컴포넌트가 화면에 보여지게 될 때 한 번만 호출하도록 설정

  return (
    <div>
      <div>
        <h1 className='title'>~ Good Times ~</h1>
        <ul className='ul'>
          <div className='list'>
            <h1>
              {/* 시간 목록을 리스트로 출력 */}
              {timeList.map((time, index) => (
                <li className='li' key={index}>
                  {index + 1}. {time}시
                </li>
              ))}
            </h1>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default GoodTimes;
