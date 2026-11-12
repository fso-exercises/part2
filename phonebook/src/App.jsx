import {useEffect, useState} from 'react'

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebooks";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPhrase, setSearchPhrase] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    phonebookService
        .getAll()
        .then(persons => setPersons(persons))
  }, [])

  const filteredPersons = searchPhrase.trim().length === 0
      ? persons
      : persons.filter(person =>
          person.name.toLowerCase().includes(searchPhrase.toLowerCase()))

  const upsertPerson = () => {
    const duplicate = persons.find(person =>
        person.name.toLowerCase() === newName.toLowerCase())
    if (duplicate) {
      const message = `${newName} is already added to phonebook, \
      replace the old number with a new one`
      if (confirm(message)) {
        const modifiedPerson = { ...duplicate, number: newNumber }
        phonebookService
            .update(duplicate.id, modifiedPerson)
            .then(updatedPerson => {
              setPersons(
                  persons.map(p => p.id === duplicate.id ? updatedPerson : p))
            })
            .catch(error => {
              setErrorMessage(`Information of ${modifiedPerson.name} has already been removed from server`)
              setTimeout(() => setErrorMessage(null), 5000)
              removePerson(modifiedPerson.id)
            })
            .finally(() => resetInputs())
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      phonebookService
          .create(newPerson)
          .then(createdPerson => {
            setPersons(persons.concat(createdPerson))
            resetInputs()
          })
          .then(() => {
            setSuccessMessage(`Added ${newPerson.name}`)
            setTimeout(() => setSuccessMessage(null), 5000)
          })
    }
  }

  const deletePerson = (id) => {
    phonebookService
        .deletePerson(id)
        .catch(error => console.log(error))
        .finally(() => removePerson(id))
  }

  const removePerson = (id) => setPersons(persons.filter(p => p.id !== id))

  const resetInputs = () => {
    setNewName('')
    setNewNumber('')
  }

  return (
      <div>
        <h2>Phonebook</h2>
        <Notification.Success message={successMessage}/>
        <Notification.Error message={errorMessage}/>
        <Filter query={searchPhrase} onQueryChange={setSearchPhrase}/>
        <h2>add a new</h2>
        <PersonForm
            onSubmit={upsertPerson}

            name={newName}
            onNameChange={setNewName}

            number={newNumber}
            onNumberChange={setNewNumber}
        />
        <h3>Numbers</h3>
        <Persons persons={filteredPersons} onDelete={deletePerson}/>
      </div>
  )
}

export default App
