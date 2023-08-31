import { useState, useEffect } from 'react'
import contacts from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumb, setNewNumb] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [person, setPerson] = useState(null)
  const [message , setMessage] = useState('')
  const [status , setStatus] = useState('')
  

  const syncName = (event) => {
    setNewName(event.target.value)
  }
  const syncNumb = (event) => {
    setNewNumb(event.target.value)
  }
  const syncFilter = (event) => {
    setNewFilter(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault() 
    const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())

    if ( person && person.number !== newNumb){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)){
        const updatedPerson = {name:person.name,number:newNumb}
        contacts
        .update(person.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => {
          return person.name === returnedPerson.name ? returnedPerson : person
        }))
        setNewNumb('')
        setNewName('')
        setPerson(returnedPerson)
        setMessage("updated")
        setStatus('success')
        setTimeout(() => {
          setPerson(null)
        }, 4000);
      })

      }
      return
    } else if (person){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumb('')
      return
    }

    contacts.create({newName, newNumb})
    .then(contact => {
      setPersons(persons.concat([contact]))
      setNewName('')
      setNewNumb('')
      setPerson(contact)
      setMessage("added")
      setStatus('success')
      setTimeout(() => {
        setPerson(null)
      }, 4000);
    })
  }
  const handleDelete = (person, index) =>{

    if(window.confirm(`Delete ${person.name} ?`)){
      const copyPersons = [...persons]
      contacts
      .erase(person.id)
      .then(() => {
        copyPersons.splice(index, 1)
        setPersons(copyPersons)
      })
      .catch(() => {
        setMessage("was already deleted from database, getting update...")
        setStatus('error')
        setPerson(person)
        contacts
        .get()
        .then(returnedPersons => {
          setPersons(returnedPersons)
          setTimeout(() => {
            setPerson(null)
          }, 4000);
        })
  })}}

  useEffect(() => {
    contacts
    .get()
    .then(persons => setPersons(persons))
  },[])

  return (
    <div>
      <Notification  person={person} message={message} status={status}/>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} syncFilter={syncFilter} />
      <h2>Add new contact</h2>
      <PersonForm newName={newName} newNumb={newNumb} syncName={syncName} syncNumb={syncNumb} handleclick={handleSubmit}/>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} handleDelete={handleDelete} />
    </div>
  )
}

const Filter = ({newFilter, syncFilter}) => {
  return <div>filter shown with : <input value={newFilter} onChange={syncFilter}/></div>
}

const PersonForm = ({newName, newNumb, syncName, syncNumb, handleclick}) => {
  return (
    <form>
      <div>name: <input value={newName} onChange={syncName}/></div>
      <div>number: <input value={newNumb} onChange={syncNumb}/></div>
      <div>
        <button onClick={handleclick}>add</button>
      </div>
    </form>
  )
}

const Persons = ({persons, newFilter, handleDelete}) => {
  return persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  .map((person, index) => (<p key={person.id}>
                            <span>{person.name} {person.number}</span> 
                            <button type="submit" onClick={() => handleDelete(person, index)}>delete</button>
                          </p>))
}

const Notification = ({person, message, status}) =>{
  if(person === null) {
   return null
  } else {
   return <div className={status}>{person.name} : {message}</div>
  }
}





export default App