import {
  REGISTER_USER,
  CLEAN_REGISTER,
  AGREGAR_SALDO,
  CONSULTAR_SALDO,
} from "../constants";

const inicialState = {
  user: {
    registroOk: false,
    saldo: null,
  },
};

export default function reducer(state = inicialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, user: { registroOk: action.usuarioRegistrado } };
    case CLEAN_REGISTER:
      return { ...state, user: { registroOk: false, saldo: null } };
    case AGREGAR_SALDO:
      return { ...state, user: { ...state.user, saldo: action.data } };
    case CONSULTAR_SALDO:
      return { ...state, user: { ...state.user, saldo: action.monto } };
    default:
      return state;
  }
}
