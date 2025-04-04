import { useState } from 'react';
import ContactForm from './components/Contact/ContactForm';
import ContactList from './components/Contact/ContactList';
import EditContactModal from './components/Contact/EditContactModal';
import { useContacts } from './hooks/useContacts';
import Container from './components/UI/Container';
import styles from './App.module.css';

function App() {
  // Get contacts and contact-related functions from the custom hook
  const { 
    contacts, 
    loading, 
    error, 
    addContact, 
    deleteContact, 
    updateContact 
  } = useContacts();
  
  // State for tracking which contact is being edited
  const [editingContact, setEditingContact] = useState(null);

  // Handler for adding a new contact
  const handleAddContact = async (contactData) => {
    try {
      await addContact(contactData);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  // Handler for deleting an existing contact
  const handleDeleteContact = async (contactId) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await deleteContact(contactId);
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  // Set the contact to be edited
  const handleEditContact = (contact) => {
    setEditingContact(contact);
  };

  // Handler for saving edited contact data
  const handleSaveEdit = async (contactId, updatedContactData) => {
    try {
      await updateContact(contactId, updatedContactData);
      setEditingContact(null);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  // Close the edit modal
  const handleCloseEditModal = () => {
    setEditingContact(null);
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
