import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import numeral from "numeral";


export const InfoBox = ({ title, cases, total, type, active, ...props }) => {
    const activeClass = active ? 'info-box__active' : ''

    return (
        <Card className={`info-box ${activeClass}`} {...props} >
            <CardContent>
                <div className={type}>
                    {title}
                </div>
                <div className={`info-box__count ${type}`}>
                    {numeral(cases).format("+0,0")}
                </div>
                <div>
                    Total:    {numeral(total).format("0,0")}
                </div>
            </CardContent>
        </Card>
    )
}