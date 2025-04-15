"use client";

import { useState, useEffect, useCallback } from 'react';
import { ContactCard } from './contact-card';
import { fetchMultipleContacts } from '../lib/api-utils';
import { ContactInfo } from '../lib/definitions';
import { transformContacts } from '../lib/contact-utils';
import { ContactCardSkeleton } from './skeleton';
import { transformVcardMulti } from '../lib/vcard-utils';

export function ContactDisplayMulti() {
  const [contacts, setContacts] = useState<ContactInfo[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contactCount, setContactCount] = useState(5); // Default to 5 contacts
  const [inputValue, setInputValue] = useState<string>(String(contactCount));

  const loadContacts = useCallback(async () => {
    console.debug(`Loading ${contactCount} contacts...`); // Log the count being used
    setIsLoading(true);
    setError(null);
    try {
      const apiContacts = await fetchMultipleContacts(contactCount);
      setContacts(transformContacts(apiContacts));
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('Error fetching contact informations. Please try again later.');
      setContacts(null);
    } finally {
      setIsLoading(false);
    }
  }, [contactCount]);

  async function downloadVcardMulti(contacts: ContactInfo[]) {
    try {
      const vCardDatas = await transformVcardMulti(contacts);
      const blob = new Blob([vCardDatas], { type: 'text/vcard' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contacts_${new Date().toISOString()}.vcf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading VCard:', error);
    }
  }

  // Initial load
  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  // Handler for the "New Contacts" button
  const handleNewContacts = () => {
    // Parse the value from the controlled input state
    let newCount = parseInt(inputValue, 10);

    // Validate the parsed number
    if (newCount < 1 || newCount > 50) {
      alert('Please enter a valid number between 1 and 50.');
      // Reset input to the last valid count
      setInputValue(String(contactCount));
      return;
    } else if (isNaN(newCount)) {
      // If no input, default to 5
      newCount = 5;
    }
    
    // Check if the new count is the same as the current count
    if (newCount === contactCount) {
      // If the count hasn't changed, manually trigger a reload
      loadContacts();
    } else {
      // If the count has changed, update the state.
      // This will trigger the useEffect hook to load contacts.
      setContactCount(newCount);
    }
  };

  // Handler for the download button
  const handleDownloadVcardMulti = () => {
    downloadVcardMulti(contacts!);
  };

  // Handler for input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };


  return (
    <>
      {isLoading && <ContactCardSkeleton />}
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {!isLoading && contacts && (
        <div className="carousel rounded-box carousel-center mb-8 h-150 md:h-100 rounded-lg flex flex-row items-center space-x-2">
          {contacts.map((contact) => (
            <div key={contact.email} className="carousel-item w-[95%] h-full">
              <ContactCard contact={contact} />
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col mb-2">
        <label className="input mb-2 rounded-lg font-bold py-2 px-4 w-full">
          Generate
          <input 
            id="contactCount"
            type="number" 
            className="grow" 
            placeholder="5" 
            min="1"
            max="50"
            step="1"
            value={inputValue} // Controlled input
            onChange={handleInputChange} // Update state on change
            aria-label="Number of contacts to generate"
          />
          Contacts
        </label>
        <div>
          <button
            onClick={handleNewContacts}
            disabled={isLoading}
            className="me-2 mb-2 min-w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'New Contacts'}
          </button>
          <button
            onClick={handleDownloadVcardMulti}
            disabled={isLoading || !contacts || contacts.length === 0}
            className="me-2 mb-2 min-w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out disabled:opacity-50"
          >
            Download all as vCard
          </button>
        </div>
      </div>
      
      
    </>
  );
}
