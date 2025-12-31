import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null
}

const initialState = {
    started: true,
    language: 'vi', // 'vi' or 'en'
    systemMenuPath: '/system/user-manage',
    contentOfConfirmModal: {
        ...initContentOfConfirmModal
    },
    //máy thêm
    genders: [],
    roles: [],
    positions: []
    //
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APP_START_UP_COMPLETE:
            //map vao state
            return {
                ...state,
                started: true
            }
        case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL:
            return {
                ...state,
                contentOfConfirmModal: {
                    ...state.contentOfConfirmModal,
                    ...action.contentOfConfirmModal
                }
            }
        case actionTypes.CHANGE_LANGUAGE:
            console.log("check redux: ", action);
            //map vao state
            return {
                ...state,
                language: action.language,

            }
        //máy thêm
        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                genders: action.data
            }
        case actionTypes.FETCH_GENDER_FAILED:
            return {
                ...state,
                genders: []
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                positions: action.data
            }
        case actionTypes.FETCH_POSITION_FAILED:
            return {
                ...state,
                positions: []
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                roles: action.data
            }
        case actionTypes.FETCH_ROLE_FAILED:
            return {
                ...state,
                roles: []
                //
            }
        default:
            return state;
    }
}

export default appReducer;