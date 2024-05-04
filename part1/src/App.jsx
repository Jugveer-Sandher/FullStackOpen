import React from "react"

const Header = ({ courseName }) => {
  return <h1>{courseName}</h1>
}

const Part = ({ index, part }) => {
  return <h3>{part.name} {part.exercises}</h3>
}

const Content = ({ parts }) => {
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  );
}

const Footer = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <h3>Number of exercises {totalExercises}</h3>
    </div>
  );
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {name: 'Fundamentals of React', exercises: 10},
      {name: 'Using props to pass data', exercises: 7},
      {name: 'State of a component', exercises: 14}
    ]
  }

  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Footer parts={course.parts} />
    </>
  );
}

export default App
