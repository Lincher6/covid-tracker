import React from 'react'
import {Circle, Popup} from "react-leaflet";
import {casesTypeColors} from "constants.js";
import numeral from "numeral";

export const MapData = ({ data, type = 'cases', zoom = 3 }) => {
    const zoomDif = zoom > 2 ? zoom - 2 : 1
    const getRadius = (country) => (Math.sqrt(country[type]) * casesTypeColors[type].multiplier) / zoomDif

    return data.map((country, index) => (
        <Circle
            key={index}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            color={casesTypeColors[type].hex}
            fillOpacity={0.4}
            fillColor={casesTypeColors[type].hex}
            radius={getRadius(country)}
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