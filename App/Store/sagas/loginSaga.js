import { put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import * as loginActions from '../actions/loginActions';

// Our worker Saga that logins the user
export default function* loginAsync() {
    yield put(loginActions.enableLoader());

    //how to call api
    //const response = yield call(loginUser, action.username, action.password);
    //mock response
    const response = { success: true, data: { id: 1 }, message: 'Success' };

    if (response.success) {
        yield put(loginActions.setCurrentUser(response.data));
        yield put(loginActions.disableLoader());

        // no need to call navigate as this is handled by redux store with SwitchNavigator
        //yield call(navigationActions.navigateToHome);
    } else {
        yield put(loginActions.loginFailed());
        yield put(loginActions.disableLoader());
        setTimeout(() => {
            Alert.alert('BoilerPlate', response.message);
        }, 200);
    }
}
