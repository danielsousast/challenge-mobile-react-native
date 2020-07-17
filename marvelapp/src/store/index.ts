import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Reactotron from '../config/ReactotronConfig';

import reducers from './reducers';

const middleware = [thunk];
const composed = applyMiddleware(...middleware);
const enhancer = Reactotron.createEnhancer();

const store = createStore(reducers, compose(applyMiddleware(thunk), enhancer));

export default store;
