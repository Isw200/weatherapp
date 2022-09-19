import React from "react";
import "../../Styles/FiveDaysForecast.css";

function getDateMonth(date) {
  let day = "";
  let date_string = date.slice(8, 10);
  let month_string = date.slice(5, 7);

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
  month_string = monthNames[month_string - 1];
  day = date_string + " " + month_string;
  return day;
}

function getDay(date) {
  //"2022-09-18 09:00:00"
  let day = "";
  let time_string = date.slice(11);
  let date_string = date.slice(8, 10);
  let month_string = date.slice(5, 7);
  let year_string = date.slice(0, 4);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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
  month_string = monthNames[month_string - 1];

  let textStr =
    month_string + " " + date_string + ", " + year_string + " " + time_string;

  const d = new Date(textStr);
  let dayIndex = d.getDay();
  day = days[dayIndex];

  return day;
}

function FiveDaysFrodcast(props) {
  let fievRows = [];

  let i = 0;
  for (let index = 0; index < props.frodcast_array.length; index += 8) {
    fievRows[i] = props.frodcast_array[index];
    i++;
  }

  return (
    <div className="fiveDaysFrodcast">
      <div className="fiveDaysBody">
        <h3>5 Days Forecast</h3>
        <div className="fiveDaysFrodcastBody">
          {fievRows.map((day, index) => {
            let cloud_icon_url = `Images/weather_icons/${day.weather[0].icon}.png`;
            return (
              <div key={index} className="row" style={{ color: "#fff" }}>
                <div className="cloudicon">
                  <img src={cloud_icon_url} alt="cloud_icon" />{" "}
                </div>

                <div className="temperature">
                  <p>{Math.floor(day.main.temp)}</p>
                  <span> ℃</span>
                </div>

                <div className="dateAndMonth">{getDateMonth(day.dt_txt)}</div>

                <div className="day">{getDay(day.dt_txt)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FiveDaysFrodcast;
