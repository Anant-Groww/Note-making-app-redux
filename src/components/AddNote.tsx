import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { addNote } from '../features/notes/NoteSlice';
import Modal from "react-native-modal";
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
    YellowBox,
  } from 'react-native';
function AddNote(){
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const addNoteHandler = (e:any) => {
        e.preventDefault();
        dispatch(addNote({title: title, value: message}));
        setMessage("");
        setTitle("");
        toggleModal();
    }
    const closeWithoutSaving = () => {
        setMessage('');
        setTitle('');
        toggleModal();
    }

    return (
        <View>
            <Button title="New Note" onPress={toggleModal} />
            <Modal isVisible={isModalVisible} 
          animationIn="bounceInUp" coverScreen={true}
          style={{justifyContent: 'flex-end', margin: 0}}
           >
              <View style={{ 
                width: "100%",
                height: "60%",
                borderRadius: 10,
                alignItems: "center",
                // alignItems: "stretch",
                justifyContent: "center",
                // borderWidth: 2,
                borderStyle: 'solid',
                backgroundColor: "lightblue" }}>
                <TextInput 
                placeholder='Enter Your title'
                multiline
                value={title}
                onChangeText={(text) => setTitle(text)}
                style = {{
                height: 50,
                width: "90%",
                backgroundColor: 'lightgreen',
                borderRadius:20,
                }}
                />
                <TextInput 
                placeholder='Enter Your text2'
                multiline
                value={message}
                onChangeText={(text) => setMessage(text)}
                style = {{
                  width: "90%",
                  height: 300,
                  backgroundColor: 'yellow',
                }}
                />
                <Button
                  title='Save' 
                  onPress={addNoteHandler}
                />
                <Button title="Close This Note" onPress={closeWithoutSaving}/>
              </View>
          </Modal>
        </View>
    )
}

export default AddNote