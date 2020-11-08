import React, {useCallback, useEffect, useRef, useState} from 'react'
import './Controls.css'

export const Controls = (props) => {
    const [isBottom, setIsBottom] = useState(false)
    const [isTop, setIsTop] = useState(true)
    const doc = useRef(document.documentElement).current

    const checkBottom = useCallback(() => {
        if (window.pageYOffset > 0) {
            setIsTop(false)
        } else {
            setIsTop(true)
        }

        if (doc.offsetHeight == window.pageYOffset + window.innerHeight) {
            setIsBottom(true)
        } else {
            setIsBottom(false)
        }
    }, [])

    useEffect(() => {
        document.addEventListener('scroll', checkBottom)
        checkBottom()
    }, [])

    return (
        <>
            <div
                className={`nav-button top ${isTop && 'hide'}`}
                onClick={() => window.scrollTo(0, 0)}
            >
                <i className="fas fa-arrow-circle-up"></i>
            </div>

            <div
                className={`nav-button bottom ${isBottom && 'hide'}`}
                onClick={() => window.scrollTo(0, doc.offsetHeight)}
            >
                <i className="fas fa-arrow-circle-down"></i>
            </div>
        </>
    )
}