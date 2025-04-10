export type ApiContactInfo = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  phone: string;
  cell: string;
  dob: {
    date: string;
    age: number;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
};

export type ContactInfo = {
  firstName: string;
  lastName: string;
  title: string;
  gender: string;
  email: string;
  phoneNumber: string;
  cellPhoneNumber: string;
  addressFull: string;
  addressGeo: string;
  addressStreetNumber: string;
  addressStreetName: string;
  addressCity: string;
  addressState: string;
  addressPostcode: string;
  addressCountry: string;
  birthday: string;
  birthdayFormatted: string; // YYYY-MM-DD format
  photoUrl: string;
};
