import { REGISTER_USER } from "../constants";

const inicialState = {
  user: {
    registroOk: false,
  },
};

export default function reducer(state = inicialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, user: { registroOk: action.usuarioRegistrado } };
    default:
      return state;
  }
}
