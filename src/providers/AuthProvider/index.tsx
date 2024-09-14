// context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AppContext } from '../AppProvider';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const { send } = useContext(AppContext);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(prev => ({ ...prev, auth: user }));
      } else {
        setUser(null);
        send(prev => ({ ...prev, notes: [] }));
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(user?.auth?.uid)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUser(prev => ({ ...prev, meta: documentSnapshot.data() }));
        }
      });

    return () => subscriber();
  }, [user?.auth?.uid]);

  useEffect(() => {
    const subscriber = firestore()
      .collection(`Users/${user?.auth?.uid}/notes`)
      .orderBy('date', 'desc')
      .onSnapshot(documentSnapshot => {
        const data = documentSnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        });
        if (data.length) {
          send(prev => ({ ...prev, notes: data }));
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