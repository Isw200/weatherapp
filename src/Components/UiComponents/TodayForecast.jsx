import React from "react";
import "../../Styles/TodayForecast.css";

function toTitleCase(text) {
  const result = text.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
}

function TodayForecast(props) {
  let today = [];

  let i = 0;
  for (let index = 0; index < props.frodcast_array.length - 35; index++) {
    today[i] = props.frodcast_array[index];
    i++;
  }

  return (
    <div className="todayForecast">
      <div className="todayForeBody">
        <h3>Today Forecast</h3>
        <div className="todayForecastBody">
          {today.map((hour, index) => {
            let cloud_icon_url = `Images/weather_icons/${hour.weather[0].icon}.png`;
            return (
              <div key={index} className="rowToday" style={{ color: "#fff" }}>
                <div className="timeToday">{hour.dt_txt.slice(11, 16)}</div>
                <div className="cloudiconToday">
                  <img src={cloud_icon_url} alt="cloud_iconToday" />{" "}
                </div>
                <h4>{toTitleCase(hour.weather[0].description)}</h4>

                <div className="temperatureToday">
                  {Math.floor(hour.main.temp)}
                  <span> ℃</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TodayForecast;
