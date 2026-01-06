import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./About.scss";

class About extends Component {

    render() {

        return (
            <div className="section-share section-about" >
                <div className="section-about-header" >
                    Truyền thông nói về DukeTran & HuyHuy & KhaiTran
                </div>
                <div className="section-about-content" >
                    <div className="content-left" >
                        <iframe width="100%" height="400"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?list=RDdQw4w9WgXcQ"
                            title="Rick Astley - Never Gonna Give You Up (Official Video) (4K Remaster)"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen></iframe>
                    </div>
                    <div className="content-right" >
                        <p>
                            In conventional electronics, only the charge degree of freedom of an election is utilized to
                            construct devices. The electron also possesses a spin angular momentum which is closely
                            associated with its magnetic moment. The field of spintronics, or spin-based electronics, exploits
                            both charge and spin degrees of freedom of electrons to provide additional functionalities to
                            conventional electronic devices such as non-volatility and reduced power consumption.
                        </p>

                    </div>
                </div>
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
