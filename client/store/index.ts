import {AnyAction, applyMiddleware, createStore, Store} from 'redux'
import {createWrapper, Context} from 'next-redux-wrapper'
import {reducer, RootState} from './reducers'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
export const makeStore = (context: Context) => createStore(reducer, applyMiddleware(thunk));
export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: true});
export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>