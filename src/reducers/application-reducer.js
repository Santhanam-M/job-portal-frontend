const intialState = {
    data : []
}

const applicationReducer = (state = intialState, action)=>{

    switch(action.type){
        
        case 'ADD_APPLICATION' : {
            return {...state, data : [...state.data, action.payload]}
        }

        case 'GET_APPLICATION' : {
            return {...state, data : action.payload}
        }

        case 'CHANGE_STATUS' : {
            const changeStatus = state.data.map((ele)=>{
                if(ele._id === action.payload._id){
                    return {...ele, ...action.payload}
                }
                else{
                    return {...ele}
                }
            })
            return {...state, data : changeStatus}
        }

        default : {
            return {...state}
        }
    }
}

export default applicationReducer