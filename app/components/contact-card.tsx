import Image from 'next/image';
import { ContactInfo } from 'app/lib/definitions';

export function ContactCard({ contact }: { contact: ContactInfo }) {
  return (
    <div className="h-150 md:h-100 bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
      <div className="w-32 h-32 rounded-full overflow-hidden">
        <Image
          src={contact.photoUrl}
          alt={`${contact.firstName} ${contact.lastName}'s photo`}
          width={128}
          height={128}
          className="object-cover w-full h-full"
          priority={true}
        />
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          {contact.firstName} {contact.lastName}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300">{contact.title}</p>
        <div className="mt-4 space-y-2">
        <p className="text-neutral-600 dark:text-neutral-300">
            Gender: {contact.gender}
          </p>
          <p className="text-neutral-600 dark:text-neutral-300">
            Email: {contact.email}
          </p>
          <p className="text-neutral-600 dark:text-neutral-300">
            Phone: {contact.phoneNumber}
          </p>
          <p className="text-neutral-600 dark:text-neutral-300">
            Cell: {contact.cellPhoneNumber}
          </p>
          <p className="text-neutral-600 dark:text-neutral-300">
            Address: {contact.addressFull}
          </p>
          <p className="text-neutral-600 dark:text-neutral-300">
            Geographical Location: {contact.addressGeo}
          </p>
          <p className="text-neutral-600 dark:text-neutral-300">
            Birthday: {contact.birthday}
          </p>
        </div>
      </div>
    </div>
  )
}
