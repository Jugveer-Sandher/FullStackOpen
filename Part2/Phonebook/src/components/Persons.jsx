const Person = ({ id, name, phone }) => {
    return (
      <div>
        <h5>{name} {phone}</h5>
      </div>
    )
}

const Persons = ({ filteredPersons }) => {
    return (
      <div>
        {filteredPersons.map(person =>
          <Person key={person.id} name={person.name} phone={person.phone} /> 
        )}
      </div>
    )
}

export default Persons
