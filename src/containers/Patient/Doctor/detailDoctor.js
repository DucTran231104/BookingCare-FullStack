import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../homePage/homeHeader.js';
import './detailDoctor.scss';
import { getDetailInfoDoctorService } from '../../../services/userService.js';
import { LANGUAGES } from '../../../utils/constant.js';
import DoctorSchedule from './DoctorSchedule';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DetailDoctor: {},
            currentDetailDoctorById: -1

        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let response = await getDetailInfoDoctorService(id);
            this.setState({
                currentDetailDoctorById: id,
            })
            console.log('check data detail doctor:', response);
            if (response && response.errCode === 0) {
                this.setState({
                    DetailDoctor: response.data,
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevStates, snapshot) {

    }

    render() {
        console.log('check state detail doctor:', this.state);
        let { DetailDoctor } = this.state;
        let { language } = this.props;
        let nameVi = '';
        let nameEn = '';
        if (DetailDoctor && DetailDoctor.positionData) {
            nameVi = `${DetailDoctor.positionData.valueVi}, ${DetailDoctor.firstName} ${DetailDoctor.lastName}`;
            nameEn = `${DetailDoctor.positionData.valueEn}, ${DetailDoctor.lastName} ${DetailDoctor.firstName}`;
        }
        return (
            <React.Fragment>
                <HomeHeader
                    isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left' style={{ backgroundImage: `url(${DetailDoctor && DetailDoctor.image ? DetailDoctor.image : ''})` }}
                        >

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {DetailDoctor && DetailDoctor.Markdown && DetailDoctor.Markdown.description &&
                                    <span>
                                        {DetailDoctor.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                DetailDoctorFromParent={this.state.currentDetailDoctorById} />
                        </div>

                        <div className='content-right'>

                        </div>
                    </div>
                    <div className='detail-info-doctor'>
                        {DetailDoctor && DetailDoctor.Markdown && DetailDoctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: DetailDoctor.Markdown.contentHTML }}></div>
                        }
                    </div>
                    <div className='comment-doctor'>

                    </div>
                </div>
            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {

    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
