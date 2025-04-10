import Image from 'next/image'

interface ContactInfo {
  firstName: string
  lastName: string
  title: string
  email: string
  phoneNumber: string
  cellPhoneNumber: string
  address: string
  birthday: string
  photoUrl: string
}

export function ContactCard({ contact }: { contact: ContactInfo }) {

  
  return (
    <div className="min-h-80 bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
      <div className="w-32 h-32 rounded-full overflow-hidden">
        <Image
          src={contact.photoUrl}
          alt={`${contact.firstName} ${contact.lastName}`}
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          {contact.firstName} {contact.lastName}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300">{contact.title}</p>
        <div className="mt-4 space-y-2">
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
            Address: {contact.address}
          </p>
          <p className="text-neutral-600 dark:text-neutral-300">
            Birthday: {contact.birthday}
          </p>
        </div>
      </div>
    </div>
  )
}
