import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Specialty.scss';
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
import "./Specialty.scss"
import Slider from "react-slick";
//import picture
import specialtyImg from '../../../assets/Specialty/CoXuongKhop.jpg';
import specialtyImg2 from '../../../assets/Specialty/tieu-hoa.png';
class Specialty extends Component {

    render() {
        let settings = this.props.settings

        return (
            <div className="section-share section-specialty" >
                <div className="section-container" >
                    <div className='section-header' >
                        <span className='title-section' >Chuyên khoa phổ biến</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            <div className='section-customize ' >
                                <div className='bg-img section-img-specialty' />
                                <div>Cơ xương khớp 1</div>
                            </div>
                            {/* <div className='img-customize img-1'><h3>1</h3></div> */}
                            <div className='section-customize' >
                                <div className='bg-img section-img-specialty' />
                                <div>Cơ xương khớp 2</div>
                            </div>
                            <div className='section-customize' >
                                <div className='bg-img section-img-specialty' />
                                <div>Tiêu Hóa</div>
                            </div>
                            <div className='section-customize' >
                                <div className='bg-img section-img-specialty' />
                                <div>Cơ xương khớp 4</div>
                            </div>
                            <div className='section-customize' >
                                <div className='bg-img section-img-specialty' />
                                <div>Cơ xương khớp 5</div>
                            </div>
                            <div className='section-customize' >
                                <div className='bg-img section-img-specialty' />
                                <div>Cơ xương khớp 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
