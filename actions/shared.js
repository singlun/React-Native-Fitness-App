import { retrieveData } from '../utils/api'
import { receiveEntries } from './entries'


export  function handleInitialData() {
    return (dispatch) => {
             return retrieveData()
             .then((entries) => 
                //console.log('handle datas ', entries)
                dispatch(receiveEntries(entries))
             )
             //.then(res => {console.log("handleInitialData:" ,res)})

    }
}  
