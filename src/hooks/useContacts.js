// logic behind retrieving the data and managing the state of the data
import { useState, useEffect } from 'react';
import api from '../services/api'; // importing api.js

export function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // retrieving all the contacts from the backend
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await api.getAllContacts();// calling the getAllContacts function 
      setContacts(data); // update the state with the retrieved data
      setError(null); // clear previous errors 
    } catch (err) {
      setError('Failed to fetch contacts. Please try again later.'); // handle errors
      console.error(err);
    } finally {
      setLoading(false); // stop the loading once the requet is finished
    }
  };

  useEffect(() => {
    fetchContacts(); // calling the function 
  }, []); // runs only once

  const addContact = async (contactData) => {
    try {
      const newContact = await api.addContact(contactData); // calling the addContact function
      setContacts(prev => [...prev, newContact]); // updating the contacts with the new contact
      return newContact; // returns the newly added contact data
    } catch (err) {
      setError('Failed to add contact. Please try again.');
      throw err;
    }
  };

  const deleteContact = async (contactId) => {
    try {
      await api.deleteContact(contactId); // calling the deleteContact function
      setContacts(prev => prev.filter(contact => contact.id !== contactId)); // filter method used to iterate and exclude the matching contactId
    } catch (err) {
      setError('Failed to delete contact. Please try again.');
      throw err;
    }
  };

  const updateContact = async (contactId, contactData) => {
    try {
      const updatedContact = await api.updateContact(contactId, contactData); // caling the updateContact function
      // updating the contact list with the updated contact
      setContacts(prev => 
        prev.map(contact => 
          contact.id === contactId ? updatedContact : contact
        )
      );
      return updatedContact;
    } catch (err) {
      setError('Failed to update contact. Please try again.');
      throw err;
    }
  };

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    addContact,
    deleteContact,
    updateContact
  };
} 