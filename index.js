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

const formatter = new Intl.DateTimeFormat("ru-RU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
});

async function get_weather_data(location, date_from, date_to, API_KEY) {
    const date1 = date_from ? `/${date_from}` : "";
    const date2 = date_to ? `/${date_to}` : "";
    const response = await fetch(
        `${url}${location}${date1}${date2}?key=${API_KEY}`,
    );
    if (response.ok) {
        let result = response.json();
        return result;
    }
}

async function get_and_populate(data) {
    // const moscow = await get_weather_data("moscow", "", "", API_KEY);
    // console.log(moscow);
}

// const london = await get_weather_data("london", "", "", API_KEY);
// console.log(london);
