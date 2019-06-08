import { applyMiddleware, compose, createStore } from "redux"
import thunkMiddleware from "redux-thunk"

import localStorageMiddleware from "../middlewares/localStorage"

import reducers from "../reducers"

export default function configureStore(state) {
  return createStore(
    reducers,
    state,
    compose(
      applyMiddleware(
        thunkMiddleware,
        localStorageMiddleware,
      ),
      /* tslint:disable-next-line:no-string-literal */
      window["__REDUX_DEVTOOLS_EXTENSION__"] ? window["__REDUX_DEVTOOLS_EXTENSION__"]() : (storeCreator) => storeCreator
    )
  )
}
