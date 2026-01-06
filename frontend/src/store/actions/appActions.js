import actionTypes from './actionTypes';
//action for app
export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE
});
//action for confirm modal(need data)
export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    //convey data for reducer
    contentOfConfirmModal: contentOfConfirmModal
});


export const changeLanguageApp = (languageInput) => ({
    type: actionTypes.CHANGE_LANGUAGE,
    //convey data for reducer
    language: languageInput
});