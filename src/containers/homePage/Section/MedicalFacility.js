import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./MedicalFacility.scss";
import "./Specialty.scss"
import Slider from "react-slick";
import medicalFacility from '../../../assets/MedicalFacility/BenhVienBachMai.jpg';
import medicalFacility2 from '../../../assets/Specialty/tieu-hoa.png';

class MedicalFacility extends Component {

    render() {
        let settings = this.props.settings

        return (
            <div className="section-share section-medical-facility" >
                <div className="section-container" >
                    <div className='section-header' >
                        <span className='title-section' >Chuyên khoa phổ biến</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            <div className='section-customize' >
                                <div className='bg-img section-img-medical-facility' />
                                <div>bệnh viện bạch mai</div>
                            </div>
                            {/* <div className='img-customize img-1'><h3>1</h3></div> */}
                            <div className='section-customize' >
                                <div className='bg-img section-img-medical-facility' />
                                <div>bệnh viện bạch mai2</div>
                            </div>
                            <div className='section-customize' >
                                <div className='bg-img section-img-medical-facility' />
                                <div>bệnh viện bạch mai3</div>
                            </div>
                            <div className='section-customize' >
                                <div className='bg-img section-img-medical-facility' />
                                <div>bệnh viện bạch mai 4</div>
                            </div>
                            <div className='section-customize' >
                                <div className='bg-img section-img-medical-facility' />
                                <div>bệnh viện bạch mai 5</div>
                            </div>
                            <div className='section-customize' >
                                <div className='bg-img section-img-medical-facility' />
                                <div>bệnh viện bạch mai 6</div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
