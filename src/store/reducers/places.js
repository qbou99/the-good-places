const initialState = { places: [] }

function places(state = initialState, action) {
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
    case 'EDIT_PLACE':
        nextState = {
          ...state,
          places: [...state.places.filter(p => p.id !== action.value.id), action.value]
        };
        return nextState || state
    case 'SET_PLACES':
        nextState = {
          ...state,
          places: action.value
        };
        return nextState || state
    default:
      return state
  };
}

export default places;