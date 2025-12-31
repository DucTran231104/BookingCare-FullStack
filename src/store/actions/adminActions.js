import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService } from '../../services/userService';

export const fetch = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const fetchGenderStart = () => ({
    type: actionTypes.FETCH_GENDER_START
});

export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: data
});

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
});

export const fetchGender = () => {
    return async (dispatch, getState) => {
        dispatch(fetchGenderStart());
        try {
            let res = await getAllCodeService('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGender error:', e);
        }
    }
};

export const fetchPositionStart = () => ({
    type: actionTypes.FETCH_POSITION_START
});

export const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: data
});

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
});

export const fetchPosition = () => {
    return async (dispatch, getState) => {
        dispatch(fetchPositionStart());
        try {
            let res = await getAllCodeService('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPosition error:', e);
        }
    }
};

export const fetchRoleStart = () => ({
    type: actionTypes.FETCH_ROLE_START
});

export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: data
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
});

export const fetchRole = () => {
    return async (dispatch, getState) => {
        dispatch(fetchRoleStart());
        try {
            let res = await getAllCodeService('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRole error:', e);
        }
    }
};

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            console.log("check create user redux: ", res)
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('saveUserFailed error:', e);
        }

    }
}
export const saveUserSuccess = () => {
    return {
        type: 'CREATE_USER_SUCCESS'

    }
}
export const saveUserFailed = () => {
    return {
        type: 'CREATE_USER_FAILED'

    }
}