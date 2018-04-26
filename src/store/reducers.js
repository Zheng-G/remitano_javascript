import { VALIDATE_ACCOUNT_SUCCEEDED, VALIDATE_ACCOUNT_FAILED } from './actionTypes';

const initalState = {
  tenTaiKhoan: '',
  errors: {
    soTaiKhoan: '',
  },
}

export default function form(state = initalState, action) {
  switch (action.type) {
    case VALIDATE_ACCOUNT_FAILED:
      return {
        ...state,
        errors: {
          soTaiKhoan: action.payload.message
        }
      };
      break;
    case VALIDATE_ACCOUNT_SUCCEEDED:
    return {
      ...state,
      tenTaiKhoan: action.payload.userName,
      errors: {
        soTaiKhoan: ''
      }
    };
    break;
    default:
      return state;
      break;
  }
}