import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import usersReducer from '../reducers/users-reducer'
import jobsReducer from '../reducers/jobs-reducer'
import categoryReducer from '../reducers/category-reducer'
import resumeReducer from '../reducers/resume-reducer'
import applicationReducer from '../reducers/application-reducer'

const configureStore = ()=>{
    const rootReducers = {
        users : usersReducer,
        jobs : jobsReducer,
        category : categoryReducer,
        resume : resumeReducer,
        application : applicationReducer
    }
    const store = createStore(combineReducers(rootReducers), applyMiddleware(thunk))
    return store
}

export default configureStore