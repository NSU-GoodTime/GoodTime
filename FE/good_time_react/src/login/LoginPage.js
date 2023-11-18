import React, { useState } from "react";
// import { Checklogin } from "./CheckLogin";
// import { CopyToClipboard } from "react-copy-to-clipboard";
function LoginPage() {
  // const dispatch = useDispatch();

  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    // 버튼만 누르면 리로드 되는것을 막아줌
    event.preventDefault();

    console.log("Id", Id);
    console.log("Password", Password);

    //Id,Password를 다 입력해야함
    event.preventDefault();
    if (!Id) {
      return alert("ID를 입력하세요.");
    } else if (!Password) {
      return alert("Password를 입력하세요.");
    }

    // let body = {
    //   id: Id,
    //   password: Password,
    // };
    // dispatch(loginUser(body));
  };

  //==================================
  // const onSubmitHandler = async () => {
  //   const result= await Checklogin(Id, Password);
  //   console.log("Id", Id);
  //   console.log("Password", Password);
  //const {accessToken,refreshToken}=result;
  // localStorage.setItem('access',accessToken);
  // localStorage.setItem('refresh',refreshToken);  로컬에서 저장

  // dispatch(loginUser(body));
  // router('./어디론가 넘어가는 페이지');
  // };

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
        <input type="text" value={Id} onChange={onIdHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button formAction="">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
