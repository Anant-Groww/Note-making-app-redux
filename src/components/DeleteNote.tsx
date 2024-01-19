import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { removeNote } from '../features/notes/NoteSlice';
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
function DeleteNote(props:any){
    // const [index, setIndex] = useState(-1);
    const dispatch = useDispatch();
    const deleteNoteHandler = (index: number) => {
        // e.preventDefault();
        console.log(index);
        dispatch(removeNote({index: index}));
    }
    return (
        <View>
            <Button title="Delete Note" onPress={() => deleteNoteHandler(props.indx)}/>
        </View>
    )


}

export default DeleteNote