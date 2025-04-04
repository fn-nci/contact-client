import '../../styles/style.css'; // importing css
import Card from '../UI/Card'; // importing card
import Button from '../UI/Button'; // importing button

// component that displays a list of contacts.
const ContactList = (props) => {
  // check if data is still loading, show a loading spinner if true.
  if (props.loading) {
    return (
      <Card> {/* wrap loading message in a styled card component. */}
        <div className="loading"> {/* style from css */}
          <div className="spinner"></div> {/* placeholder for loading spinner animation. */}
          <p>Loading contacts...</p> {/* show msg for users while data is loading. */}
        </div>
      </Card>
    );
  }

  // check if  error occurred, show error msg if it exists
  if (props.error) {
    return (
      <Card>
        <div className="error"> {/* css error styling */}
          <p>{props.error}</p> {/* show error msg accessed through props */}
        </div>
      </Card>
    );
  }

  // check if contact list is empty.
  if (props.contacts.length === 0) {
    return (
      <Card>
        <div className="empty"> {/* show empty msg if no contacts are found */}
          <p>You haven't entered any contacts yet. Add your first contact using the form above.</p>
        </div>
      </Card>
    );
  }

  // show the list of contacts if data is successfully loaded
  return (
    <div className="contactListWrapper"> {/* wpper for styling the contact list */}
      <h2 className="title">Your Contacts</h2> {/* section title with css style */}
      
      <div className="contactList"> {/* div container for the list of individual contact cards. */}
        {props.contacts.map((contact) => ( // using map to iterate over the contacts array to display each contact
          
          <Card key={contact.id} className="contactCard"> {/* individual contact card */}
            
            <div className="contactInfo"> {/* div section for displaying contact details */}
              <h3 className="contactName">{contact.firstname} {contact.lastname}</h3> {/* first and last name of contact */}
              <p className="contactEmail">{contact.email}</p> {/* email address of contact */}
              
              {/* display phone numbers if either mobile or homephone exists - not required */}
              {(contact.homephone || contact.mobile) && (
                <div className="phoneNumbers"> {/* div container for phone numbers */}
                  
                  {contact.mobile && ( // mobile phone if provided
                    <p className="phone">
                      <span className="phoneLabel">Mobile:</span> {contact.mobile}
                    </p>
                  )}
                  
                  {contact.homephone && ( // home phone if provided
                    <p className="phone">
                      <span className="phoneLabel">Home:</span> {contact.homephone}
                    </p>
                  )}
                </div>
              )}
              
              {/* display address if it exists - not required */}
              {contact.address && (
                <p className="address">
                  <span className="addressLabel">Address:</span> {contact.address}
                </p>
              )}
              
              {/* display birthday if it exists - not required */}
              {contact.birthday && (
                <p className="birthday">
                  <span className="birthdayLabel">Birthday:</span> {new Date(contact.birthday).toLocaleDateString()} {/* Displaying formatted birthday. */}
                </p>
              )}
            </div>
            
            {/* div section for contact-specific actions - editing and deleting */}
            <div className="contactActions"> 
              <Button 
                variant="secondary" 
                onClick={function() { props.onEdit(contact); }} // to handle edit action by calling onEdit function with the contact as argument
              >
                Edit
              </Button>
              <Button 
                variant="danger" 
                onClick={function() { props.onDelete(contact.id); }} // to handle delete action by calling onDelete function with the contact ID
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
