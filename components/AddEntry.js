import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView, Dimensions } from 'react-native';
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers.js';
import  UdaciSlider  from './UdaciSlider';
import  UdaciSteppers  from './UdaciSteppers';
import  DateHeader  from './DateHeader';
import { Ionicons } from '@expo/vector-icons';
import  TextButton  from './TextButton';
import { connect } from 'react-redux'
import { handleAddEntry, handleRemoveEntry } from '../actions/entries'
import { handleInitialData } from '../actions/shared'
import { white, purple, blue } from '../utils/colors';

function SubmitBtn({onPress}) {

  return (
    <TouchableOpacity
      style={Platform.OS === "ios" ? styles.iosSubmitBtn : styles.androidSubmitBtn}
      onPress={onPress}>
      <Text style={{color: white, textAlign: "center"}}>SUBMIT</Text>
    </TouchableOpacity>
  )
}


class AddEntry extends React.Component {

  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }

  increment = (metric) => {

    const { step, max} = getMetricMetaInfo(metric)

    this.setState((state) => {
      const count = state[metric] + step

      return {
        ...state, 
        [metric]: count > max ? max : count
      }

    })
  }

  decrement = (metric) => {

    this.setState((state) => {
      const count = state[metric] - getMetricMetaInfo(metric).step

      return {
        ...state, 
        [metric]: count < 0 ? 0 : count
      }

    })
  }  

  slide = (metric,value) => {
    this.setState({
        [metric]: value
    })
  }


  submit = () => {
    const key = timeToString()
    const entry = this.state
        
    this.props.dispatch(handleAddEntry(key, entry))

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }))


    //submitEntry({key, entry})

    //Navigate To Home

    //Clean local notification

  }


  
  reset = () => {
    const key = timeToString()
    
    //this.props.dispatch(addData({
    //  [key]: getDailyReminderValue()      
    //}))

    //Route To Home

    this.props.dispatch(handleRemoveEntry(key))

  }

  componentDidMount(){

    const {dispatch} = this.props
    dispatch(handleInitialData())
    
    }  


  render() {

    const metaInfo = getMetricMetaInfo()
    const { width, height } = Dimensions.get('window');
    
    if (this.props.alreadyLogged) {
        return (
            <View style={styles.center}>
                <Ionicons
                    name="md-happy"
                    size={100}
                 />
                 <Text>You already logged your information for today.</Text>
                 <TextButton style={{padding: 10}} onPress={this.reset}>
                    Reset                   
                 </TextButton>
            </View>
        )
    }

    var date = Date.now();
    const d = new Date(date)
    return (      
                  
            <ScrollView>   
                <View style={[styles.container, {height: height-45}]}>

                      <DateHeader date={d.toLocaleDateString()}/>


                      {/* <View style={styles.innerContainer}>                          */}
                        {Object.keys(metaInfo).map(key => {
                              const { getIcon, type, ...rest} = metaInfo[key]
                              const value = this.state[key]
                              return (
                                  <View key={key} style={styles.ininnerContainer}>
                                      <View style={{flex: 1}}>
                                      {getIcon()}
                                      </View>
                                      <View style={{flex: 2}}>
                                      {(type === "slider") ? <UdaciSlider value={value} 
                                                                onChange={(value) => this.slide(key, value)}  {...rest}/> 
                                                          : 
                                                          <UdaciSteppers value={value} 
                                                                onIncrement= {() => this.increment(key)}
                                                                onDecrement= {() => this.decrement(key)}
                                                                {...rest}                                               
                                                          />
                                      }
                                      </View>
                                  </View>         
                              )
                        })}
                      {/* </View>   */}


                    <SubmitBtn onPress={this.submit}/>  
             
              </View>                  
            </ScrollView> 
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  innerContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },  
  ininnerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },  
  row: {
    flexDirection: "row",
    alignItems: "center",
  },  
  iosSubmitBtn: {
      backgroundColor: blue,
      padding: 10,
      borderRadius: 7,
      height: 45,
      marginLeft: 40,   
      marginRight: 40,   
  },
  androidSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    borderRadius: 8,    
    width: 130,       
     alignSelf: "flex-end",
    fontSize: 22,
  },
  center : {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
  }
})


function mapStateToProps ( { entries } ) {
    const key = timeToString()
    let alreadyLogged = false

    for(let entryKey in entries[key]) {
          alreadyLogged = true
    }

    return {
      alreadyLogged: alreadyLogged,
      message: entries,
      statekey: entries[key]
    }
}


export default connect(mapStateToProps)(AddEntry)