import { useEffect, useRef } from 'react'; // import useeffect and useref
import ContactForm from './ContactForm'; // import contactform
import Button from '../UI/Button'; // import button
import '../../styles/style.css'; // importing css

// modal window for editing contacts
const EditContactModal = (props) => {
  const modalRef = useRef(); // creating a reference to the modal element to detect clicks outside of it

//destructuring props object because eslint hates me
const { onClose, onSave, contact } = props;

// useEffect to add event listeners when modal is mounted and clean up when unmounted
  useEffect(() => {
    // to detect clicks outside modal and close it if detected
    const handleClickOutside = (event) => {
      // if modalRef exists and clicked element is not inside modal, trigger onClose function passed via props
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // close modal when there is a click outside  modal
      }
    };
    
    // to detect if 'Esc' key is pressed, closing modal if it has been pressed
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') { // 'Esc' key detected
        onClose(); // close modal
      }
    };
    
    // event listeners to handle clicks outside modal and pushing 'Esc' key
    document.addEventListener('mousedown', handleClickOutside); // mouse click listener
    document.addEventListener('keydown', handleEscapeKey); // keyboard event listener for 'Esc' key

    // prevent the background from scrolling when modal is open.
    document.body.style.overflow = 'hidden';

    //to remove event listeners and re-enable scrolling when component is unmounted
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // remove click listener
      document.removeEventListener('keydown', handleEscapeKey); // remove keydown listener
      document.body.style.overflow = 'auto'; // re-enable scrolling
    };
  }, [onClose]); // dependency array ensures effect runs when `props.onClose` changes.

  //to handle the form submission event.
  const handleSubmit = (updatedContact) => {
    onSave(contact.id, updatedContact); // calls  onSave function with contact ID and updated contact details
  };

  
  return (
    <div className="modalOverlay"> {/* darken the background when modal open */}
      <div ref={modalRef} className="modal"> {/* main content, tied to modalRef for outside-click detection */}
        
        <div className="modalHeader"> {/* header */}
          <h2 className="modalTitle">Edit Contact</h2> {/* title */}
          <button className="closeButton" onClick={onClose}>×</button> {/* close button, calls onClose function */}
        </div>
        
        <div className="modalContent"> {/* content section, containing contact form */}
          <ContactForm 
            initialData={contact} // pre-fill the form fields w initial data
            onSubmit={handleSubmit} // submit updated contact data to parent component via handleSubmit function
            buttonText="Save Changes" // text for the submit button in the form
          />
        </div>
        
        <div className="modalFooter"> {/* footer section of the modal */}
          <Button variant="secondary" onClick={onClose}>Cancel</Button> {/* cancel button to close the modal */}
        </div>
      </div>
    </div>
  );
};

export default EditContactModal; 

