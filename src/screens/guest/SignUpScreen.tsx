import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {validateEmail, validatePassword} from '../../utils';
import _ from 'lodash';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = props => {
  const tw = useTailwind();
  const nav = useNavigation();

  const [email, setEmail] = React.useState('');
  const [fullname, setFullname] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState({
    email: '',
    password: '',
  });

  const isKeyboardVisible = useKeyboard();

  const handleChangeEmail = (text: string) => {
    setEmail(text);
    if (!validateEmail(text)) {
      setError({...error, email: 'Invalid Email Address'});
    } else {
      setError({...error, email: ''});
    }
  };

  const handleChangePassword = (text: string) => {
    setPassword(text);
    if (!validatePassword(text)) {
      setError({...error, password: 'Invalid Password, At least 7 characters'});
    } else {
      setError({...error, password: ''});
    }
  };

  const handleSubmit = () => {
    auth()
      .createUserWithEmailAndPassword(
        email,
        password,
      )
      .then((res) => {
        firestore()
        .collection('Users')
        .doc(res.user.uid)
        .set({
          name: fullname,
          age: 30,
        })
        .then(() => {
          console.log('User added!');
        });
      })
      .catch(error => {
        
        console.error(error);
      });
  };


  return (
    <KeyboardAvoidingView
      style={tw('flex-1 bg-white dark:bg-slate-800 ')}
      behavior="padding"
      keyboardVerticalOffset={100}
      enabled={true}
    >
      <View style={tw('flex-1 ')}>
          {!isKeyboardVisible ? (
            <View style={tw('flex-[2] items-center justify-center bg-slate-700')}>
            <View style={[styles.gap4, tw('flex-row items-center')]}>
              <Icon name="map" size={50}  color='#54bdfa'/>
            </View>
          </View>
          ) : null}
        <View style={tw('flex-[4] p-4 pt-12')}>
          <Text
            style={tw('text-2xl text-slate-700 dark:text-slate-100 font-bold')}>
            Create Account
          </Text>
          <Text style={tw('text-sm text-slate-300')}>
            Welcome to Geo Note Sign in to Start
          </Text>
          <View style={[styles.gap4, tw('mt-8')]}>
            <View>
              <Text style={tw('font-bold text-sm mb-1')}>Full Name</Text>
              <TextInput
                placeholder="Enter your email address"
                style={tw('w-full border border-gray-300 rounded-md p-2')}
                value={fullname}
                onChangeText={text => {
                  setFullname(text);
                }}
              />
              {error.email && (
                <Text style={tw('text-red-400 text-xs mt-2')}>
                  {error.email}
                </Text>
              )}
            </View>
            <View>
              <Text style={tw('font-bold text-sm mb-1')}>Email Address</Text>
              <TextInput
                placeholder="Enter your email address"
                style={tw('w-full border border-gray-300 rounded-md p-2')}
                value={email}
                onChangeText={text => {
                  handleChangeEmail(text);
                }}
              />
              {error.email && (
                <Text style={tw('text-red-400 text-xs mt-2')}>
                  {error.email}
                </Text>
              )}
            </View>
            <View>
              <Text style={tw('font-bold text-sm mb-1')}>Password</Text>
              <TextInput
                placeholder="Enter your password"
                style={tw('w-full border border-gray-300 rounded-md p-2')}
                value={password}
                onChangeText={text => {
                  handleChangePassword(text);
                }}
                secureTextEntry
              />
              {error.password && (
                <Text style={tw('text-red-400 text-xs mt-2')}>
                  {error.password}
                </Text>
              )}
            </View>
            <View style={tw('mt-4')}>
              <Button
                title="Sign Up"
                disabled={!_.isEmpty(error.email) || !_.isEmpty(error.password)}
                onPress={() => {
                  handleSubmit();
                }}
              />

              <TouchableOpacity
              onPress={() => {
                nav.navigate('Login');
              }}
                style={tw(' self-center  items-center justify-center mt-6')}>
                <Text
                  style={tw(
                    'text-slate-900 dark:text-white text-center text-base',
                  )}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  gap4: {
    gap: 20,
  },
});

export default SignUpScreen;
