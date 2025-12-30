import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./About.scss";

class About extends Component {

    render() {

        return (
            <div className="section-share section-about" >
                hello about
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
