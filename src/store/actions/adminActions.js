import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService, getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService } from '../../services/userService';
import { toast } from 'react-toastify';
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



export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: data
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
});

export const fetchRoleStart = () => ({
    type: actionTypes.FETCH_ROLE_START
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
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsers());
                toast.success('Create user success!');
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

export const fetchAllUsersSuccess = (users) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: users
});
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const fetchAllUsers = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUsersFailed());
                toast.error('fetchAllUsersFailed error');
            }
        } catch (e) {
            dispatch(fetchAllUsersFailed());
            toast.error('fetchAllUsers error');
        }
    }
};

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsers());
                toast.success('Delete user success!');
            } else {
                toast.error('deleteUserFailed error');
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error('deleteUserFailed error');
            dispatch(deleteUserFailed());
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
});

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                dispatch(editUserSuccess());
                dispatch(fetchAllUsers());
                toast.success('Edit user success!');
            } else {
                toast.error('deleteUserFailed error');
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error('editUserFailed error');
            dispatch(editUserFailed());
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})
// let res1 = await getTopDoctorHomeService(10);
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService(10);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log('fetchTopDoctor error:', e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            })

        }
    }

}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log('fetchAllDoctors error:', e);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            })

        }
    }

}
export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success('Save information detail doctor success!');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            }
            else {
                toast.error('Save information detail doctor failed!');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            toast.error('Save information detail doctor failed!');
            console.log('saveDetailDoctor error:', e);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED,
            })

        }
    }
}