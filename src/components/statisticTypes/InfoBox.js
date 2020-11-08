import React from 'react'
import './StatisticTypes.css'
import { Card, CardContent } from '@material-ui/core'
import numeral from "numeral";
import {useDispatch} from "react-redux";
import {changeType} from "model/rootSlice";


export const InfoBox = ({ title, cases, total, type, active }) => {
    const dispatch = useDispatch()
    const activeClass = active ? 'infoBox__active' : ''

    const changeTypeHandler = () => {
        dispatch(changeType(type))
    }

    return (
        <Card className={`infoBox ${activeClass}`} onClick={changeTypeHandler} >
            <CardContent>
                <div className={type}>
                    {title}
                </div>
                <div className={`infoBox__count ${type}`}>
                    {numeral(cases).format("+0,0")}
                </div>
                <div className="total">
                    Total:    {numeral(total).format("0,0")}
                </div>
            </CardContent>
        </Card>
    )
}