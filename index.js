import { API_KEY } from "./secret.js";
const url =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

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

const london = await get_weather_data("london", "", "", API_KEY);
console.log(london);
