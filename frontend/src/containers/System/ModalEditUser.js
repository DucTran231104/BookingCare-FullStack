import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { emitter } from '../../utils/emitter';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        };

    }





    componentDidMount() {
        let user = this.props.currentUser;
        // let {currentUser} = this.props;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hardcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }

    toggle() {
        this.props.toggleModalEditUser()
    }
    handleOnChangeInput = (event, id) => {

        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValue = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {

            // console.log("check arrInput:", arrInput[i])
            // console.log("\ncheck state:", this.state[arrInput[i]])

            if (!this.state[arrInput[i]]) {
                isValue = false;
                alert('Missing inputs parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValue;
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (!isValid) {
            return;
        }
        else {
            //call api check modal
            // console.log("check data from modal:", this.state);
            this.props.editUser(this.state);
        }

    }
    render() {
        // console.log("check props from parent", this.props)
        return (
            <Modal
                isOpen={this.props.isOpenModalEditUser}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="md"
            //center modal
            // centered={true}
            >
                <ModalHeader toggle={() => { this.toggle() }}>
                    Edit an new user
                </ModalHeader>
                <ModalBody>
                    <div className="input-container">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>Email</label>
                                <input type="text"
                                    className="form-control email-input" onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                    value={this.state.email}
                                    disabled={true}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>Password</label>
                                <input type="password" className="form-control password-input" onChange={(event) => this.handleOnChangeInput(event, 'password')} value={this.state.password} disabled={true} />
                            </div>
                            <div className="col-6 form-group">
                                <label>First Name</label>
                                <input type="text" className="form-control first-name-input" onChange={(event) => this.handleOnChangeInput(event, 'firstName')} value={this.state.firstName} />
                            </div>
                            <div className="col-6 form-group">
                                <label>Last Name</label>
                                <input type="text" className="form-control last-name-input" onChange={(event) => this.handleOnChangeInput(event, 'lastName')} value={this.state.lastName} />
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" className="form-control address-input" onChange={(event) => this.handleOnChangeInput(event, 'address')} value={this.state.address} />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"
                        onClick={() => { this.handleSaveUser() }}
                        className="btn-save-user"

                    >
                        Save changes
                    </Button>{' '}
                    <Button color="secondary"
                        onClick={() => { this.toggle() }}
                        className="btn-cancel-user">
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);













