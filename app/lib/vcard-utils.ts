"use server"

import { ContactInfo } from './definitions';

export async function photoUrlToBase64(photoUrl: string): Promise<string> {
  try {
    const response = await fetch(photoUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString('base64');
    
    return base64String;
  } catch (error) {
    console.error('Error converting photo URL to base64:', error);
    throw error;
  }
}

export async function transformVcardSingle(contact: ContactInfo): Promise<string> {
  const { 
    firstName, 
    lastName, 
    title, 
    email, 
    phoneNumber, 
    cellPhoneNumber, 
    addressGeo,
    addressStreetNumber,
    addressStreetName,
    addressCity,
    addressState,
    addressPostcode,
    addressCountry,
    birthdayFormatted, 
    photoUrl 
  } = contact;

  const photoBase64 = await photoUrlToBase64(photoUrl);

  return `BEGIN:VCARD
VERSION:3.0
FN:${firstName} ${lastName}
N:${lastName};${firstName};;${title};
EMAIL:${email}
TEL;TYPE=HOME,VOICE:${phoneNumber.replace(/[-\s()]/g, '')}
TEL;TYPE=CELL,VOICE:${cellPhoneNumber.replace(/[-\s()]/g, '')}
ADR;TYPE=HOME:;;${addressStreetNumber} ${addressStreetName};${addressCity};${addressState};${addressPostcode};${addressCountry}
GEO:${addressGeo}
BDAY:${birthdayFormatted.replace(/-/g, '')}
PHOTO;ENCODING=b;TYPE=JPEG:${photoBase64}
END:VCARD`
  .trim();
}
