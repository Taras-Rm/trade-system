import React from "react";
import "./Title.scss";
import Img from "../../static/images/title.png";
import TitleCard from "../../components/TitleCard/TitleCard";

function Title() {
  return (
    <div className="titlePage">
      <div className="titlePage_leftPart">
        <TitleCard
          title="Trade System"
          text="
          Use the system to sell and buy goods. Analyze your sales and purchases, draw conclusions and move forward."
          img={Img}
        />
      </div>
      
    </div>
  );
}

export default Title;
