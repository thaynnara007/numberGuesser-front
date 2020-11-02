import React from 'react'
import moment from 'moment'

const Match = (props) => {
    const secondsToTime = (miliseconds) => {
        const time = moment(miliseconds).format("hh:mm:ss")
        return time.slice(3)
    }

    return (
        <tr>
            <th scope="row">{props.index}</th>
                <td>{props.name}</td>
                <td>{secondsToTime(props.time)}</td>
                <td>{props.attempts}</td>
                <td>{props.numberGuessed}</td>
        </tr>
    )
}

export default Match