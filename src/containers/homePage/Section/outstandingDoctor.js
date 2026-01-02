import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './outstandingDoctor.scss';
// Old way (v4.7.0)
import 'font-awesome/css/font-awesome.min.css';
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
class OutstandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }

    render() {
        let { language } = this.props;
        let arrDoctors = this.state.arrDoctors
        let settings = this.props.settings
        return (
            <div className="section-share section-outstanding-doctor" >
                <div className="section-container" >
                    {/* <div className='section-header' >
                        <span className='title-section' >Bác sĩ nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div> */}
                    <div className='section-body'>
                        <Slider {...settings}>

                            {arrDoctors && arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                                    let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;
                                    return (
                                        <div className='section-customize customize-outstanding-doctor' key={index} >
                                            <div className="outer-bg">
                                                <div className='bg-img section-img-outstanding-doctor'
                                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                                />
                                            </div>
                                            <div className='position text-center'>
                                                <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                <div>Răng hàm mặt</div>
                                            </div>
                                        </div>
                                    )
                                }
                                )}
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
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
