import React from 'react'

const Match = (props) => {
    return (
        <tr>
            <th scope="row">{props.index}</th>
                <td>{props.name}</td>
                <td>{props.time}</td>
                <td>{props.attempts}</td>
                <td>{props.numberGuessed}</td>
        </tr>
    )
}

export default Match