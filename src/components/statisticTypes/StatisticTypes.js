import React from 'react'
import {InfoBox} from "./InfoBox";
import './StatisticTypes.css'
import {useSelector} from "react-redux";
import {selectors} from "model/selectors";

const types = [
    {
        type: 'cases',
        title: "Cases",
        todayType: 'todayCases'
    },
    {
        type: 'recovered',
        title: "Recovered",
        todayType: 'todayRecovered'
    },
    {
        type: 'deaths',
        title: "Deaths",
        todayType: 'todayDeaths'
    },
]

export const StatisticTypes = () => {
    const country = useSelector(selectors.country)
    const currentType = useSelector(selectors.type)

    return (
        <div className="statisticTypes">
            {
                types.map(({ type, title, todayType }) => (
                    <InfoBox
                        key={title}
                        title={title}
                        cases={country[todayType]}
                        total={country[type]}
                        type={type}
                        active={type === currentType}
                    />
                ))
            }
        </div>
    )
}