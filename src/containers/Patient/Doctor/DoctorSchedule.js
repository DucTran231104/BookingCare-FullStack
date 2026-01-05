import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';



class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: []
        }
    }
    async componentDidMount() {
        let { language } = this.props;
        console.log('moment vi: ', moment(new Date()).format('dddd DD/MM'));
        console.log('moment en: ', moment(new Date()).locale('en').format("ddd DD/MM"));
        this.setArrDays(language)
    }
    setArrDays = (language) => {
        let arrDate = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            let date = moment(new Date()).add(i, 'days');
            if (language === LANGUAGES.VI) {
                //object.label = moment(new Date()).format('dddd DD/MM');
                let labelVi = date.format('dddd DD/MM');
                object.label = this.capitalizeFirstLetter(labelVi)

            }
            else {
                //object.label = moment(new Date()).locale('en').format("ddd DD/MM");
                let labelEn = date.locale('en').format("ddd DD/MM");
                object.label = this.capitalizeFirstLetter(labelEn)
            }
            //object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            object.value = date.startOf('day').valueOf();
            arrDate.push(object);
        }

        this.setState({
            allDays: arrDate
        })

    }
    componentDidUpdate(prevProps, prevStates, snapshot) {
        if (this.props.language != prevProps.language) {
            this.setArrDays(this.props.language)
        }
    }
    handleOnchangeSelect = async (event) => {

        console.log("check DetailDoctorFromParent: ", this.props.DetailDoctorFromParent)
        if (this.props.DetailDoctorFromParent && this.props.DetailDoctorFromParent !== -1) {
            let doctorId = this.props.DetailDoctorFromParent;
            let date = event.target.value
            let response = await getScheduleDoctorByDate(doctorId, date);
            if (response && response.errCode === 0) {
                this.setState({
                    allAvailableTime: response.data ? response.data : []
                })
            }
            console.log('check responsive:', response)
        }
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {

        let { allDays, allAvailableTime } = this.state;
        console.log("check allDays:", this.state)
        let { language } = this.props

        return (
            <React.Fragment>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <select
                            onChange={(event) => this.handleOnchangeSelect(event)}
                        >
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return <option
                                        value={item.value}
                                        key={index}>
                                        {item.label}
                                    </option>
                                })
                            }


                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className="fas fa-calendar-alt"> <span>Lịch khám</span></i>
                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                allAvailableTime.map((item, index) => {
                                    let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                    // let timeTypeData
                                    return (
                                        <button key={index}>{timeDisplay}</button>

                                    )
                                })
                                :
                                <div>Bác sĩ không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác !!</div>
                            }
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
