/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { useState, useMemo, useRef } from "react";
import type {PropsWithChildren} from 'react';
import Modal from "react-native-modal";
import { useSelector} from 'react-redux';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
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
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AddNote from "./src/components/AddNote"
import DeleteNote from './src/components/DeleteNote';
import EditNote from './src/components/EditNote'
type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(){
  const disObj:{title:string, value: string}[] = useSelector((state:any) => state.disObj);
  
  console.log(disObj);
  // console.log("anant");
  disObj.sort((a:any, b:any) => b.date - a.date);

  const renderItem = ({item}: { item: any}) => (
    <View>
      <Text style={{fontSize: 30}} >{item.title}</Text>
      <Text numberOfLines={1} ellipsizeMode="tail">{item.value}</Text>
      <Text>{disObj.indexOf(item)}</Text>
      <DeleteNote indx={disObj.indexOf(item)}/>
      <EditNote indx={disObj.indexOf(item)}/>
    </View>
  );
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {/* <Text>NotePadApp</Text> */}
          <GestureHandlerRootView>
              <FlatList
                data={disObj}
                renderItem={renderItem}
              />
          </GestureHandlerRootView>
          <AddNote/>
        </View>
      </ScrollView>
    </SafeAreaView> 
  )
}

interface Note{
  id: string;
  title: string;
}

const HelloWorld = () => {
  const [message, setMessage] = useState("");
  const [displayObj, setDisplayObj] = useState([{title: 'test-title', value: 'test-value', date: new Date()}]);
  const [index, setIndex] = useState(-1);
  const [title, setTitle] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  const editNote = (ind: number) => {
    console.log("An");
    displayObj[ind].date = new Date();
    setTitle(displayObj[ind].title);
    setMessage(displayObj[ind].value);
    setIndex(ind);
    setModalVisible(true);
  }
  const deleteNote = (ind: number) => {
    const newDis = [...displayObj];
    newDis.splice(ind, 1);
    setDisplayObj(newDis);
  }
  const renderItem = ({item}: { item: any}) => (
    <View>
      <Text style={{fontSize: 30}} >{item.title}</Text>
      <Text numberOfLines={1} ellipsizeMode="tail">{item.value}</Text>
      {/* <Text>{item.date}</Text> */}
      <Button title="Edit" onPress={() => editNote(displayObj.indexOf(item))}/>
      <Button title="Delete" onPress={() => deleteNote(displayObj.indexOf(item))}/>
      {/* <Text>{item.ind}</Text> */}
    </View>
  );
  const closeWithoutSaving = () => {
    setMessage('');
    toggleModal();
    setTitle('');
  }
  const saveHandler = () => {
    if(index!== -1){
      // const newDis = ...displayObj;
      displayObj[index] = {title: title, value: message, date: new Date()};
      setDisplayObj(displayObj);
    }
    else{
      setDisplayObj([...displayObj, {title: title,value: message, date: new Date()}]);
    }
    setDisplayObj((prevDisplayObj) => {
      const sortedDisplayObj = [...prevDisplayObj];
      sortedDisplayObj.sort((a:any, b:any) => b.date - a.date);
      return sortedDisplayObj;
    });
    setMessage('');
    setTitle('');
    setIndex(-1);
    setModalVisible(false);
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View> 
          <GestureHandlerRootView>
              <FlatList
                data={displayObj}
                renderItem={renderItem}
              />
          </GestureHandlerRootView>
          <Button title="New Note" onPress={toggleModal} />
          <Modal isVisible={isModalVisible} 
          animationIn="bounceInUp" coverScreen={true}
          style={{justifyContent: 'flex-end'}}
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
                  onPress={saveHandler}
                />
                <Button title="Close This Note" onPress={closeWithoutSaving}/>
              </View>
          </Modal>
        {/* {displayObj} */}
        </View>
      </ScrollView>
    </SafeAreaView> 
    
    
  )
}
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
