export const MAPS_API_KEY = 'e229690a-f2a0-4915-b43d-b79e90b62832';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


export const validatePassword = (password: string): boolean => {
  return password.length >= 7;
};

export const validateName = (name: string): boolean => {
  return name.length > 0;
};


export const getFileExtension = (uri: string) => {
  // Extract file extension from URI
  return uri.split('.').pop();
};


export const ellipsis = (str: string, length: number) => {
  return str.length > length ? str.substring(0, length) + '...' : str;
}