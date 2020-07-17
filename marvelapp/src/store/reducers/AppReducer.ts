import produce from 'immer';

const initialState = {
  favorites: [],
};

const AppReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'ADD_FAVORITE': {
        draft.favorites.push(action.payload.character);
        break;
      }

      case 'DEL_FAVORITE': {
        draft.favorites = draft.favorites.filter(
          favorite => favorite.id !== action.payload.id,
        );
        break;
      }

      default:
    }
  });
};

export default AppReducer;
