import {createStore, Store} from 'redux'
import {createWrapper, Context} from 'next-redux-wrapper'
import {reducer, RootState} from './reducers'
const makeStore = (context: Context) => createStore(reducer);
export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: true});