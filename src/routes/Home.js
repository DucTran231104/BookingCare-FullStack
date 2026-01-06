import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { USER_ROLE } from '../utils';

class Home extends Component {

    render() {
        const { isLoggedIn, userInfo } = this.props;

        let linkToRedirect = '/home';

        if (isLoggedIn) {
            // Điều hướng sau khi login theo role
            if (userInfo && userInfo.roleId === USER_ROLE.DOCTOR) {
                // Bác sĩ: chuyển thẳng tới quản lý lịch khám
                linkToRedirect = '/doctor/manage-schedule';
            } else {
                // Admin hoặc các role khác: vào trang quản lý user
                linkToRedirect = '/system/user-manage';
            }
        }

        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
