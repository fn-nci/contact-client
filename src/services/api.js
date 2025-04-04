import axios from 'axios';

// declare & initialize var for the api
const API_BASE_URL = 'https://34.241.85.158:8444'; //changed 

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
      const response = await axios.post(`${API_BASE_URL}/contacts`, contactData, { ////http post request passing the contactData parameter
        withCredentials: true
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
      const response = await axios.delete(`${API_BASE_URL}/contacts/${contactId}`, {
        withCredentials: true // send cookies for CSRF token
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
      const response = await axios.put(`${API_BASE_URL}/contacts/${contactId}`, contactData, {
        withCredentials: true // send cookies for CSRF token
      });
      return response.data;
    } catch (error) {
      console.error("Error updating contact:", error);
      throw error;
    }
  }
};

export default api; 