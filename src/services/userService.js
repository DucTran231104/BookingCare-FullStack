import { stringify } from "react-auth-wrapper/helpers";
import axios from "../axios"
import { concat } from "lodash";

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', {
        email: userEmail,
        password: userPassword
    });
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-user?id=${inputId}`);
}

const createNewUserService = (data) => {
    console.log("check data from service:", data)
    return axios.post('/api/create-new-user', data);
}
const deleteUserService = (userId) => {
    // return axios.delete('/api/delete-user', {
    //     id: userId
    // });
    return axios.delete('/api/delete-user', {
        // headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        // },
        data: {
            id: userId
        }
    })
}
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}
// export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService }
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}
export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService, getAllCodeService }