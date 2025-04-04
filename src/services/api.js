import axios from 'axios';

// declare & initialize var for the api
const API_BASE_URL = 'https://34.241.85.158:8444'; //changed 

// Function to get CSRF token from cookies, checking common csurf names
const getCSRFToken = () => {
  // First, check all cookies and log them for debugging
  console.log("All cookies:", document.cookie);
  
  // Try to find the _csrf cookie which is commonly used by csurf middleware
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const parts = cookie.trim().split('=');
    if (parts.length === 2) {
      const name = parts[0];
      const value = parts[1];
      acc[name] = value;
    }
    return acc;
  }, {});
  
  // Log individual cookies for debugging
  console.log("Parsed cookies:", cookies);
  
  // Check multiple possible CSRF token cookie names
  const token = cookies['XSRF-TOKEN'] || cookies['_csrf'] || cookies['csrf-token'] || '';
  console.log("Found CSRF token:", token);
  
  return token;
};

// Create an instance of axios with default settings
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  xsrfCookieName: '_csrf',
  xsrfHeaderName: 'X-CSRF-Token'
});

// Add a request interceptor to handle CSRF tokens
apiClient.interceptors.request.use(config => {
  // Always get fresh token before each request
  const token = getCSRFToken();
  if (token) {
    // Try multiple header formats that csurf might be looking for
    config.headers['X-CSRF-Token'] = token;
    config.headers['X-XSRF-TOKEN'] = token;
    config.headers['csrf-token'] = token;
  }
  return config;
});

const api = {
  // Get contacts first to retrieve CSRF token cookie
  getAllContacts: async () => {
    try {
      const response = await apiClient.get('/contacts');
      return response.data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  },
  
  addContact: async (contactData) => {
    try {
      const response = await apiClient.post('/contacts', contactData);
      return response.data;
    } catch (error) {
      console.error("Error adding contact:", error);
      throw error;
    }
  },
  
  deleteContact: async (contactId) => {
    try {
      console.log(`Deleting contact with ID: ${contactId}`);
      const token = getCSRFToken();
      console.log(`Using CSRF token for delete: ${token}`);
      
      const response = await apiClient.delete(`/contacts/${contactId}`, {
        headers: {
          'X-CSRF-Token': token,
          'X-XSRF-TOKEN': token,
          'csrf-token': token
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting contact:", error);
      throw error;
    }
  },
  
  updateContact: async (contactId, contactData) => {
    try {
      console.log(`Updating contact with ID: ${contactId}`);
      const token = getCSRFToken();
      console.log(`Using CSRF token for update: ${token}`);
      
      const response = await apiClient.put(`/contacts/${contactId}`, contactData, {
        headers: {
          'X-CSRF-Token': token,
          'X-XSRF-TOKEN': token,
          'csrf-token': token
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