import '../../styles/style.css'; // importing css
import Card from '../UI/Card'; // importing card
import Button from '../UI/Button'; // importing button

// component that displays a list of contacts.
const ContactList = (props) => {
  // check if data is still loading, show a loading spinner if true.
  if (props.loading) {
    return (
      <Card>
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading contacts...</p>
        </div>
      </Card>
    );
  }

  // check if error occurred, show error msg if it exists
  if (props.error) {
    return (
      <Card>
        <div className="error">
          <p>{props.error}</p>
        </div>
      </Card>
    );
  }

  // check if contact list is empty.
  if (props.contacts.length === 0) {
    return (
      <Card>
        <div className="empty">
          <p>You haven't entered any contacts yet. Add your first contact using the form above.</p>
        </div>
      </Card>
    );
  }

  // show the list of contacts if data is successfully loaded
  return (
    <div className="contactListWrapper">
      <h2 className="title">Your Contacts</h2>
      
      <div className="contactList">
        {props.contacts.map((contact) => (
          <Card key={contact.id} className="contactCard">
            <div className="contactInfo">
              <h3 className="contactName">{contact.firstname} {contact.lastname}</h3>
              <p className="contactEmail">{contact.email}</p>
              
              {/* display phone numbers if either mobile or homephone exists */}
              {(contact.homephone || contact.mobile) && (
                <div className="phoneNumbers">
                  {contact.mobile && (
                    <p className="phone">
                      <span className="phoneLabel">Mobile:</span> {contact.mobile}
                    </p>
                  )}
                  
                  {contact.homephone && (
                    <p className="phone">
                      <span className="phoneLabel">Home:</span> {contact.homephone}
                    </p>
                  )}
                </div>
              )}
              
              {/* display address if it exists */}
              {contact.address && (
                <p className="address">
                  <span className="addressLabel">Address:</span> {contact.address}
                </p>
              )}
              
              {/* display birthday if it exists */}
              {contact.birthday && (
                <p className="birthday">
                  <span className="birthdayLabel">Birthday:</span> {new Date(contact.birthday).toLocaleDateString()}
                </p>
              )}
            </div>
            
            <div className="contactActions">
              <Button 
                variant="secondary" 
                onClick={() => props.onEdit(contact)}
              >
                Edit
              </Button>
              <Button 
                variant="danger" 
                onClick={() => props.onDelete(contact.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContactList; 
