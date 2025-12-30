import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './OutstandingDoctor.scss';
// Old way (v4.7.0)
import 'font-awesome/css/font-awesome.min.css';
import Slider from "react-slick";
class OutstandingDoctor extends Component {

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
                            <div className='section-customize customize-outstanding-doctor' >
                                <div className="outer-bg">
                                    <div className='bg-img section-img-outstanding-doctor' />
                                </div>
                                <div className='position text-center'>
                                    <div>PhD.Trần Thái Trọng Đức</div>
                                    <div>Răng hàm mặt</div>
                                </div>
                            </div>
                            <div className='section-customize customize-outstanding-doctor' >
                                <div className="outer-bg">
                                    <div className='bg-img section-img-outstanding-doctor' />
                                </div>
                                <div className='position text-center'>
                                    <div>PhD.Trần Thái Trọng Đức 1</div>
                                    <div>Răng hàm mặt</div>
                                </div>
                            </div>
                            <div className='section-customize customize-outstanding-doctor' >
                                <div className="outer-bg">
                                    <div className='bg-img section-img-outstanding-doctor' />
                                </div>
                                <div className='position text-center'>
                                    <div>PhD.Trần Thái Trọng Đức 2</div>
                                    <div>Răng hàm mặt</div>
                                </div>
                            </div>
                            <div className='section-customize customize-outstanding-doctor' >
                                <div className="outer-bg">
                                    <div className='bg-img section-img-outstanding-doctor' />
                                </div>
                                <div className='position text-center'>
                                    <div>PhD.Trần Thái Trọng Đức 3</div>
                                    <div>Răng hàm mặt</div>
                                </div>
                            </div>
                            <div className='section-customize customize-outstanding-doctor' >
                                <div className="outer-bg">
                                    <div className='bg-img section-img-outstanding-doctor' />
                                </div>
                                <div className='position text-center'>
                                    <div>PhD.Trần Thái Trọng Đức 4</div>
                                    <div>Răng hàm mặt</div>
                                </div>
                            </div>
                            <div className='section-customize customize-outstanding-doctor' >
                                <div className="outer-bg">
                                    <div className='bg-img section-img-outstanding-doctor' />
                                </div>
                                <div className='position text-center'>
                                    <div>PhD.Trần Thái Trọng Đức 5</div>
                                    <div>Răng hàm mặt</div>
                                </div>
                            </div>
                            <div className='section-customize customize-outstanding-doctor' >
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
