import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import OverallVotesTable from "../login/overallVotesTable";

const LoginPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [uid, setUid] = useState("");
  const [pw, setPw] = useState("");

  const onIdHandler = (event) => {
    setUid(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPw(event.currentTarget.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    console.log("Id", uid);
    console.log("Password", pw);

    if (!uid && !pw) {
      return alert("ID와 Password를 모두 입력하세요.");
    } else if (!uid) {
      return alert("ID를 입력하세요.");
    } else if (!pw) {
      return alert("Password를 입력하세요.");
    }

    try {
      const result = await axios.post(`/v1/${roomId}/login`, { uid, pw });
      console.log("로그인 결과:", result.data);

      // 로그인 성공 시 추가 작업 수행
      const { userId } = result.data;
      navigate(`/utime/${userId}`);
    } catch (error) {
      console.error("Login error:", error);
      alert("로그인에 실패했습니다.");
    }
  };

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었어요.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Id</label>
        <input type='text' value={uid} onChange={onIdHandler} />
        <label>Password</label>
        <input type='password' value={pw} onChange={onPasswordHandler} />
        <br />
        <button type='submit'>Login</button>
        <br />
        <button
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          onClick={() => handleCopyClipBoard("복사된 텍스트")}
        >
          링크 공유하기
        </button>
      </form>
      <OverallVotesTable roomId={roomId} />
    </div>
  );
};

export default LoginPage;
