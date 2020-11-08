import numeral from "numeral";
import {casesTypeColors} from "./constants";

export const sortData = (data, type) => {
    return [...data].sort((a, b) => a[type] > b[type] ? -1 : 1)
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
                label: function (tooltipItem) {
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
                        callback: function (value) {
                            return numeral(value).format("0a");
                        },
                    },
                },
            ],
        },
    };
}