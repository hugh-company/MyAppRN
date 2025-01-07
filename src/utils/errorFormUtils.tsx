export const errorFormUtils = (objectError: any, setError: any) => {

  Object.keys(objectError).forEach((field) => {
    const errorMessage = Array.isArray(objectError[field])
      ? objectError[field].join('\n')
      : objectError[field];


    setError(field, { type: 'manual', message: errorMessage });
  });
};
