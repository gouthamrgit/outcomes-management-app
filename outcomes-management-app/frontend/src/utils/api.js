const apiUrl = process.env.REACT_APP_API_URL;

export const createOutcome = async (outcome) => {
  try {
    const response = await fetch(`${apiUrl}/api/outcomes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(outcome),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to create outcome:', error);
    throw error;
  }
};

// Add other API request functions as needed