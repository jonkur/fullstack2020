import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((acc, part) => acc + part.exercises, 0)
    return(
      <strong>Total of {sum} exercises</strong>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part => <Part key={part.id} part={part} /> )}
      </div>
    )
  }
  
  const Course = ({course}) => (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )

  export default Course