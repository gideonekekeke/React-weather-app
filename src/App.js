import React, { useEffect, useState } from "react";
import styled from "styled-components";
import pic from "./img/1.jpg";
import pic1 from "./img/2.gif";
import pic2 from "./img/3.gif";
import { Input } from "antd";
import "antd/dist/antd.css";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

const api = {
  key: "1c05f4b5e6cd5ed6e8445e2894dc586d",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchBox, setSearchBox] = useState("");
  const [fetchWeather, setFetchWeather] = useState("");

  const Search = async () => {
    const res = await axios(
      `${api.base}weather?q=${searchBox}&units=metric&appid=${api.key}`
    );

    console.log(res.data);
    if (res) {
      return setFetchWeather(res.data);
    }
  };

  const dateBuilder = (d) => {
    let month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "Septembet",
      "October",
      "November",
      "December",
    ];

    let day = [
      "Sunday",
      "monday",
      "Tuesday",
      "Wednessday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let days = day[d.getDay()];
    let months = month[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();

    console.log(days);
    console.log(months);
    console.log(date);
    console.log(year);

    return `${days} ${date} ${months} ${year} `;
  };

  useEffect(() => {
    Search();
  }, []);

  return (
    <div>
      {fetchWeather ? (
        <>
          <Container>
            <WeatherImage src={pic} />

            <Input
              onKeyPress={Search}
              onChange={(e) => {
                setSearchBox(e.target.value);
              }}
              // value={searchBox}
              placeholder="Search"
            />

            <WeatherDate>{dateBuilder(new Date())} </WeatherDate>
            <WeatherCity>
              {fetchWeather.name}, {fetchWeather.sys.country}
            </WeatherCity>
            <Weatherdegree>
              {Math.round(fetchWeather.main.temp)}°c
            </Weatherdegree>
            <WeatherDescription>
              {fetchWeather.weather[0].description}
            </WeatherDescription>
          </Container>
        </>
      ) : (
        <Container>
          <WeatherImage src={pic} />

          <Input
            onKeyPress={Search}
            onChange={(e) => {
              setSearchBox(e.target.value);
            }}
            value={searchBox}
            placeholder="Search"
          />

          <WeatherDate>{dateBuilder(new Date())} </WeatherDate>
          <WeatherCity>Default, null</WeatherCity>
          <Weatherdegree>0°c</Weatherdegree>
          <WeatherDescription>description</WeatherDescription>
        </Container>
      )}
    </div>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  justify-content: center;
  color: white; /* align-items: center; */
  Input {
    position: absolute;
    height: 50px;
    width: 320px;
    margin-top: 5px;
    border-radius: 5px;
    font-size: 20px;
  }
`;

const WeatherImage = styled.img`
  height: 100vh;
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background: rgba(255, 255, 255, 0.9);
`;

const WeatherDate = styled.div`
  position: absolute;

  margin-top: 100px;
  border-radius: 5px;
  font-size: 25px;
`;

const WeatherCity = styled.div`
  position: absolute;

  margin-top: 150px;
  border-radius: 5px;
  font-size: 40px;
  font-weight: bold;
`;
const WeatherDescription = styled.div`
  position: absolute;

  margin-top: 450px;
  border-radius: 5px;
  font-size: 50px;
  font-weight: bold;
`;
const Weatherdegree = styled.div`
  position: absolute;
  margin-top: 250px;
  font-size: 100px;
  font-weight: bold;
  color: white;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.19);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  /* border-radius: 10px; */
  /* border: 1px solid rgba(255, 255, 255, 0.18); */
  box-shadow: 0px 5px 7px -2px rgba(0, 0, 0, 0.35);
  height: 170px;
  width: 300px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
