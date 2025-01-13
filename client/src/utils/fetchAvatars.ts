const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Function to fetch avatars for given members
export const fetchAvatars = async (members: { character: { name: string } }[]) => {
  try {
    // Construct the API endpoint URL
    const response = await fetch(`${API_URL}/api/guild/fetchAvatars`, {
      method: 'POST', // Use POST method for the request
      headers: {
        'Content-Type': 'application/json', // Set the request content type to JSON
      },
      body: JSON.stringify({ members }), // Send the members data in the request body
    });

    // Check if the response status is not OK (200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); // Throw an error if the response status is not OK
    }

    // Parse the response data as JSON
    const data = await response.json();
    return data; // Return the parsed data
  } catch (error) {
    console.error('Error fetching avatars:', error); // Log any errors that occur during the fetch
    throw error; // Rethrow the error to be handled by the caller
  }
};