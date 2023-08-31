const Header = ({name}) => <h1>{name}</h1>

const Content = ({ parts }) => parts.map(part => <p key={part.id}>{part.name}: {part.exercises}</p> )

const Total = ({ parts }) => {
  let sum = parts.reduce((oldSum, part) => oldSum += part.exercises, 0)
  return <p>Number of exercises {sum}</p>
}

const Course = ({course}) =>
  <>
  <Header name={course.name} />
  <Content parts={course.parts} />
  <Total parts={course.parts} />
  </>


export default Course