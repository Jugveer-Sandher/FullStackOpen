import { useState } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import { useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) =>
        setPersons(res.data));
  }, []);

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