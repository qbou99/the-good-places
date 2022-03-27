const initialState = { visiblePlaces: [] }

function visiblePlaces(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'ADD_VISIBLE_PLACE':
      nextState = {
        ...state,
        visiblePlaces: [...state.visiblePlaces, action.value]
      };
      return nextState || state
    case 'REMOVE_VISIBLE_PLACE':
      nextState = {
        ...state,
        visiblePlaces: state.visiblePlaces.filter(p => p.id !== action.value.id)
      };
      return nextState || state
    case 'EDIT_VISIBLE_PLACE':
      nextState = {
        ...state,
        visiblePlaces: [...state.visiblePlaces.filter(p => p.id !== action.value.id), action.value]
      };
      return nextState || state
    default:
      return state
  };
}

export default visiblePlaces;