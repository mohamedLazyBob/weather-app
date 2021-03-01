'strict mode'

const api_key = "7747d6dbc5a1be9f1b358ed744106784";

const log = console.log;
let locationDom = document.querySelector(".location");
let timeDom = document.querySelector(".date");
let windDom = document.querySelector(".wind span");
let humidityDom = document.querySelector(".humidity span");
let sunDom = document.querySelector(".sun-houres span");
let tempDom = document.querySelector(".temp-div span");

window.addEventListener("load", () => {
  let longitude_x;
  let latitude_y;


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      //   console.log(pos);
      longitude_x = pos.coords.longitude;
      latitude_y = pos.coords.latitude;

      const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude_y}&lon=${longitude_x}&appid=${api_key}&units=metric`;
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

function updateDom(data) {
  //   console.log(data);
  let { temp, humidity } = data.main;

  locationDom.textContent = data.name;
  tempDom.textContent = `${temp.toFixed(0)}°`;
  let temp1 = new Date();
  timeDom.textContent = `${temp1.getHours()}:${temp1.getMinutes()}`;
  windDom.textContent = data.wind.speed.toFixed(1) + " Km/h";
  humidityDom.textContent = humidity + " %";

  let suntime = (Number(data.sys.sunset) - Number(data.sys.sunrise)) / 3600;
  sunDom.textContent = `${suntime.toFixed(1)} h`;
}
