import React, { useState } from "react";
import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { loginUser } from "./yourReduxActions";
// import { useHistory } from "react-router-dom";

const LoginPage = () => {
  // const dispatch = useDispatch();
  // const history = useHistory();
  const [uid, setuid] = useState("");
  const [pw, setPw] = useState("");
  // const [roomId, setRoomId] = useState("null"); // 초기에는 null 또는 기본값으로 설정
  const location = useLocation();

  console.log(location);

  const onIdHandler = (event) => {
    setuid(event.currentTarget.value);
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

    // try {
    //   const result = await axios.post("/{roomId}/login", { uid, pw }); //url 수정
    //   console.log("Login result:", result.data.data);

    // 로그인 성공 시 추가 작업 수행
    // const { accessToken, refreshToken } = result.data.data; //서버로 받은 토큰 추출
    // localStorage.setItem('access', accessToken); //엑세스 토큰 로컬 스톨지에 저장하는 기능
    // localStorage.setItem('refresh', refreshToken); //똑같이 저장
    // dispatch(loginUser(body));
    // history.push('/dashboard'); // 이후 페이지로 넘어가게 설정
    // } catch (error) {
    //   console.error("Login error:", error);
    //   alert("로그인에 실패했습니다.");
    // }
  };
  // useEffect(() => {
  //   // 백엔드에서 방 번호를 받아오는 API 호출
  //   axios
  //     .get("v1/") // URL수정
  //     .then((response) => {
  //       const receivedRoomId = response.data.roomId;
  //       setRoomId(receivedRoomId);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to fetch roomId:", error);
  //       // 실패 시 처리
  //     });
  // }, []);

  //링크 복사
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
        justifyContent: "center",
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
        <input type="text" value={uid} onChange={onIdHandler} />
        <label>Password</label>
        <input type="password" value={pw} onChange={onPasswordHandler} />
        <br />
        <button type="submit">Login</button>
        <br />
      </form>
      <button
        style={{
          display: "flex",
          flexDirection: "column",
          margin: " 0px 0px 50px 30px",
        }}
        onClick={() => handleCopyClipBoard("복사된 텍스트")}
      >
        링크 공유하기
      </button>
    </div>
  );
};

export default LoginPage;
