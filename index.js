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

const formatter = new Intl.DateTimeFormat("en-EN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
});
// console.log(formatter.format(new Date()));
const today = new Intl.DateTimeFormat("ru-RU").format(new Date());
// console.log(today);
if (!window.localStorage.getItem(today)) {
    window.localStorage.setItem(today, JSON.stringify({}));
}

async function get_weather_data(location, unitGroup, api_key) {
    const request = await fetch(
        `${url}${location}?unitGroup=${unitGroup}&key=${API_KEY}`,
    );
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
const london = await get_weather_data("london", "uk", API_KEY);
await console.log(london);

function get_template_data(template_id) {
    const orig = document.getElementById(template_id);
    const copy = orig.content.cloneNode(true);
    return copy;
}
const main_info_node = get_template_data("main-info-wrapper");
const additional_info_node = get_template_data("additional-info");
const daily_forecast_node = get_template_data("daily-forecast");
const hourly_forecast_node = get_template_data("hourly-forecast");

function populate_main_node(main_wrapper, template, data) {
    console.log(template);
    const city = template.querySelector(".location.date .title");
    const date = template.querySelector(".location.date .sub-title");

    const icon = template.querySelector(".icon.temp.now .icon");
    const temp = template.querySelector(".icon.temp.now .temp");

    city.innerText = data.address;
    date.innerText = formatter.format(new Date());

    icon.classList.add(data.currentConditions.icon);
    icon.src = `/assets/images/icon-${data.currentConditions.icon}.webp`;
    temp.innerText = data.currentConditions.temp;
    main_wrapper.innerHTML = "";
    main_wrapper.append(template);
}

populate_main_node(city_main_info_wrapper, main_info_node, london);
