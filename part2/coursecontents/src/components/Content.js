import React from 'react'
import Part from './Part'

const Content = ({ parts }) =>
{
    return(
        parts.map(parts => <Part key={parts.id} name={parts.name} exercises={parts.exercises}/>)
    )
}


export default Content