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

const test_layout = {
    node: "div",
    class: "",
    children: [
        {
            node: "div",
            class: ["inner-item"],
            children: [
                {
                    node: "p",
                    class: ["test-p"],
                    children: [],
                },
                {
                    node: "p",
                    class: ["test-p"],
                    children: [],
                },
            ],
        },
        {
            node: "div",
            class: ["inner-item", "temp"],
            children: [
                {
                    node: "p",
                    class: ["temp"],
                    children: [],
                },
            ],
        },
    ],
};

function create_layout(nodes = {}, result = []) {
    if (nodes.children.length === 0) {
        return result;
    }
    // console.log(nodes);
    nodes.children.forEach((child) => {
        console.log(child.node);
        console.log(child.class);
        if (child.node !== "") {
            const item = document.createElement(child.node);
            console.log(item);
            if (Array.isArray(child.class) && child.class.length >= 0)
                item.classList.add(...child.class);
            result.push(item);
            console.log(result);
            // return result;
        }

        create_layout(child, result);
    });
}

const layout = create_layout(test_layout, []);
console.log(layout);

async function get_and_populate(data) {
    // const moscow = await get_weather_data("moscow", "", "", API_KEY);
    // console.log(moscow);
}

// const london = await get_weather_data("london", "", "", API_KEY);
// console.log(london);
