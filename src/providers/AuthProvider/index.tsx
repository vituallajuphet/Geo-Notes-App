// context/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {

      if (user) {
        firestore().collection('Users').doc(user.uid).get().then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            setUser({auth: user, meta: documentSnapshot.data()});
          }
        });

      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};