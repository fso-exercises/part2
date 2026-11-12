const Header = ({ text }) => <h1>{text}</h1>

const Part = ({ part }) => (
    <p>
      {part.name} {part.exercises}
    </p>
)

const Content = ({ course }) => {
  return (
      <>
        {course.parts.map(part =>
            <Part key={part.id} part={part} />
        )}
      </>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, p) => sum + p.exercises, 0)

  return <strong>total of {total} exercises</strong>
}

const Course = ({ course }) => {
  return (
      <div>
        <Header text={course.name} />
        <Content course={course} />
        <Total parts={course.parts} />
      </div>
  )
}

export default Course
