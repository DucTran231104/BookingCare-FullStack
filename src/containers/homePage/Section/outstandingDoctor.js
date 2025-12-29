import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './outstandingDoctor.scss';
// Old way (v4.7.0)
import 'font-awesome/css/font-awesome.min.css';

// <i className="fa fa-user"></i>

// New way (v5)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
// <FontAwesomeIcon icon={faUser} />
import { faTooth } from '@fortawesome/free-solid-svg-icons';

import { faHospital } from '@fortawesome/free-solid-svg-icons';
import { faMobile } from '@fortawesome/free-solid-svg-icons';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { faMedkit } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import "./outstandingDoctor.scss"
import Slider from "react-slick";
class outstandingDoctor extends Component {

    render() {
        let settings = this.props.settings
        return (
            <div className="section-share section-outstanding-doctor" >
                <div className="section-container" >
                    <div className='section-header' >
                        <span className='title-section' >Bác sĩ nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            <div className='section-customize ' >
                                <div className="outer-bg">
                                    <div className='bg-img section-img-outstanding-doctor' />
                                </div>
                                <div className='position text-center'>
                                    <div>PhD.Trần Thái Trọng Đức</div>
                                    <div>Răng hàm mặt</div>
                                </div>
                            </div>
                            <div className='section-customize' >
                                <div className="outer-bg">
                                    <div className='bg-img section-img-outstanding-doctor' />
                                </div>
                                <div className='position text-center'>
                                    <div>PhD.Trần Thái Trọng Đức 1</div>
                                    <div>Răng hàm mặt</div>
                                </div>
                            </div>
                            <div className='section-customize' >
                                <div className="outer-bg">
                                    <div className='bg-img section-img-outstanding-doctor' />
                                </div>
                                <div className='position text-center'>
                                    <div>PhD.Trần Thái Trọng Đức 2</div>
                                    <div>Răng hàm mặt</div>
                                </div>
                            </div>
                            <div className='section-customize' >
                                <div className="outer-bg">
                                    <div className='bg-img section-img-outstanding-doctor' />
                                </div>
                                <div className='position text-center'>
                                    <div>PhD.Trần Thái Trọng Đức 3</div>
                                    <div>Răng hàm mặt</div>
                                </div>
                            </div>
                            <div className='section-customize' >
                                <div className="outer-bg">
                                    <div className='bg-img section-img-outstanding-doctor' />
                                </div>
                                <div className='position text-center'>
                                    <div>PhD.Trần Thái Trọng Đức 4</div>
                                    <div>Răng hàm mặt</div>
                                </div>
                            </div>
                            <div className='section-customize' >
                                <div className="outer-bg">
                                    <div className='bg-img section-img-outstanding-doctor' />
                                </div>
                                <div className='position text-center'>
                                    <div>PhD.Trần Thái Trọng Đức 5</div>
                                    <div>Răng hàm mặt</div>
                                </div>
                            </div>
                            <div className='section-customize' >
                                <div className="outer-bg">
                                    <div className='bg-img section-img-outstanding-doctor' />
                                </div>
                                <div className='position text-center'>
                                    <div>PhD.Trần Thái Trọng Đức 6</div>
                                    <div>Răng hàm mặt</div>
                                </div>
                            </div>
                        </Slider>
                    </div>

                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(outstandingDoctor);
