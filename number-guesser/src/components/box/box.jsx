import React, { useEffect, useState } from 'react'
import Rank from '../rank/rank'
import Game from '../game/game'
import { 
    howTitle,
    howText
} from '../../utils/constants'
import './box.css'

const How = (props) => {

    useEffect( () => {
        props.setTitle(howTitle)
    })

    return (
        <div className="container">
            <p>{howText}</p>
        </div>
    )
}


const Box = (props) => {

    const { how, play, rank } = props

    const [ title, setTitle ] = useState('')

    const content = () => {
        if (how) return <How setTitle={setTitle}></How>
        else if (rank) return <Rank setTitle={setTitle}></Rank>
        else return <Game setTitle={setTitle}></Game>
    }

    return (
        <div className="container box-size text-monospace">
            <div className="text-center shadow-lg p-3 mb-5 rounded title">
                <h3 className="mb-0">{title}</h3>
            </div>
            { content() }
        </div>
    )
}

export default Box