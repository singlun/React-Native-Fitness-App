import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import  AddEntry  from './components/AddEntry';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import { white } from './utils/colors';

export default class App extends React.Component {

  render() {

    const store = createStore(reducer, middleware);
    
    
    return (
        <Provider store={store}>
          <View style={styles.container}>
            <AddEntry />
          </View>
        </Provider>
    );
  }
}



const styles = StyleSheet.create({
  container : {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  }
})
