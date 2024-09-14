import moment from "moment";

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


export const ellipsis = (str?: string, length: number) => {
  if (!str) {
    return '';
  }
  return str.length > length ? str.substring(0, length) + '...' : str;
}

export const formatDate = (date: any) => {
  const now = moment();
  const differenceInMinutes = now.diff(date, 'minutes');

  if (differenceInMinutes < 1) {
    return 'Just now';
  } else if (differenceInMinutes < 60) {
    return `${differenceInMinutes} min ago`;
  } else if (differenceInMinutes < 1440) { // Less than 24 hours (1440 minutes)
    return date.format('h:mm A'); // Example: 3:30 PM
  } else if (differenceInMinutes < 2880) { // Less than 48 hours (2 days)
    return 'Yesterday at ' + date.format('h:mm A'); // Example: Yesterday at 3:30 PM
  } else {
    return date.format('MMMM D [at] h:mm A'); // Example: September 12 at 3:30 PM
  }
};