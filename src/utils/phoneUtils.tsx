import parsePhoneNumber, { isValidNumber } from 'libphonenumber-js';

export const validatePhoneNumber = async (code: any, number: string) => {
  // use libphonenumber-js
  // check validate phone number
  try {
    const phoneNumber = await parsePhoneNumber(number, code);
    const isValidate = phoneNumber?.number ? isValidNumber(phoneNumber.number) : false;

    return isValidate;
  } catch (error) {

  }
};


export const getPhoneNumber = async (code: any, number: string) => {
  // use libphonenumber-js
  // check validate phone number
  try {
    const phoneNumber = await parsePhoneNumber(number, code);

    return phoneNumber?.number?.toString() || '';
  } catch (error) {

  }

};
export const getInfoPhoneNumber = async (phone: string) => {
  // use libphonenumber-js
  //   get info phone number from string
  try {
    const phoneNumber = parsePhoneNumber(phone, 'VN');
    return {
      full_phone: phoneNumber?.number?.toString() || '',
      country: phoneNumber?.country || '',
      code: phoneNumber?.countryCallingCode || '',
      number: phoneNumber?.nationalNumber || '',
    };
  } catch (error) {
    console.log({ error });

  }

};
