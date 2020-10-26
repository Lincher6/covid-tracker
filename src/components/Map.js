import React, {useEffect, useRef, useState} from 'react'
import Card from "@material-ui/core/Card";
import { Map as LeafletMap, TileLayer } from 'react-leaflet'
import {showDataOnMap} from "../utils";

const worldCenter = [34.80746, -40.4796 ]

export const Map = ({ country, countryCode, countriesData, type = 'cases' }) => {
    const [mapCenter, setMapCenter] = useState(worldCenter);
    const [zoom, setZoom] = useState(3)
    const map = useRef()
    const popup = useRef()

    useEffect(() => {
        if (countryCode === 'worldwide') {
            setMapCenter(worldCenter)
            setZoom(3)
        } else {
            setMapCenter([country.countryInfo.lat, country.countryInfo.long])
            setZoom(4)
        }
    }, [country])

    const handleZoomChange = () => {
        setZoom(map.current.leafletElement.getZoom())
    }

    return (
        <Card className='map'>
            <LeafletMap
                ref={map}
                center={mapCenter}
                zoom={zoom}
                minZoom={2}
                onZoomEnd={handleZoomChange}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

                />
                {showDataOnMap(countriesData, type, zoom)}
            </LeafletMap>
        </Card>
    )

}