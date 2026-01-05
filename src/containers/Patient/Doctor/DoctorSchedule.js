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
            allDays: []
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
                object.label = date.format('dddd DD/MM');
            }
            else {
                //object.label = moment(new Date()).locale('en').format("ddd DD/MM");
                object.label = date.locale('en').format("ddd DD/MM");
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
            console.log('check responsive:', response)
        }
    }

    render() {

        let { allDays } = this.state;
        console.log("check allDays:", this.state)

        return (
            <React.Fragment>
                <div className="schedule-doctor-container">
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
