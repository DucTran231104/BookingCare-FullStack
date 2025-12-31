import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        this.props.fetchGender();
        this.props.fetchPosition();
        this.props.fetchRole();
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (prevProps.genders !== this.props.genders) {
            this.setState({
                genderArr: this.props.genders
            })
        }
        if (prevProps.positions !== this.props.positions) {
            this.setState({
                positionArr: this.props.positions
            })
        }
        if (prevProps.roles !== this.props.roles) {
            this.setState({
                roleArr: this.props.roles
            })
        }
    }


    render() {
        let { genderArr, positionArr, roleArr } = this.state;
        let { genders, positions, roles, language } = this.props;
        const { intl } = this.props;

        // Sử dụng state nếu có, nếu không thì dùng props từ Redux
        let gendersData = genderArr || genders || [];
        let positionsData = positionArr || positions || [];
        let rolesData = roleArr || roles || [];

        return (
            <div className="user-redux-container">
                <div className="title">User Redux</div>
                <div className="user-redux-body" >
                    <div className="container">
                        <div className="row">
                            <div className="col-12"><FormattedMessage id="manage-user.add" /></div>
                            <div className="col-6">
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className="form-control" type="email"></input>
                            </div>
                            <div className="col-6">
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className="form-control" type="password"></input>
                            </div>
                            <div className="col-6">
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input className="form-control" type="text"></input>
                            </div>
                            <div className="col-6">
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input className="form-control" type="text"></input>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.phone-number" /></label>
                                <input className="form-control" type="text"></input>
                            </div>
                            <div className="col-9">
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className="form-control" type="text"></input>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control">
                                    <option value="">{intl.formatMessage({ id: 'manage-user.Choose' })}...</option>
                                    {gendersData && gendersData.length > 0 &&
                                        gendersData.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-control">
                                    <option value="">{intl.formatMessage({ id: 'manage-user.Choose' })}...</option>
                                    {positionsData && positionsData.length > 0 &&
                                        positionsData.map((item, index) => {
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
                                <select className="form-control">
                                    <option value="">{intl.formatMessage({ id: 'manage-user.Choose' })}...</option>
                                    {rolesData && rolesData.length > 0 &&
                                        rolesData.map((item, index) => {
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
                                <input className="form-control" type="text"></input>
                            </div>
                            <div className="col-12">
                                <button className='btn btn-primary'><FormattedMessage id="manage-user.save" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        genders: state.app.genders,
        positions: state.app.positions,
        roles: state.app.roles,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGender: () => dispatch(actions.fetchGender()),
        fetchPosition: () => dispatch(actions.fetchPosition()),
        fetchRole: () => dispatch(actions.fetchRole())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserRedux));