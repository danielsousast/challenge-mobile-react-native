export const addFavorite = character => {
  return dispatch => {
    dispatch({ type: 'ADD_FAVORITE', payload: { character } });
  };
};

export const delFavorite = id => {
  return dispatch => {
    dispatch({ type: 'DEL_FAVORITE', payload: { id } });
  };
};
