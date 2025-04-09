"use client";

import { useState, useEffect, useCallback } from 'react';
import { ContactCard } from './contact-card';
import { fetchSingleContact } from '../lib/api-utils';
import { ContactInfo } from '../lib/definitions';
import { transformContact } from '../lib/contact-utils';
import { ContactCardSkeleton } from './skeleton';

export function ContactDisplay() {
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadContact = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const apiContact = await fetchSingleContact();
      setContact(transformContact(apiContact));
    } catch (err) {
      console.error('Error fetching contact:', err);
      setError('Error fetching contact information. Please try again later.');
      setContact(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadContact();
  }, [loadContact]);

  const handleNewContact = () => {
    loadContact(); // Re-fetch when button is clicked
  };

  return (
    <>
      {isLoading && <ContactCardSkeleton />}
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {!isLoading && contact && (
        <div className="mb-8">
          <ContactCard contact={contact} />
        </div>
      )}
      {/* Use a button for client-side action */}
      <button
        onClick={handleNewContact}
        disabled={isLoading}
        className="min-w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out disabled:opacity-50"
      >
        {isLoading ? 'Loading...' : 'New Contact'}
      </button>
    </>
  );
}
