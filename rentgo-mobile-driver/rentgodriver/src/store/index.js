import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducers from './ducks'
import sagas from './sagas'

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null

const sagaMiddleware = createSagaMiddleware({ sagaMonitor })

const middlewares = [sagaMiddleware]

const composer =
    __DEV__ === 'development'
        ? compose(
              console.tron.createEnhancer(),
              applyMiddleware(...middlewares)
          )
        : applyMiddleware(...middlewares);

const store = createStore(reducers, composer)

sagaMiddleware.run(sagas)

export default store