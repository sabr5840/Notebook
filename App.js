import { app, database } from './firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { StatusBar, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, FlatList, StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { useCollection } from 'react-firebase-hooks/firestore';

import backgroundImage from './assets/baggroundPic.png';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='ListPage'>
        <Stack.Screen name='Notebook' component={ListPage} />
        <Stack.Screen name='DetailPage' component={DetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const ListPage = ({ navigation }) => {
  const [text, setText] = useState('');
  const [editObj, setEditObj] = useState(null);
  const [values, loading, error] = useCollection(collection(database, "notes"));
  const notes = values?.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    additionalText: doc.data().additionalText || '',
  }));

  async function handleAddNote() {
    try {
      await addDoc(collection(database, "notes"), {
        text: text,
        additionalText: '', // Add additionalText property
      });
      setText('');
    } catch (err) {
      console.log("fejl i DB" + err);
    }
  }

  async function deleteDocument(id) {
    await deleteDoc(doc(database, "notes", id));
  }

  function viewUpdateDialog(item) {
    setEditObj(item);
    setText(item.text);
  }

  async function saveUpdate() {
    if (editObj) {
      await updateDoc(doc(database, "notes", editObj.id), {
        text: text,
      });
      setText('');
      setEditObj(null);
    }
  }

  const handleButton = (item) => {
    navigation.navigate('DetailPage', { message: item });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>

        {editObj &&
          <View style={styles.updateContainer}>
            <TextInput defaultValue={editObj.text} onChangeText={(txt) => setText(txt)} style={styles.textInput} />
            <TouchableOpacity style={styles.saveButton} onPress={saveUpdate}>
              <Text style={styles.buttonText}>✔️</Text>
            </TouchableOpacity>
          </View>
        }

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(txt) => setText(txt)}
            value={text}
            placeholder="Enter note..."
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
            <Text style={styles.buttonText}>Add Note</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={notes}
          renderItem={({ item }) => (
            <View style={styles.noteContainer}>
              <TouchableOpacity style={styles.noteButton} onPress={() => handleButton(item)}>
                <Text style={styles.noteButtonText}>{item.text}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteDocument(item.id)}>
                <Text style={styles.icon}>🗑️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => viewUpdateDialog(item)}>
                <Text style={styles.icon}>📝</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const DetailPage = ({ route }) => {
  const { message } = route.params;
  const [additionalText, setAdditionalText] = useState(message.additionalText || '');

  const handleSaveAdditionalText = async () => {
    if (message.id) {
      await updateDoc(doc(database, "notes", message.id), {
        additionalText: additionalText,
      });
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>{message.text}</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAdditionalText}>
          <Text style={styles.buttonText}>Save Details</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInputDP}
          value={additionalText}
          onChangeText={(txt) => setAdditionalText(txt)}
          placeholder="Add more details..."
          multiline={true} 
        />
     
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',  
    height: '100%', 

  },
  detailContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  textInputDP: {
    backgroundColor: 'white',
    width: '80%',  
    height: '60%', 
    marginBottom: 20,
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  textInput: {
    backgroundColor: 'white',
    minWidth: 200,
    marginBottom: 20,
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    
  },
  saveButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#8aa8c2',
    fontSize: 16,
    
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,


  },
  noteButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    minWidth: 200,
    maxWidth: 200,
    alignSelf: 'flex-start',  


  },
  noteButtonText: {
    fontSize: 16,
    color: '#8aa8c2',
    

  },
  detailText: {
    color: '#8aa8c2',
    fontSize: 50,
    fontWeight: 'bold',
  },

  icon: {
    fontSize: 20,
    marginLeft: 5,
    padding: 5,
    borderRadius: 5,
  },
 
  

  
});
