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
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}
const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-info-doctors`, data)
}
const getDetailInfoDoctorService = (inputId) => {
    return axios.get(`/api/get-detail-doctors-by-id?id=${inputId}`)

}
export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService, getAllCodeService, getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService, getDetailInfoDoctorService }