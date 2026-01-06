import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./homeFooter.scss";

class HomeFooter extends Component {

    render() {

        return (
            <div className="section-share section-home-footer" >
                <p>
                    &copy; 2025- DUC|KHAI|HUYHUY.
                    More Information,
                    <a href="https://github.com/DucTran231104" target="_blank" rel="noreferrer">
                        &#8594; please click here &#8592;
                    </a>
                </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
