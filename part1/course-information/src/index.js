import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
  <>
    <h1>{props.course.name}</h1>
  </>
)

const Content = (props) => (
  <>
    {
    props.parts.map((part, index) => {
      return (<p key={index}>{part.name} {part.exercises}</p>)
    })
    }
  </>
)

const Total = (props) => {
  let total = 0
  props.parts.forEach(part => {
    total += part.exercises
  })
  return (
    <>
      <p>Number of exercises: {total}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [{name: 'Fundamentals of React', exercises: 10},
            {name: 'Using props to pass data', exercises: 7},
            {name: 'State of a component', exercises: 14}]
  }

  return (
    <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))