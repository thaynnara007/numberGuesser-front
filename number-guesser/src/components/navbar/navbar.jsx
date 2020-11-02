import React, { useState, Fragment } from 'react'
import Box from '../box/box'
import './navbar.css'

import 'bootstrap/dist/css/bootstrap.min.css'


const Navbar = (props) => {

    const [how, setHow] = useState(true)
    const [play, setPlay] = useState(false)
    const [rank, setRank] = useState(false)

    const choseOne = (choosed) => {
        if (choosed === "how") {
            setPlay(false)
            setRank(false)
            setHow(true)
        }
        else if (choosed === "play") {
            setPlay(true)
            setRank(false)
            setHow(false)
        }
        else {
            setPlay(false)
            setRank(true)
            setHow(false)
        }
    }

    const boxTitle = how ? 'howTitle' : 'rankTitle'
    const styleHow = how ? "box-shadow-click" : "box-shadow-default"
    const stylePlay = play ? "box-shadow-click" : "box-shadow-default"
    const styleRank = rank ? "box-shadow-click" : "box-shadow-default"

    return (
        <Fragment>
            <nav className="navbar-expand-lg navbar-color-default">
                <ul className="nav nav-pills nav-fill nav-menu">
                    <li className={`nav-item border-right border-secondary ${styleHow}`}
                        onClick ={ () => choseOne('how') }>
                        <a className="nav-link item-default">How to play</a>
                    </li>
                    <li className={`nav-item border-right border-secondary ${stylePlay}`}
                        onClick ={ () => choseOne('play') } >
                        <a className="nav-link item-default">Play</a>
                    </li>
                    <li className={`nav-item border-right border-secondary ${styleRank}`}
                        onClick ={ () => choseOne('rank') }>
                        <a className="nav-link item-default">Rank</a>
                    </li>
                </ul>
            </nav>
            <Box how={how} play={play} rank={rank} title={boxTitle}></Box>
        </Fragment>
    )
}

export default Navbar