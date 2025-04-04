import axios from 'axios';

// declare & initialize var for the api
const API_BASE_URL = 'https://34.241.85.158:8444'; //changed 

// Function to get CSRF token from cookies
const getCSRFToken = () => {
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split('=');
    acc[name] = value;
    return acc;
  }, {});
  
  return cookies['XSRF-TOKEN'] || cookies['_csrf'] || '';
};

const api = {
  //async function getAllContacts to retrieve the contacts from the backend
  getAllContacts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/contacts`, { //http get request to the api
          withCredentials: true // send cookies
      });
      return response.data; // if request is successful, the method will return the data from the response
    } catch (error) { // catching errors
      console.error("Error fetching contacts:", error); // logs the error message to the console
      throw error;
    }
  },
  
  // asyn function addContact accepting contactData as a parameter
  addContact: async (contactData) => {
    try {
      const csrfToken = getCSRFToken();
      const response = await axios.post(`${API_BASE_URL}/contacts`, contactData, { 
        withCredentials: true,
        headers: {
          'X-CSRF-Token': csrfToken,
          'X-XSRF-TOKEN': csrfToken
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error adding contact:", error);
      throw error;
    }
  },
  
  // asyn function deleteContact accepting contactId as a parameter
  deleteContact: async (contactId) => {
    try {
      const csrfToken = getCSRFToken();
      console.log('Using CSRF token for delete:', csrfToken);
      
      const response = await axios.delete(`${API_BASE_URL}/contacts/${contactId}`, {
        withCredentials: true,
        headers: {
          'X-CSRF-Token': csrfToken,
          'X-XSRF-TOKEN': csrfToken
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting contact:", error);
      throw error;
    }
  },
  
  // asyn function updateContact accepting 2 parameters - contactId and contactData
  updateContact: async (contactId, contactData) => {
    try {
      const csrfToken = getCSRFToken();
      console.log('Using CSRF token for update:', csrfToken);
      
      const response = await axios.put(`${API_BASE_URL}/contacts/${contactId}`, contactData, {
        withCredentials: true,
        headers: {
          'X-CSRF-Token': csrfToken,
          'X-XSRF-TOKEN': csrfToken
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error updating contact:", error);
      throw error;
    }
  }
};

export default api; 