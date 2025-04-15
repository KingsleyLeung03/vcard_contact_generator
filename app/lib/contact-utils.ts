import { ApiContactInfo, ContactInfo } from './definitions';

export function transformContact(apiContact: ApiContactInfo): ContactInfo {
  const { name, gender, location, email, phone, cell, dob, picture } = apiContact;

  return {
    firstName: name.first,
    lastName: name.last,
    title: name.title,
    gender,
    email,
    phoneNumber: phone,
    cellPhoneNumber: cell,
    addressFull: `${location.street.number} ${location.street.name}, ${location.city}, ${location.state} ${location.postcode}, ${location.country}`,
    addressGeo: `${location.coordinates.latitude}; ${location.coordinates.longitude}`,
    addressStreetNumber: location.street.number.toString(),
    addressStreetName: location.street.name,
    addressCity: location.city,
    addressState: location.state,
    addressPostcode: location.postcode.toString(),
    addressCountry: location.country,
    birthday: new Date(dob.date).toLocaleDateString(),
    birthdayFormatted: new Date(dob.date).toISOString().split('T')[0], // YYYY-MM-DD format
    photoUrl: picture.large,
  };
}

export function transformContacts(apiContacts: ApiContactInfo[]): ContactInfo[] {
  return apiContacts.map(transformContact);
}