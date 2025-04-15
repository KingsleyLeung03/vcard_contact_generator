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

  const loadContacts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const apiContacts = await fetchMultipleContacts();
      setContacts(transformContacts(apiContacts));
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('Error fetching contact informations. Please try again later.');
      setContacts(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function downloadVcardMulti(contacts: ContactInfo[]) {
    // console.debug('TODO: Implement the downloadVcardMulti function');
    // throw new Error('TODO: Implement the downloadVcardMulti function');
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

  const handleNewContact = () => {
    loadContacts(); // Re-fetch when button is clicked
  };

  const handleDownloadVcardMulti = () => {
    downloadVcardMulti(contacts!); // Use non-null assertion since we check for null before enabling the button
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
      <button
        onClick={handleNewContact}
        disabled={isLoading}
        className="me-2 mb-2 min-w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out disabled:opacity-50"
      >
        {isLoading ? 'Loading...' : 'New Contacts'}
      </button>
      <button
        onClick={handleDownloadVcardMulti}
        disabled={contacts === null}
        className="me-2 mb-2 min-w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out disabled:opacity-50"
      >
        Download all as vCard
      </button> 
    </>
  );
}
