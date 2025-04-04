import axios from 'axios';

// API base URL
const API_BASE_URL = 'https://34.241.85.158:8444';

// Function to get CSRF token from the XSRF-TOKEN cookie
const getCSRFToken = () => {
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split('=');
    acc[name] = value;
    return acc;
  }, {});
  return cookies['XSRF-TOKEN'];
};

// Create an API client with default configurations
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true // Important for cookies
});

// Add request interceptor to automatically add CSRF token to all requests
apiClient.interceptors.request.use(config => {
  // Get CSRF token from cookie
  const csrfToken = getCSRFToken();
  // If token exists, add it to the headers
  if (csrfToken) {
    config.headers['CSRF-Token'] = csrfToken;
  }
  return config;
});

const api = {
  // Get all contacts
  getAllContacts: async () => {
    try {
      const response = await apiClient.get('/contacts');
      return response.data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  },
  
  // Add a new contact
  addContact: async (contactData) => {
    try {
      const response = await apiClient.post('/contacts', contactData);
      return response.data;
    } catch (error) {
      console.error("Error adding contact:", error);
      throw error;
    }
  },
  
  // Delete a contact
  deleteContact: async (contactId) => {
    try {
      const response = await apiClient.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting contact:", error);
      throw error;
    }
  },
  
  // Update a contact
  updateContact: async (contactId, contactData) => {
    try {
      const response = await apiClient.put(`/contacts/${contactId}`, contactData);
      return response.data;
    } catch (error) {
      console.error("Error updating contact:", error);
      throw error;
    }
  },
  
  // Get CSRF token directly from the server (alternative method)
  fetchCSRFToken: async () => {
    try {
      const response = await apiClient.get('/csrf-token');
      return response.data.csrfToken;
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
      throw error;
    }
  }
};

export default api; 