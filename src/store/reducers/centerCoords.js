const initialState = { coords: {longitude: 49.0948, latitude: 6.2299} }

function centerCoords(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'CENTER_MAP':
      nextState = {
        ...state,
        coords: action.value
      };
      return nextState || state
    default:
      return state
  };
}

export default centerCoords;