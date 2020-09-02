import {
  REGISTER_USER,
  CLEAN_REGISTER,
  AGREGAR_SALDO,
  CONSULTAR_SALDO,
  REALIZAR_PAGO,
  LIMPIAR_PAGO,
  COMPROBAR_TOKEN,
} from "../constants";

const inicialState = {
  user: {
    registroOk: false,
    saldo: null,
    pagoRealizado: null,
    tokenCorrecto: null,
  },
};

export default function reducer(state = inicialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        user: { ...state.user, registroOk: action.usuarioRegistrado },
      };
    case CLEAN_REGISTER:
      return {
        ...state,
        user: { ...state.user, registroOk: false, saldo: null },
      };
    case AGREGAR_SALDO:
      return { ...state, user: { ...state.user, saldo: action.data } };
    case CONSULTAR_SALDO:
      return { ...state, user: { ...state.user, saldo: action.monto } };
    case REALIZAR_PAGO:
      return { ...state, user: { ...state.user, pagoRealizado: action.data } };
    case LIMPIAR_PAGO:
      return { ...state, user: { ...state.user, pagoRealizado: null } };
    case COMPROBAR_TOKEN:
      return { ...state, user: { ...state.user, tokenCorrecto: action.data } };
    default:
      return state;
  }
}
