const Part = ({ id, part }) => {
    return <h3>{part.name} {part.exercises}</h3>
}

const Content = ({ id, parts }) => {
    return (
      <div>
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </div>
    );
}

export default Content
