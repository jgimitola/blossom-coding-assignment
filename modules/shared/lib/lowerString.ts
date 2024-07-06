const lowerString = (incomingValue: unknown) => {
  if (typeof incomingValue === 'string') {
    return incomingValue.toLowerCase();
  }
  return null;
};

export default lowerString;
