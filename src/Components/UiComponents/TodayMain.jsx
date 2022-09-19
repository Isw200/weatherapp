import React from "react";
import { UilMapMarker, UilCalender } from "@iconscout/react-unicons";
import "../../Styles/TodayMain.css";
import "react-clock/dist/Clock.css";
import "../../App.css";

const TodayMain = (props) => {
  let cloud_icon_url = `Images/weather_icons/${props.cloud_icon}.png`;

  //convert weather_description to Title Case
  const text = props.weather_description;
  const result = text.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

  //Calculate date time
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  let month = monthNames[date.getMonth()];
  let year = date.getFullYear();
  let utc_date = date.getUTCDate();
  let final_date = utc_date + Math.round(props.timezone / 60 / 60 / 24);

  let sseconds =
    date.getUTCHours() * 3600 +
    date.getUTCMinutes() * 60 +
    date.getUTCSeconds();
  let shifted = sseconds + props.timezone;

  var calculatedTime = new Date(null);
  calculatedTime.setSeconds(shifted);
  var options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  var newTime = calculatedTime.toISOString("en-US", options).substr(11, 5);

  return (
    <div className="today">
      <div className="todayBody">
        <div className="todayWeatherImage">
          <img src={cloud_icon_url} alt="cloud_icon" />
        </div>
        <h1>
          {Math.floor(props.temp)} <span>℃</span>
        </h1>
        <br />
        <p className="cloud_details">{finalResult}</p>
        <hr />
        <div className="location">
          <UilMapMarker className="icon" />
          <p>
            {props.city}, {props.country}
          </p>
        </div>
        <div className="datetime">
          <p>
            <UilCalender className="icon" />
            {final_date} {month} {year}
          </p>
          <div className="time">{newTime}</div>
        </div>
      </div>
    </div>
  );
};

export default TodayMain;
