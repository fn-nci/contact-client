import axios from 'axios';

// A utility to help debug CSRF issues from the browser console
export const testCSRF = async () => {
  console.log('=== CSRF Token Test Utility ===');
  console.log('Starting CSRF token test...');
  
  try {
    // 1. Log current cookies
    console.log('Current cookies:', document.cookie);
    
    // 2. Make GET request to ensure we get the latest CSRF token
    console.log('Step 1: Making GET request to get fresh CSRF token...');
    const getResponse = await axios.get('https://34.241.85.158:8444/contacts', {
      withCredentials: true
    });
    console.log('GET request successful:', getResponse.status);
    console.log('Cookies after GET:', document.cookie);
    
    // 3. Parse cookies to extract the CSRF token
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const parts = cookie.trim().split('=');
      if (parts.length === 2) {
        acc[parts[0]] = parts[1];
      }
      return acc;
    }, {});
    
    console.log('Parsed cookies:', cookies);
    
    // 4. Try all possible CSRF token names
    const possibleTokens = {
      '_csrf': cookies['_csrf'],
      'XSRF-TOKEN': cookies['XSRF-TOKEN'],
      'csrf-token': cookies['csrf-token']
    };
    
    console.log('Possible CSRF tokens:', possibleTokens);
    
    // 5. Choose the best token
    const csrfToken = cookies['_csrf'] || cookies['XSRF-TOKEN'] || cookies['csrf-token'] || '';
    console.log('Using CSRF token:', csrfToken);
    
    if (!csrfToken) {
      console.error('No CSRF token found in cookies!');
      console.log('You may need to check if the server is properly setting the CSRF cookie.');
      return;
    }
    
    // 6. Create test data for a POST request
    const testData = {
      firstname: 'CSRF',
      lastname: 'Test',
      email: 'csrf.test@example.com'
    };
    
    // 7. Set up headers to try multiple CSRF header formats
    const headers = {
      'X-CSRF-Token': csrfToken,
      'X-XSRF-TOKEN': csrfToken,
      'csrf-token': csrfToken
    };
    
    console.log('Step 2: Making POST request with CSRF token in headers...');
    console.log('Using headers:', headers);
    
    // 8. Make a POST request with the CSRF token
    const postResponse = await axios.post('https://34.241.85.158:8444/contacts', testData, {
      withCredentials: true,
      headers: headers
    });
    
    console.log('POST request successful!', postResponse.status);
    console.log('Created test contact:', postResponse.data);
    
    // 9. Try updating the new contact
    const newContactId = postResponse.data.id;
    console.log('Step 3: Testing PUT request with contact ID:', newContactId);
    
    const updatedData = {
      ...testData,
      lastname: 'TestUpdated'
    };
    
    const putResponse = await axios.put(`https://34.241.85.158:8444/contacts/${newContactId}`, updatedData, {
      withCredentials: true,
      headers: headers
    });
    
    console.log('PUT request successful!', putResponse.status);
    console.log('Updated test contact:', putResponse.data);
    
    // 10. Clean up by deleting the test contact
    console.log('Step 4: Cleaning up with DELETE request...');
    
    const deleteResponse = await axios.delete(`https://34.241.85.158:8444/contacts/${newContactId}`, {
      withCredentials: true,
      headers: headers
    });
    
    console.log('DELETE request successful!', deleteResponse.status);
    console.log('Test contact deleted');
    
    console.log('=== CSRF Test Completed Successfully! ===');
    return true;
  } catch (error) {
    console.error('CSRF Test Error:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      console.error('Response headers:', error.response.headers);
    }
    return false;
  }
};

// Export the function so it can be called from the browser console
window.testCSRF = testCSRF;

export default { testCSRF }; 