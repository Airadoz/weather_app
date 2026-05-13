import { API_KEY } from "./secret.js";
const url =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

const city_main_info_wrapper = document.querySelector(".main-info-wrapper");
const city_additional_info_wrapper = document.querySelector(
    ".additional-info-wrapper",
);
const city_forecast_wrapper = document.querySelector(".forecast-wrapper");

const hourly_forecast_wrapper = document.querySelector(
    ".hourly-forecast-wrapper",
);

const mode = false;

const formatter = new Intl.DateTimeFormat("ru-RU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
});
const today = new Intl.DateTimeFormat("ru-RU").format(new Date());
// console.log(today);
if (!window.localStorage.getItem(today)) {
    window.localStorage.setItem(today, JSON.stringify({}));
}

async function get_weather_data(location, api_key) {
    const request = await fetch(`${url}${location}?key=${API_KEY}`);
    const today_data = JSON.parse(localStorage.getItem(today));
    if (request.ok) {
        if (!today_data[location]) {
            today_data[location] = await request.json();
            // console.log(today_data);
            localStorage.setItem(today, JSON.stringify(today_data));
            return JSON.parse(window.localStorage.getItem(today));
        } else {
            console.log("Request is saved to localStorage!");
            const today_data = JSON.parse(localStorage.getItem(today));
            return today_data[location];
        }
    } else {
        console.error("Something went wrong.", request.status);
    }
}
const london = await get_weather_data("london", API_KEY);
await console.log(london);
