import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/overall.css";

function Overallvote() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/loginPage");
  };
  return (
    <div className="home">
      <form className="subHome">
        <h1 className="F_right">표 보여줄 곳</h1>
        <br />
        <div className="F_left">
          <button formAction="" className="bb">
            최적의 시간 보기
          </button>
          <br />
          <button formAction="" className="nn" onClick={navigateToLogin}>
            수정하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default Overallvote;
