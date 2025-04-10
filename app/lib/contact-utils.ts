import { ApiContactInfo, ContactInfo } from './definitions';

export function transformContact(apiContact: ApiContactInfo): ContactInfo {
  const { name, location, email, phone, cell, dob, picture } = apiContact;

  return {
    firstName: name.first,
    lastName: name.last,
    title: name.title,
    email,
    phoneNumber: phone,
    cellPhoneNumber: cell,
    address: `${location.street.number} ${location.street.name}, ${location.city}, ${location.state} ${location.postcode}, ${location.country}`,
    birthday: new Date(dob.date).toLocaleDateString(),
    photoUrl: picture.large,
  };
}
