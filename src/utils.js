import numeral from "numeral";
import {Circle, Popup} from "react-leaflet";
import React from "react";
import {casesTypeColors} from "./constants";

export const sortData = data => {
    return [...data].sort((a, b) => a.cases > b.cases ? -1 : 1)
}

export const capitalize = (name) => {
    return `${name.slice(0,1).toUpperCase()}${name.slice(1)}`
}

export const buildChartData = (data, type = 'cases') => {
    data = data[type]
    let lastDataPoint

    const chartData =  Object.keys(data).map(date => {
        const newPoint = {
            x: date,
            y: data[date] - lastDataPoint
        }
        lastDataPoint = data[date]
        return newPoint
    })

    return {
        datasets: [
            {
                backgroundColor: casesTypeColors[type].rgb,
                borderColor: casesTypeColors[type].hex,
                data: chartData,
            },
        ],
    }
}

export const buildChatOptions = () => {
    return {
        legend: {
            display: false,
        },
        elements: {
            point: {
                radius: 0,
            },
        },
        maintainAspectRatio: false,
        tooltips: {
            mode: "index",
            intersect: false,
            callbacks: {
                label: function (tooltipItem, data) {
                    return numeral(tooltipItem.value).format("+0,0");
                },
            },
        },
        scales: {
            xAxes: [
                {
                    type: "time",
                    time: {
                        format: "MM/DD/YY",
                        tooltipFormat: "ll",
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        callback: function (value, index, values) {
                            return numeral(value).format("0a");
                        },
                    },
                },
            ],
        },
    };
}

export const showDataOnMap = (data, type = 'cases', zoom = 3) => {
    const zoomDif = zoom > 2 ? zoom - 2 : 1

    return data.map((country, index) => (
        <Circle
            key={index}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            color={casesTypeColors[type].hex}
            fillOpacity={0.4}
            fillColor={casesTypeColors[type].hex}
            radius={
                (Math.sqrt(country[type]) * casesTypeColors[type].multiplier) / zoomDif
            }
        >
            <Popup>
                <div className="popup">
                    <div>
                        <img src={country.countryInfo.flag} alt="flag"/>
                    </div>
                    <div className="popup__name">
                        {country.country}
                    </div>
                    <div>
                        Cases:&nbsp;
                        <span className="cases">
                            {numeral(country.cases).format("0,0")}
                        </span>
                    </div>
                    <div>
                        Recovered:&nbsp;
                        <span className="recovered">
                            {numeral(country.recovered).format("0,0")}
                        </span>
                    </div>
                    <div>
                        Deaths:&nbsp;
                        <span className="deaths">
                            {numeral(country.deaths).format("0,0")}
                        </span>
                    </div>
                </div>
            </Popup>
        </Circle>
    ))
}