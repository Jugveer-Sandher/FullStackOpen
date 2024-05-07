import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [search, setSearch] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    let duplicate = false;
    
    persons.forEach((person) => {
      if (person.name == newName) {
        duplicate = true;
      }
    });

    if (duplicate) {
      alert(`${newName} is already added to phonebook`);
    } 
    else {
      const newPerson = { id: persons.length+1, name: newName, phone: newPhone };
      setPersons([...persons, newPerson]);
    }

    setNewName('');
    setNewPhone('');
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  }
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter serach={search} searchChange={handleSearchChange}/>

      <h2>Add a new contact</h2>
      <PersonForm 
        submit={handleSubmit}
        name={newName}
        nameChange={handleNameChange}
        phone={newPhone}
        phoneChange={handlePhoneChange} 
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App