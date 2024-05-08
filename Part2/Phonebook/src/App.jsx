import { useState } from 'react'
import { useEffect } from 'react'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import './app.css'

const Notification = ({ message }) => {
  if (message == '') return null
  return (
    <div className='message'>
      <h5>{message}</h5>
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(initalPersons =>
        setPersons(initalPersons));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let duplicate = false;
    let duplicatePerson;
    const newPerson = { name: newName, phone: newPhone };
    
    persons.forEach((person) => {
      if (person.name == newName) {
        duplicate = true;
        duplicatePerson = person;
      }
    });

    if (duplicate) {
      const text = `${newName} is already added to phonebook, replace the old number with new one?`;
      if(window.confirm(text)) {
        personService
          .update(duplicatePerson.id, newPerson)
          .then(res => {
            setPersons(persons.map(p => p.id !== duplicatePerson.id ? p : res.data))
            setMessage(`Person ${duplicatePerson.name} phone number was updated`);
            setTimeout(() => setMessage(''), 5000);
          })  
      }
    } 
    else {
      personService
        .create(newPerson)
        .then(createdPerson => {
          setPersons([...persons, createdPerson]);
          setMessage(`Person ${createdPerson.name} was added`);
          setTimeout(() => setMessage(''), 5000);
        });
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
  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setMessage(`Person ${person.name} was deleted`);
          setTimeout(() => setMessage(''), 5000);
        })
        .catch(err => {
          console.log(`error deleting person: ${error}`);
          throw error
        });
    }
  }

  const filteredPersons = persons.filter((person) =>
    person.name && person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter serach={search} searchChange={handleSearchChange} />

      <h2>Add a new contact</h2>
      <PersonForm 
        submit={handleSubmit}
        name={newName}
        nameChange={handleNameChange}
        phone={newPhone}
        phoneChange={handlePhoneChange} 
      />

      <h2>Numbers</h2>
      <div>
        <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
      </div>
    </div>
  )
}

export default App