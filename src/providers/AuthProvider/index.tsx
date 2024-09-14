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
        setUser(prev => ({ ...prev, auth: user }));
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(user?.auth?.uid)
      .onSnapshot(documentSnapshot => {
        // console.log('User data: ', documentSnapshot.data());
        if (documentSnapshot.exists) {
          setUser(prev => ({ ...prev, meta: documentSnapshot.data() }));
        }
      });

    return () => subscriber();
  }, [user?.auth?.uid]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};