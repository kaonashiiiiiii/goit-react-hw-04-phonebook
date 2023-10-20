import { useEffect, useMemo, useRef, useState } from "react";
import { ContactForm, FilterForm, Section, ContactList } from "."

export const App = () => {
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState('')

  const rendersCausedByContacts = useRef(0)

  useEffect(() => {
    if (rendersCausedByContacts.current === 0) {
      const lsContacts = localStorage.getItem('contacts')
      if (lsContacts) {
        setContacts(JSON.parse(lsContacts))
      }
      rendersCausedByContacts.current += 1
    } else {
      localStorage.setItem('contacts', JSON.stringify(contacts))
    }
  }, [contacts])

  function deleteContact (id) {
    setContacts((prevContacts) => {
      return prevContacts.filter(item => item.id !== id)
    })
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }

  function checkContact (contact) {
    const isContantExist = contacts.find(item => item.name === contact.name)
    if (isContantExist) {
      alert (`${contact.name} is already in contacts`)
      return false
    }
    return true
  }

  function addContact (contact) {
    if (!checkContact(contact)) return
    setContacts((prevContacts) => {
      return [...prevContacts, contact]
    })

    localStorage.setItem('contacts', JSON.stringify(contacts))
  }

  const filteredContacts = useMemo(function () {
    if(!filter) return contacts
    return contacts.filter(contact => {
      if (contact.name.toLowerCase().includes(filter)) return true
      return false
    })
  }, [filter, contacts])

  return (
    <div>
      <Section title="Phonebook">
        <ContactForm addContact={addContact}/>
      </Section>
      <Section title="Contacts">
        <FilterForm filter={filter} setFilter={setFilter}/>
        <ContactList contacts={filteredContacts} deleteContact={deleteContact}/>
      </Section>
    </div>
  );
};
