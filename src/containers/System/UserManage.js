import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './user-manage.scss';
import { getAllUsers, createNewUserService, deleteUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
import { editUserService } from '../../services/userService';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }
    /* Life cycle
    * run component
    *1/run constructor,-> init state
    *2/ did mount(set state)
    *3/run render(re-render ),-> render UI
    *
    */
    async componentDidMount() {
        await this.getAllUserFromReact();
        // console.log("check state user 2:", this.state.arrUsers)
    }
    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
                // }
                // , () => {
                //     console.log("check state user:", this.state.arrUsers)
            })
        } else {
            alert('error')
        }
    }


    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }
    toggleModalUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }
    toggleModalEditUser = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' });
            }
        } catch (e) {
            console.log("error from service:", e)
        }
    }

    handleDeleteUser = async (user) => {
        console.log("delete user:", user)
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUserFromReact();
            }
            else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log("error from service:", e)
        }
    }
    handleEditUser = (user) => {

        console.log("check user edit:", user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }
    doEditUser = async (data) => {

        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUserFromReact();
            }
            else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log("error from service:", e)
        }
    }
    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className="user-container">
                <ModalUser
                    isOpenModalUser={this.state.isOpenModalUser}
                    toggleModalUser={this.toggleModalUser}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser

                        isOpenModalEditUser={this.state.isOpenModalEditUser}
                        toggleModalEditUser={this.toggleModalEditUser}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className="title text-center">
                    Manage users with Tranduc

                </div>
                <div className="mx-1">
                    <button className="btn btn-primary px-2 "
                        onClick={() => this.handleAddNewUser()}>
                        <i className="fa fa-plus px-1"></i>
                        Add new user</button>
                </div>
                <div className="user-table mt-4 mx-3">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>


                            {arrUsers && arrUsers.map((item, index) => {
                                // console.log(" Tranduc check map:", item, index)
                                return (
                                    <tr key={`user-${index}`}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => { this.handleEditUser(item) }}><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={() => { this.handleDeleteUser(item) }}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>



                    </table>
                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
