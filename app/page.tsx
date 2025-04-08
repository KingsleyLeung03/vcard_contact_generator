import { ContactCard } from './components/contact-card';
import { fetchSingleContact } from './lib/api-utils';
import { ContactInfo } from './lib/definitions';
import { transformContact } from './lib/contact-utils';
import Link from 'next/link';

export default async function Page() {
  let contact: ContactInfo | null = null;
  let error: string | null = null;

  try {
    const apiContact = await fetchSingleContact();
    contact = transformContact(apiContact);
  } catch (err) {
    console.error('Error fetching contact:', err);
    error = 'Error fetching contact information. Please try again later.';
  }

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        vCard Contact Generator
      </h1>
      {error ? (
        <div className="mb-4 text-red-500">{error}</div>
      ) : contact ? (
        <div className="mb-8">
          <ContactCard contact={contact} />
        </div>
      ) : null}
      <Link
        href="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out"
      >
        New Contact
      </Link>
    </section>
  );
}