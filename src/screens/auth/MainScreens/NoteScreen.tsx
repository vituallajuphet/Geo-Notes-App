import { View, Text, TextInput, Platform, Pressable, Keyboard } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import { useTailwind } from 'tailwind-rn';
import Button from '../../../components/Button';
import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../../providers/AuthProvider';
import { AppContext } from '../../../providers/AppProvider';
import { withLoading } from '../../../HOC/withLoading';
import ImagePicker from '../../../components/ImagePicker';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import { getFileExtension } from '../../../utils';
import Toast from 'react-native-toast-message';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LocationPicker from '../../../components/LocationPicker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const NoteScreen = (props: any) => {
  const [title, setTitle] = React.useState('');
  const [openMap, setOpenMap] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState<any>(null);
  const [openDate, setOpenDate] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [selectedImage, setSelectedImage] = React.useState<any>(null);
  const [body, setBody] = React.useState('');
  const [location, setLocation] = React.useState({});
  const tw = useTailwind();
  const context = useContext(AuthContext);
  const params = props?.route?.params;
  const changed = useRef<any>(false)

  const { send } = useContext(AppContext);

  const requestLocationPermission = async () => {
    const permissionType = Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    const result = await request(permissionType);

    if (result === RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(info => {
        console.log("current localtion", info)
        setLocation(info);
      });
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, [])


  useEffect(() => {

    if (params?.note) {
      const note = params?.note;
      setTitle(note?.title);
      setBody(note?.body);
      setDate(new Date(note?.date));
      setSelectedImage({ uri: note?.imagepath });
    }

  }, [params])


  const handleSave = async () => {
    const uid = context?.user?.auth?.uid
    if (!title || !body) {
      Toast.show({
        type: 'error',
        autoHide: true,
        position: 'top',
        text1: 'Title and Body are required',
      });
      return;
    }

    if (!selectedImage) {
      Toast.show({
        type: 'error',
        autoHide: true,
        position: 'top',
        text1: 'Image is required',
      });
      return
    }

    send(prev => ({ ...prev, loading: true }));
    if (!params) {
      const path = await uploadImage();
      try {

        const notesCollectionRef = firestore().collection(`Users/${uid}/notes`);

        notesCollectionRef.add({
          title,
          body,
          location: selectedLocation ? {
            coords: {
              latitude: selectedLocation?.latitude,
              longitude: selectedLocation?.longitude
            }
          } : location,
          date: date.toISOString(),
          imagepath: path
        }).then(() => {
          send(prev => ({ ...prev, loading: false }));
          setTitle('');
          setBody('');
          setSelectedImage(null);
          setDate(new Date());
          Toast.show({
            type: 'success',
            autoHide: true,
            position: 'top',
            text1: params ? 'Note Updated' : 'Note Saved',
          });
        });

      } catch (error) {

        Toast.show({
          type: 'error',
          autoHide: true,
          position: 'top',
          text1: 'Error Saving Note',
        });
        send(prev => ({ ...prev, loading: false }));
      }
    } else {
      try {
        const path = changed.current ? await uploadImage() : params.note.imagepath;
        const notesCollectionRef = firestore().collection(`Users/${uid}/notes`);
        notesCollectionRef.doc(params.note.id).update({
          title,
          body,
          location: selectedLocation ? {
            coords: {
              latitude: selectedLocation?.latitude,
              longitude: selectedLocation?.longitude
            }
          } : location,
          date: date.toISOString(),
          imagepath: path
        }).then(() => {
          send(prev => ({ ...prev, loading: false }));
          Toast.show({
            type: 'success',
            autoHide: true,
            position: 'top',
            text1: 'Note Updated',
          });
        }).catch((error) => { console.log("error ", error) });
      } catch (error) {
        Toast.show({
          type: 'error',
          autoHide: true,
          position: 'top',
          text1: 'Error Updating Note',
        });
        console.log("error ", error);
        send(prev => ({ ...prev, loading: false }));
      }
    }
  }

  const uploadImage = async () => {
    try {
      const uploadUri = Platform.OS === 'ios' ? selectedImage.uri.replace('file://', '') : selectedImage.uri;
      const ext = getFileExtension(uploadUri);
      const uid = uuid.v4();
      const fullPath = `images/${uid}.${ext}`;
      await storage().ref(fullPath).putFile(uploadUri);

      const url = await storage().ref(fullPath).getDownloadURL();

      return url;
    } catch (error) {
      console.log("error ", error);
      return null;
    }
  }

  const handleDelete = async () => {
    send(prev => ({ ...prev, loading: true }));
    const uid = context?.user?.auth?.uid
    try {
      const notesCollectionRef = firestore().collection(`Users/${uid}/notes`);
      notesCollectionRef.doc(params.note.id).delete().then(() => {
        send(prev => ({ ...prev, loading: false }));
        Toast.show({
          type: 'success',
          autoHide: true,
          position: 'top',
          text1: 'Note Deleted',
        });
        setTimeout(() => {
          props.navigation.goBack();
        }, 500);
      }).catch((error) => { console.log("error ", error) });
    } catch (error) {
      Toast.show({
        type: 'error',
        autoHide: true,
        position: 'top',
        text1: 'Error Deleting Note',
      });

      send(prev => ({ ...prev, loading: false }));
    }
  }

  return (
    <>
      <KeyboardAwareScrollView
        style={tw('bg-slate-200 dark:bg-slate-800 flex-1')}
      >
        <View style={tw(' p-6 px-4 flex-1')}>
          <Text style={tw('text-2xl font-bold')}>{params ? "Update Note" : "Add New"}</Text>
          <Text style={tw('text-sm text-gray-500 mt-2')}>Fill up the required form</Text>
          <View style={tw('mt-6')}>
            <Pressable style={tw('')} onPress={() => {
              setOpenMap(true);
            }}>
              <Text style={tw('text-sm text-slate-700 dark:text-blue-400 font-semibold')}>Set Custom Location</Text>
            </Pressable>
          </View>
          <View style={tw('mt-4')}>
            <Text style={tw('font-bold text-sm mb-1')}>Date</Text>
            <Pressable style={tw('w-full border border-gray-300 rounded-md p-3')} onPress={() => {
              setOpenDate(true);
            }}>
              <Text style={tw('text-sm text-slate-700 dark:text-white ')}>{moment(date).format('MM/DD/YYYY')}</Text>
            </Pressable>
          </View>
          <View style={tw('mt-4')}>
            <View>
              <Text style={tw('font-bold text-sm mb-1')}>Title</Text>
              <TextInput placeholder="Enter Title" style={tw('w-full border border-gray-300 rounded-md p-2')} value={title}
                onChangeText={text => {
                  setTitle(text);
                }}
              />
            </View>
            <View style={tw('mt-4')}>
              <Text style={tw('font-bold text-sm mb-1')}>Body</Text>
              <TextInput multiline placeholder="Enter Content" style={tw('w-full border border-gray-300 rounded-md p-2')} value={body}
                onChangeText={text => {
                  setBody(text);
                }}
              />
            </View>
            <View style={tw('mt-4 mb-4')}>
              <ImagePicker
                onImageSelected={(res) => {
                  changed.current = true;
                  setSelectedImage(res.assets[0]);
                }}
                selected={selectedImage}
                onRemove={() => {
                  setSelectedImage(null);
                }}
              />
            </View>
            <View style={tw('mt-4')}>
              <Button btnType='primary' title={`${params ? 'Update' : 'Save'} Note`} onPress={() => {
                handleSave()
              }} />
              {params ? <View style={tw('mt-2 ')}>
                <Button btnType='danger' title="Delete" onPress={() => {
                  handleDelete()
                }} />
              </View> : null}
            </View>
          </View>

        </View>
        <Toast
          position='bottom'
          bottomOffset={20}
        />
        <LocationPicker
          open={openMap}
          onClose={() => {
            setOpenMap(false);
          }}
          onSelect={(location) => {
            setSelectedLocation(location);
            setOpenMap(false);
          }}
        />
        <DatePicker
          modal
          date={date}
          mode="date"
          open={openDate}
          onConfirm={(date) => {
            setDate(date);
            setOpenDate(false);
          }}
          onCancel={() => {
            setOpenDate(false);
          }}
        />
      </KeyboardAwareScrollView>
    </>


  )
}

export default withLoading(NoteScreen);