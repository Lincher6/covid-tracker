import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import numeral from "numeral";


export const InfoBox = ({ title, cases, total, ...props }) => {
    return (
        <Card className="info-box" {...props} >
            <CardContent>
                <Typography color="textSecondary">
                    {title}
                </Typography>
                <h2>
                    {numeral(cases).format("+0,0")}
                </h2>
                <Typography color="textSecondary">
                    {numeral(total).format("0,0")}
                    Total
                </Typography>
            </CardContent>
        </Card>
    )
}