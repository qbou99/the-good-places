const initialState = { places: [] }

function visiblePlaces(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'ADD_PLACE':
      nextState = {
        ...state,
        places: [...state.places, action.value]
      };
      return nextState || state
    case 'REMOVE_PLACE':
      nextState = {
        ...state,
        places: state.places.filter(p => p.id !== action.value.id)
      };
      return nextState || state
    default:
      return state
  };
}

export default visiblePlaces;