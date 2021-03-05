"strict mode";

const api_key = "7747d6dbc5a1be9f1b358ed744106784";

const log = console.log;
let locationDom = document.querySelector(".location");
let timeDom = document.querySelector(".date");
let windDom = document.querySelector(".wind span");
let humidityDom = document.querySelector(".humidity span");
let sunDom = document.querySelector(".sun-houres span");
let tempDom = document.querySelector(".temp-div span");
let feelsLikeDom = document.querySelector(".feels-like");

window.addEventListener("load", () => {
  let longitude_x;
  let latitude_y;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      //   console.log(pos);
      longitude_x = pos.coords.longitude;
      latitude_y = pos.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude_y}&lon=${longitude_x}&appid=${api_key}&units=metric`;
      //   console.log(api);

      fetch(api, {
        mode: "cors",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          updateDom(data);
        });
    });
  } else {
    alert("khdm dik gps a7mbak");
  }
});

// log("hello world");
function updateDom(data) {
//   console.log(data);
  let { temp, humidity, feels_like } = data.main;

  locationDom.textContent = data.name;
  tempDom.textContent = `${temp.toFixed(0)}°`;
  feelsLikeDom.textContent = `Feels like: ${feels_like.toFixed(1)}°`;

  let temp1 = new Date();
  timeDom.textContent = `${temp1
    .getHours()
    .toString()
    .padStart(2, "0")}:${temp1.getMinutes().toString().padStart(2, "0")}`;

  windDom.textContent = data.wind.speed.toFixed(1) + " Km/h";
  humidityDom.textContent = humidity + " %";

  let suntime = (Number(data.sys.sunset) - Number(data.sys.sunrise)) / 3600;
  sunDom.textContent = `${suntime.toFixed(1)} h`;

  //   log("-- debug --")
  let iconCode = data.weather[0].icon;
  let desc = data.weather[0].description;
  //   log(iconCode + ' ' + desc);
  let widLink = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  let widget = document.querySelector(".widget");
  widget.innerHTML = `
				<img src="${widLink}" alt="weather icon">
		<p>${desc}</p>
	`;
}
