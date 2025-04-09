import { ContactDisplay } from './components/contact-display';

export default async function Page() {

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        vCard Contact Generator
      </h1>
      <ContactDisplay />
    </section>
  );
}