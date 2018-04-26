import { VALIDATE_ACCOUNT } from './actionTypes';

export function validateAccount(data) {
  return {
    type: VALIDATE_ACCOUNT,
    payload: {
      data
    }
  }
}