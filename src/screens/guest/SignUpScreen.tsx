import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useContext } from 'react';
import { useTailwind } from 'tailwind-rn';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { validateEmail, validateName, validatePassword } from '../../utils';
import _ from 'lodash';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { withLoading } from '../../HOC/withLoading';
import { AppContext } from '../../providers/AppProvider';

const SignUpScreen = () => {
  const tw = useTailwind();
  const nav = useNavigation();

  const [email, setEmail] = React.useState('ybanezmichelle1114@gmail.com');
  const [fullname, setFullname] = React.useState('inday pahak');
  const [password, setPassword] = React.useState('pass1234');
  const [error, setError] = React.useState({
    email: '',
    password: '',
    fullname: '',
  });

  const isKeyboardVisible = useKeyboard();
  const { send } = useContext(AppContext);

  const handleChangeName = (text: string) => {
    setFullname(text);
    if (!validateName(text)) {
      setError({ ...error, fullname: 'Invalid Name' });
    } else {
      setError({ ...error, fullname: '' });
    }
  }

  state,
    setError({ ...error, email: 'Invalid Email Address' });
} else {
  setError({ ...error, email: '' });
    }
  };

const handleChangePassword = (text: string) => {
  setPassword(text);
  if (!validatePassword(text)) {
    setError({ ...error, password: 'Invalid Password, At least 7 characters' });
  } else {
    setError({ ...error, password: '' });
  }
};

const handleSubmit = () => {
  send(prev => ({ ...prev, loading: true }));
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
        })
        .then(() => {
          setEmail('');
          setPassword('');
          setFullname('');
          send(prev => ({ ...prev, loading: false }));
        });
    })
    .catch(err => {
      send(prev => ({ ...prev, loading: false }));
      console.log(err.message)
      setError({ ...error, password: err.message?.replace(/\[.*?\]\s*/g, '') });
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
        <View style={tw('h-[25%] items-center justify-center bg-slate-200 dark:bg-slate-700')}>
          <View style={[styles.gap4, tw('flex-row items-center')]}>
            <Icon name="map" size={50} color='#54bdfa' />
          </View>
        </View>
      ) : null}
      <View style={tw('flex-[1] p-4 pt-8')}>
        <Text
          style={tw('text-2xl text-slate-700 dark:text-slate-100 font-bold')}>
          Create Account
        </Text>
        <Text style={tw('text-sm text-slate-700 dark:text-slate-400')}>
          Welcome to Geo Note start writing your note
        </Text>
        <View style={[styles.gap4, tw('mt-8')]}>
          <View>
            <Text style={tw('font-bold text-sm mb-1 text-slate-700 dark:text-slate-200')}>Full Name</Text>
            <TextInput
              placeholderTextColor={'#777'}
              placeholder="Enter your email address"
              style={tw('w-full border border-gray-300 rounded-md p-2 text-slate-700 dark:text-slate-200')}
              value={fullname}
              onChangeText={text => {
                handleChangeName(text);
              }}
            />
            {error.fullname && (
              <Text style={tw('text-red-400 text-xs mt-2')}>
                {error.fullname}
              </Text>
            )}
          </View>
          <View>
            <Text style={tw('font-bold text-sm mb-1 text-slate-700 dark:text-slate-200')}>Email Address</Text>
            <TextInput
              placeholderTextColor={'#777'}
              placeholder="Enter your email address"
              style={tw('w-full border border-gray-300 rounded-md p-2 text-slate-700 dark:text-slate-200')}
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
            <Text style={tw('font-bold text-sm mb-1 text-slate-700 dark:text-slate-200')}>Password</Text>
            <TextInput
              placeholderTextColor={'#777'}
              placeholder="Enter your password"
              style={tw('w-full border border-gray-300 rounded-md p-2 text-slate-700 dark:text-slate-200')}
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
              btnType='primary'
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

export default withLoading(SignUpScreen);
