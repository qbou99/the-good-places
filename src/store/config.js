import { createStore, combineReducers } from 'redux';

import visiblePlacesReducer from './reducers/visiblePlaces';
import centerCoordsReducer from './reducers/centerCoords'
import placesReducer from './reducers/places'

const reducerPersist = combineReducers({
  visiblePlaces: visiblePlacesReducer,
  centerCoords: centerCoordsReducer,
  places: placesReducer,
});

export const Store = createStore(reducerPersist);