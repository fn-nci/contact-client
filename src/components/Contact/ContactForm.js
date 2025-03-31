import { useState } from 'react';  //importing useState hook to manage state
import Button from '../UI/Button'; // importing button component
import Card from '../UI/Card'; //importing card to wrap form
import '../../styles/style.css'; // importing css

const ContactForm = (props) => {  //contact form component
  // access buttonText from props, set default value for buttonText
  const { buttonText = 'Add Contact' } = props;
  //useState hook to manage form field state - default values passed from initialData if available, otherwise default to empty string
  // using ?. optional chaining to prevent errors if initialData undefined - had to look this one up when I got errors https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  const [contact, setContact] = useState({
    firstname: props.initialData?.firstname || '',
    lastname: props.initialData?.lastname || '',
    email: props.initialData?.email || '',
    homephone: props.initialData?.homephone || '',
    mobile: props.initialData?.mobile || '',
    address: props.initialData?.address || '',
    birthday: props.initialData?.birthday || '',
  });

  //for form validation errors
  const [errors, setErrors] = useState({});

  //validation function to check if fields are filled out correctly
  const validate = () => {
    const newErrors = {}; //create object to store validation errors

    //check for required fields, and return error msg if the fields are empty or invalid
    if (!contact.firstname.trim()) newErrors.firstname = 'First name is required';  //access the firstname part of the contact state object, remove leading/trailing whitespace characters
    if (!contact.lastname.trim()) newErrors.lastname = 'Last name is required';  //will return "" if name is empty or just whitespace, the ! operator will turn it to true and trigger error
    if (!contact.email.trim()) {
      newErrors.email = 'Email is required';  //if email field left empty
    } else if (!/\S+@\S+\.\S+/.test(contact.email)) {  //email format validation (\s+ address must start w at least 1 non-whitespace character, then @, then 1 or more non-whitespace chars, then . followed by 1 or more non-whitespace chars for the dom ext)
      newErrors.email = 'Email address is invalid'; //if email doesn't match valid format
    }

    return newErrors;  //return validation errors if any are found
  };
  //to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact, //using spread to keep the other values updating the changed field
      [name]: value,  //update the state with the new value
    });

    // if there's an error for the field being typed in, clear it when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null //remove the error message for the field
      });
    }
  };

  //to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    //validate the form data
    const validationErrors = validate();

    //if a validation error is found, set the errors state and return 
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    //if no validation errors are found, call the onSubmit function 
    props.onSubmit(contact);

    //if the form is for adding a new contact (not for editing), clear the form fields after submission
    //check if initialData.id exists to determine if editing or adding contact
    if (!props.initialData?.id) {  //using ? optional chaining again due to errors after submitting new contact
      setContact({
        firstname: '',
        lastname: '',
        email: '',
        homephone: '',
        mobile: '',
        address: '',
        birthday: '',
      });
    }
  };

  return (
    <Card> {/* the wrapper for the form */}
      <form onSubmit={handleSubmit} className="form"> {/* form element that triggers handleSubmit on submit */}
        <div className="formGroup"> {/* wrapper for each form field, accessing .formGroup styling */}
          <label htmlFor="firstname" className="label">First Name*</label>  {/* 'htmlFor' to associate label with correct input field, '*' to show field is required */}
          <input
            id="firstname"  // ties this input to the label through the 'htmlFor' attribute in the label above 
            type="text"  //specifies that this is a text input field
            name="firstname"  //name of the input field, which is used in the form submission and when setting the state
            value={contact.firstname}  //ties the input value to the state 'contact.firstname', so it reflects the current state
            onChange={handleChange}  // ties the input to the `handleChange` function, which updates the state when the user types into the input field
            className={`input ${errors.firstname ? 'inputError' : ''}`}  // error styling using .inputError if needed with red border, otherwise use the .labels styling
          />
          {errors.firstname && <p className="errorText">{errors.firstname}</p>}  {/* if there's an error, show error msg */}
        </div>

        {/* div for last name */}
        <div className="formGroup">
          <label htmlFor="lastname" className="label">Last Name*</label>
          <input
            id="lastname"
            type="text"
            name="lastname"
            value={contact.lastname}
            onChange={handleChange}
            className={`input ${errors.lastname ? 'inputError' : ''}`}
          />
          {errors.lastname && <p className="errorText">{errors.lastname}</p>}
        </div>

        {/* div for email */}
        <div className="formGroup">
          <label htmlFor="email" className="label">Email*</label>
          <input
            id="email"
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            className={`input ${errors.email ? 'inputError' : ''}`}
          />
          {errors.email && <p className="errorText">{errors.email}</p>}
        </div>

        {/* div for home phone */}
        <div className="formRow">
          <div className="formGroup">
            <label htmlFor="homephone" className="label">Home Phone</label>
            <input
              id="homephone"
              type="tel"
              name="homephone"
              value={contact.homephone}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* div for mobile */}
          <div className="formGroup">
            <label htmlFor="mobile" className="label">Mobile Phone</label>
            <input
              id="mobile"
              type="tel"
              name="mobile"
              value={contact.mobile}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        {/* div for address */}
        <div className="formGroup">
          <label htmlFor="address" className="label">Address</label>
          <input
            id="address"
            type="text"
            name="address"
            value={contact.address}
            onChange={handleChange}
            className="input"
          />
        </div>

        {/* div for birthday */}
        <div className="formGroup">
          <label htmlFor="birthday" className="label">Birthday</label>
          <input
            id="birthday"
            type="date"
            name="birthday"
            value={contact.birthday}
            onChange={handleChange}
            className="input"
          />
        </div>
        
        <div className="formActions">  {/* container for submit button */}
          <Button type="submit" variant="primary">{buttonText}</Button> {/* submit button with dynamic text */}
        </div>
      </form>
    </Card>  // end of the wrapper for the form 
  );
};

export default ContactForm;
