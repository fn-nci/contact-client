import { useState } from 'react';
import ContactForm from './components/Contact/ContactForm';
import ContactList from './components/Contact/ContactList';
import EditContactModal from './components/Contact/EditContactModal';
import { useContacts } from './hooks/useContacts';
import Container from './components/UI/Container';
import styles from './App.module.css';

function App() {
  //Using the useContact hook, destructing functions and states to use them within the component
  const { 
    contacts, 
    loading, 
    error, 
    addContact, 
    deleteContact, 
    updateContact 
  } = useContacts();
  
  const [editingContact, setEditingContact] = useState(null); // state tracking if the contact is edited

  //using event handler handleAddcontact that accepts contactData
  const handleAddContact = async (contactData) => {
    try {
      await addContact(contactData); // call the addContact function from useContacts.js 
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };


  ////using event handler handleDeleteContact that accepts contactId param
  const handleDeleteContact = async (contactId) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await deleteContact(contactId); // call the deleteContact function from useContacts.js 
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  // setting the contact to be edited 
  const handleEditContact = (contact) => {
    setEditingContact(contact); // contact shown in an edit form
  };

  //funtion to save the changes
  const handleSaveEdit = async (contactId, updatedContactData) => {
    try {
      await updateContact(contactId, updatedContactData); // calling the function
      setEditingContact(null);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  //close the edit modal
  const handleCloseEditModal = () => {
    setEditingContact(null); // resets the editing state
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <Container>
          <h1 className={styles.title}>Contact Manager</h1>
        </Container>
      </header>
      
      <main className={styles.main}>
        <Container>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Add New Contact</h2>
            <ContactForm onSubmit={handleAddContact} />
          </section>
          
          <section className={styles.section}>
            <ContactList 
              contacts={contacts}
              loading={loading}
              error={error}
              onDelete={handleDeleteContact}
              onEdit={handleEditContact}
            />
          </section>
        </Container>
      </main>
      
      {editingContact && (
        <EditContactModal 
          contact={editingContact}
          onClose={handleCloseEditModal}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}

export default App;
