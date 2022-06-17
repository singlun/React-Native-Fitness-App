import { submitEntry, removeEntry, setEntry } from '../utils/api'

export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRY = 'ADD_ENTRY'
export const DELETE_ENTRY = 'DELETE_ENTRY'

export function receiveEntries(entries) {
    return {
        type: RECEIVE_ENTRIES,
        entries,
    }
}

export function addEntry(entries) {
    return {
        type: ADD_ENTRY,
        entries,
    }
}

export function deleteEntry(entries) {
    return {
        type: DELETE_ENTRY,
        entries,
    }
}

  export  function handleAddEntry(key, entry) {
    return (dispatch) => {
             return submitEntry(entry,key)
             .then((entries) => 
                dispatch(addEntry(entries))
             )

    }
}  


export  function handleRemoveEntry(key) {
    return (dispatch) => {
             return removeEntry(key)
             .then((entries) => 
                setEntry(key)                
             )
             .then((entries) => 
                dispatch(deleteEntry(entries))
             )             
    }
}  

