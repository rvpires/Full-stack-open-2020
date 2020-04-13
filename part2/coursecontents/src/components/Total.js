import React from 'react'

const Total = ({parts}) =>
{
    var exercises = parts.map(parts => parts.exercises)  

    return(
        <p><b>total of exercises {exercises.reduce((accumulator, currentValue) => accumulator + currentValue, 0 )}</b></p>
    )

}


export default Total