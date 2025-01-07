import parsePhoneNumber, { isValidNumber } from 'libphonenumber-js';
export const validatePhoneNumber = async (code: string, number: string) => {
  // use libphonenumber-js
  // check validate phone number
  try {
    const phoneNumber = await parsePhoneNumber(number, code);
    const isValidate = isValidNumber(phoneNumber?.number);

    return isValidate;
  } catch (error) {

  }

};

export const getPhoneNumber = async (code: string, number: string) => {
  // use libphonenumber-js
  // check validate phone number
  try {
    const phoneNumber = await parsePhoneNumber(number, code);

    return phoneNumber?.number?.toString() || '';
  } catch (error) {

  }

};
