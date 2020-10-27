import React, {useEffect, useRef, useState} from 'react'
import Card from "@material-ui/core/Card";
import { Map as LeafletMap, TileLayer } from 'react-leaflet'
import {useSelector} from "react-redux";
import {selectors} from "model/selectors";
import {MapData} from "./MapData";
import "./Map.css"

const worldCenter = [34.80746, -40.4796 ]
const initialZoom = window.innerWidth > 1000 ? 3 : 2

export const Map = () => {
    const country = useSelector(selectors.country)
    const countryCode = useSelector(selectors.countryCode)
    const countriesData = useSelector(selectors.countriesData)
    const type = useSelector(selectors.type)

    const [mapCenter, setMapCenter] = useState(worldCenter);
    const [zoom, setZoom] = useState(initialZoom)
    const map = useRef()


    useEffect(() => {
        updateMap()
    }, [country])

    const updateMap = () => {
        if (countryCode === 'worldwide') {
            setMapCenter(worldCenter)
            setZoom(initialZoom)
        } else {
            setMapCenter([country.countryInfo.lat, country.countryInfo.long])
            setZoom(4)
        }
    }

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
                <MapData
                    data={countriesData}
                    type={type}
                    zoom={zoom}
                />
            </LeafletMap>
        </Card>
    )

}