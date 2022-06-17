import { AsyncStorage } from 'react-native'
import { CALENDAR_STORAGE_KEY } from './_calendar'

export async function retrieveData() {
      try {
        const value = await AsyncStorage.getItem(CALENDAR_STORAGE_KEY);
        if (value !== null) {
          // We have data!!
          return new Promise((res, rej) => {
            setTimeout(() => res(JSON.parse(value)), 0)
          })          
        }
      } catch (error) {
        // Error retrieving data
      }
  };


export async function submitEntry( entry, key) {
    
      return new Promise((res, rej) => {
              AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({[key]: entry}), () => {
                              AsyncStorage.getItem(CALENDAR_STORAGE_KEY, (err, result) => {
                                res(JSON.parse(result))
                              });
                            });            
      })     
    
}

export async function removeEntry(key) {
  try {
    const value = await AsyncStorage.getItem(CALENDAR_STORAGE_KEY);
    if (value !== null) {
      const data = JSON.parse(value)
      data[key] = null;
      //data[key] = {}
      return new Promise((res, rej) => {
        setTimeout(() => res(data), 0)
      })        
    }
  } catch (error) {
    // Error retrieving data
  }
};


export async function setEntry(key, entry = {}) {
  return new Promise((res, rej) => {
      AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify({[key]: entry}), () => {
        AsyncStorage.getItem(CALENDAR_STORAGE_KEY, (err, result) => {
          res(JSON.parse(result))
        });
      }); 
  })
}
