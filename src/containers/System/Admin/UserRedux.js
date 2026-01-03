import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import TableManageUser from './tableManageUser';


import './UserRedux.scss'

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            gender: '',
            phoneNumber: '',
            address: '',
            position: '',
            roleId: '',
            avatar: '',

            action: '',
            userEditId: '',

        }
    }
    componentDidMount() {
        this.props.fetchGender();
        this.props.fetchPosition();
        this.props.fetchRole();
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (prevProps.genders !== this.props.genders) {
            let arrGenders = this.props.genders;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (prevProps.positions !== this.props.positions) {
            let arrPositions = this.props.positions;
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }
        if (prevProps.roles !== this.props.roles) {
            let arrRoles = this.props.roles;
            this.setState({
                roleArr: arrRoles,
                roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrPositions = this.props.positions;
            let arrGenders = this.props.genders;
            let arrRoles = this.props.roles;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                phoneNumber: '',
                address: '',
                roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                userEditId: '',
                previewImgURL: ''
            })
            // Clear email error when reset form
            this.props.clearEmailError();
        }
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        console.log("check user from parent:", user);
        //decode base64 string
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            position: user.positionId,
            gender: user.gender,
            phoneNumber: user.phoneNumber,
            address: user.address,
            roleId: user.roleId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
        // Clear email error when edit user
        this.props.clearEmailError();

    }

    handleOnChangeImage = async (event) => {
        const files = event.target.files;
        const file = files[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            const objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux action
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.roleId,
                phoneNumber: this.state.phoneNumber,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        } else if (action === CRUD_ACTIONS.EDIT) {
            //fire redux edit user
            this.props.editUser({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.roleId,
                phoneNumber: this.state.phoneNumber,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        let value = event.target.value;

        // Clear email error when user starts typing
        if (id === 'email') {
            this.props.clearEmailError();
        }

        copyState[id] = value;
        this.setState({
            ...copyState
        })
    }

    handleEmailBlur = (event) => {
        const email = event.target.value;
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                this.props.setEmailError();
            } else {
                this.props.clearEmailError();
            }
        } else {
            this.props.clearEmailError();
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('this input require: ' + arrCheck[i])
                break;
            }
        }

        // Validate email format
        if (isValid && this.state.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.state.email)) {
                isValid = false;
                this.props.setEmailError();
            }
        }

        return isValid;
    }


    render() {
        let { genders, positions, roles, language, isLoadingGender, isLoadingPosition, isLoadingRole } = this.props;
        const { intl } = this.props;
        let { email, password, firstName, lastName, gender, phoneNumber, address, position, roleId } = this.state;

        const isLoading = isLoadingGender || isLoadingPosition || isLoadingRole;

        return (
            <div className="user-redux-container">
                <div className="title">User Redux</div>

                {isLoading && (
                    <LoadingSpinner />
                )}

                <div className="user-redux-body" >
                    <div className="container">
                        <div className="row">
                            <div className="col-12"><FormattedMessage id="manage-user.add" /></div>
                            <div className="col-6">
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className="form-control" type="email"
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    onBlur={(event) => { this.handleEmailBlur(event) }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                ></input>
                                {this.props.hasEmailError && (
                                    <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
                                        {intl.formatMessage({ id: 'manage-user.email-invalid' })}
                                    </div>
                                )}
                            </div>
                            <div className="col-6">
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className="form-control" type="password"
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                ></input>
                            </div>
                            <div className="col-6">
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input className="form-control" type="text"
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                ></input>
                            </div>
                            <div className="col-6">
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input className="form-control" type="text"
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                ></input>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.phone-number" /></label>
                                <input className="form-control" type="text"
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                ></input>
                            </div>
                            <div className="col-9">
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className="form-control" type="text"
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }}
                                ></input>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control"
                                    value={gender}
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                >
                                    <option disabled value="">{intl.formatMessage({ id: 'manage-user.Choose' })}...</option>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-control"
                                    value={position}
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}
                                >
                                    <option disabled value="">{intl.formatMessage({ id: 'manage-user.Choose' })}...</option>
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.roleId" /></label>
                                <select className="form-control"
                                    value={roleId}
                                    onChange={(event) => { this.onChangeInput(event, 'roleId') }}
                                >
                                    <option value="" disabled>{intl.formatMessage({ id: 'manage-user.Choose' })}...</option>
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className="preview-img-container">
                                    <input id="previewImg" type="file" hidden
                                        onChange={(event) => this.handleOnChangeImage(event)}></input>
                                    <label className='label-upload' htmlFor="previewImg"><i className="fas fa-upload"></i>  Tải ảnh </label>
                                    <div className="preview-image"
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 my-3">
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleSaveUser()}

                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-user.edit" />
                                        :
                                        <FormattedMessage id="manage-user.save" />
                                    }
                                </button>


                            </div>
                            <div className="col-12 mb-5">
                                <TableManageUser
                                    handleEditUserFromParentKey={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />

                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div >

        )
    }

}

const mapStateToProps = state => {
    return {
        genders: state.admin.genders,
        positions: state.admin.positions,
        roles: state.admin.roles,
        language: state.app.language,
        isLoadingGender: state.admin.isLoadingGender,
        isLoadingPosition: state.admin.isLoadingPosition,
        isLoadingRole: state.admin.isLoadingRole,
        listUsers: state.admin.users,
        hasEmailError: state.admin.hasEmailError,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGender: () => dispatch(actions.fetchGender()),
        fetchPosition: () => dispatch(actions.fetchPosition()),
        fetchRole: () => dispatch(actions.fetchRole()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUsersRedux: () => dispatch(actions.fetchAllUsers()),
        editUser: (data) => dispatch(actions.editUser(data)),
        setEmailError: () => dispatch(actions.setEmailError()),
        clearEmailError: () => dispatch(actions.clearEmailError())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserRedux));