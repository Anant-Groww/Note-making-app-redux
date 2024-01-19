import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { editNote } from '../features/notes/NoteSlice';
import Modal from "react-native-modal";
import { useSelector } from 'react-redux';
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
function AddNote(props:any){
    const indx = props.indx;
    const disObj:{title:string, value: string}[] = useSelector( (state:any) => state.disObj);
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        // console.log(indx);
        setModalVisible(!isModalVisible);
    };
    const dispatch = useDispatch();
    const editNoteHandler = (e:any) => {
        e.preventDefault();
        dispatch(editNote({title: title, value: message, index:indx}));
        setMessage("");
        setTitle("");
        toggleModal();
    }
    const closeWithoutSaving = () => {
        toggleModal();
    }
    const editView  = () => {
        setMessage(disObj[indx].value);
        setTitle(disObj[indx].title);
        toggleModal();
    }

    return (
        <View>
            <Button title="Edit" onPress={editView} />
            <Modal isVisible={isModalVisible} 
          animationIn="bounceInUp" coverScreen={true}
          style={{justifyContent: 'flex-end', margin: 0}}
           >
              <View style={{ 
                width: "100%",
                height: "60%",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
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
                  onPress={editNoteHandler}
                />
                <Button title="Close This Note" onPress={closeWithoutSaving}/>
              </View>
          </Modal>
        </View>
    )
}

export default AddNote