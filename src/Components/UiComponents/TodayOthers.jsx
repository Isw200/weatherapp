import React from "react";
import "../../Styles/TodayOthers.css";
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  UilSun,
  UilSunset,
  UilTemperatureQuarter,
  UilTear,
  UilEye,
} from "@iconscout/react-unicons";

function toMins(time) {
  let mins = time.slice(3);
  let hours = time.slice(0, 2);
  let total_mins = parseInt(mins) + parseInt(hours) * 60;
  return total_mins;
}
function correctTime(time, timezone) {
  let mins = time.slice(3);
  let hours = time.slice(0, 2);
  let hours_toMin = parseInt(hours) * 60;
  let timeZoneMin = timezone / 60;
  let total_mins = timeZoneMin + parseInt(mins) + hours_toMin;

  var hours2 = total_mins / 60;
  var rhours = Math.floor(hours2);
  var minutes = (hours2 - rhours) * 60;
  var rminutes = Math.round(minutes);

  if (rhours > 24) {
    let rem = rhours - 24;
    rhours = rem;
  }

  if (rminutes < 10) {
    rminutes = "0" + rminutes;
  }
  if (rhours < 10) {
    rhours = "0" + rhours;
  }

  return rhours + ":" + rminutes;
}

function TodayOthers(props) {
  //temp
  let temp_array20 = [];
  let multiplyer = 0;
  if (props.temp < 20) {
    multiplyer = 3;
  } else if (props.temp < 30) {
    multiplyer = 2;
  } else {
    multiplyer = 1;
  }
  for (let index = 0; index < props.temp_array.length - 20; index++) {
    const element = props.temp_array[index];
    const temp = element.main.temp;
    temp_array20[index] = temp * multiplyer + "px";
  }

  //wind
  const widndSpeed = props.wind_speed * 3.6;
  const wind_speed = Number(widndSpeed.toFixed(2));
  const wind_percentage = (wind_speed / 60) * 100;

  //sunset & sunrise
  let sunriseS = props.sun_rise;
  var date = new Date(sunriseS * 1000);

  let sunsetS = props.sunset;
  var date2 = new Date(sunsetS * 1000);

  var options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  var sunrise_time_for_cal = date.toISOString("en-US", options).substr(11, 5);
  var sunset_time_for_cal = date2.toISOString("en-US", options).substr(11, 5);

  let correct_sunrise_time_for_disply = correctTime(
    sunrise_time_for_cal,
    props.timezone
  );

  let correct_sunset_time_for_disply = correctTime(
    sunset_time_for_cal,
    props.timezone
  );
  const dateNew = new Date();
  let sseconds =
    dateNew.getUTCHours() * 3600 +
    dateNew.getUTCMinutes() * 60 +
    dateNew.getUTCSeconds();

  let shifted = sseconds + props.timezone;

  var calculatedTime = new Date(null);
  calculatedTime.setSeconds(shifted);
  var options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  var newTime = calculatedTime.toISOString("en-US", options).substr(11, 5);

  let sunrise_mins = toMins(correct_sunrise_time_for_disply);
  let sunset_mins = toMins(correct_sunset_time_for_disply);
  let current_mins = toMins(newTime);

  console.log("rise: " + correct_sunrise_time_for_disply);
  console.log("set: " + correct_sunset_time_for_disply);
  console.log("current: " + newTime);

  console.log(current_mins);
  console.log(sunset_mins);

  let sun_percentage = 0;
  if (current_mins > sunrise_mins) {
    if (current_mins >= sunset_mins) {
      sun_percentage = 100;
    } else {
      sun_percentage =
        ((current_mins - sunrise_mins) / (sunset_mins - sunrise_mins)) * 100;
    }
  } else {
    sun_percentage = 0;
  }

  //Realfeel temp message
  let message = "";
  if (props.feels_like < 15) {
    message = "It's too cold, Stay inside!";
  } else if (props.feels_like > 35) {
    message = "It's too hot! Stay coverd!";
  } else {
    message = "Feels good, Enjoy your day";
  }

  return (
    <div className="others">
      <div className="othersBody">
        <h3>Today's Highlights</h3>
        <div className="bigBox">
          {/* -----temp----- */}
          <div className="temp">
            <h3>Temperature Status</h3>
            <div className="chart">
              {temp_array20.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bar"
                    style={{ height: item }}
                  ></div>
                );
              })}
            </div>
            <div className="curentTemp">
              <div className="tempNow">
                <div className="tempValue">
                  <p>{props.temp}</p>
                  <span>℃</span>
                </div>
              </div>
              <div className="minmaxtemp">
                <p>
                  <b>Min</b> {props.min_temp} ℃
                </p>
                <p>
                  <b>Max</b> {props.max_temp} ℃
                </p>
              </div>
            </div>
          </div>

          {/* -----wind----- */}
          <div className="wind">
            <h3>Wind Speed</h3>
            <div className="windMeter">
              <CircularProgressbarWithChildren
                value={wind_percentage}
                circleRatio={0.5}
                styles={buildStyles({
                  rotation: 0.75,
                  strokeLinecap: "round",
                  pathTransitionDuration: 2,
                  pathColor: `rgb(0, 155, 252)`,
                  trailColor: "rgba(130, 130, 130, 0.346)",
                })}
                strokeWidth={8}
              >
                <div className="windSpeed" style={{ display: "flex" }}>
                  <p style={{ fontSize: 40, marginTop: 55 }}>{wind_speed} </p>
                  <span
                    style={{
                      textAlign: "center",
                      marginLeft: 10,
                      marginTop: 74,
                      fontSize: 20,
                    }}
                  >
                    km/h
                  </span>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </div>

          {/* ----- sun ----- */}
          <div className="sun">
            <h3>Sunrise & Sunset</h3>
            <div className="sunMeter">
              <CircularProgressbar
                value={sun_percentage}
                circleRatio={0.5}
                styles={buildStyles({
                  rotation: 0.75,
                  strokeLinecap: "round",
                  textSize: "13px",
                  pathTransitionDuration: 2,
                  pathColor: `#FFD827`,
                  textColor: "#000",
                  trailColor: "rgba(255, 237, 157, 0.300)",
                })}
                strokeWidth={4}
              />
              <div className="riseAndSetIcons">
                <UilSun className="UilSun" />
                <UilSunset />
              </div>
              <div className="riseAndSetTimes">
                <p>{correct_sunrise_time_for_disply}</p>
                <p>{correct_sunset_time_for_disply}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="smallBox">
          {/* ----- Feels like ----- */}
          <div className="feelslike">
            <h3>Feels Like</h3>
            <div className="flexBox">
              <div className="box">
                <UilTemperatureQuarter className="icon" />
                <div>{Math.floor(props.feels_like)} ℃</div>
              </div>
              <p>{message}</p>
            </div>
          </div>

          {/* ----- humidity ------ */}
          <div className="humidity">
            <h3>Humidity</h3>
            <div className="flexBox">
              <div className="value">
                {props.humidity}
                <span>%</span>
              </div>
              <div className="humDescription">
                <UilTear className="UilTear" />
                <p>The drew point is 27 right now</p>
              </div>
            </div>
          </div>

          {/* ----- visibility ------ */}
          <div className="visibility">
            <h3>Visibility</h3>
            <div className="flexBox">
              <div className="value">
                {props.visibility / 1000}
                <span>km</span>
              </div>
              <div className="visDescription">
                <UilEye />
                <p>It's very clear, Less Humidity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodayOthers;
