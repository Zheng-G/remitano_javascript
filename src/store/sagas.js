import { call, put, takeLatest } from 'redux-saga/effects';
import Api from './api';

function* validateAccount(action) {
  try {
    const user = yield call(new Api().validateAccount, action.payload.data);
    yield put({ type: 'VALIDATE_ACCOUNT_SUCCEEDED', payload: {
      userName: user.data.userName}
    });
  } catch (err) {
    if (err.message.includes('400')) {
      yield put({ type: 'VALIDATE_ACCOUNT_FAILED', payload: {
        message: 'Invalid account'
      }});
    } else {
      yield put({ type: 'VALIDATE_ACCOUNT_FAILED', payload: {
        message: 'something went wrong'
      }});
    }
  }
}

function* mySaga() {
  yield takeLatest('VALIDATE_ACCOUNT', validateAccount);
}

export default mySaga;