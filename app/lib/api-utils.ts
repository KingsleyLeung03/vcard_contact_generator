import { ApiContactInfo } from './definitions';

export async function fetchSingleContact(): Promise<ApiContactInfo> {
  const apiUrl = 'https://randomuser.me/api/1.4';

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error('No results found in the API response.');
    }

    return data.results[0]; // Return the first contact
  } catch (error) {
    console.error('Error fetching contact:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

export async function fetchMultipleContacts(contactCount: number = 5): Promise<ApiContactInfo[]> {
  const apiUrl = `https://randomuser.me/api/1.4?results=${contactCount}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error('No results found in the API response.');
    }

    if (data.results.length !== contactCount) {
      console.warn(`Expected ${contactCount} contacts, but received ${data.results.length}.`);
    }

    return data.results; // Return the array of contacts
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}
