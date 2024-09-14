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
