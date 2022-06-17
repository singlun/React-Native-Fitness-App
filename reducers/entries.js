import { RECEIVE_ENTRIES, ADD_ENTRY, DELETE_ENTRY } from '../actions/entries'

export function entries (state = {}, action) { 
    switch(action.type) {
        case RECEIVE_ENTRIES:
            return {
                ...state,
                ...action.entries
            }
        case DELETE_ENTRY:
           const key = Object.keys(action.entries)
           const newEntries = {[key] : {}}
           return {
                ...newEntries
            }
        case ADD_ENTRY:                                              
          return {
            ...state,
            ...action.entries
          }          
        default :
            return state
    }
}
