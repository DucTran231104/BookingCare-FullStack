import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import moment from 'moment';
import _ from 'lodash';


import Select from 'react-select';
import { range } from 'lodash';


class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        // const currentDate = new Date();
        // currentDate.setHours(0, 0, 0, 0);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            // currentDate: currentDate,
            currentDate: '',
            rangeTime: []
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }
    componentDidUpdate(prevProps, prevStates, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);

            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                // data.map(item => {
                //     item.isSelected = false;
                //     return item;
                // }
                // )
                data = data.map(item => ({ ...item, isSelected: false }))

            }
            this.setState({
                rangeTime: data
            })
        }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelEn = `${item.lastName} ${item.firstName}`;
                let labelVi = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });

    };
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    handleClickBntTime = (time) => {
        let { rangeTime } = this.state;

        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                    return item;
                }
                return item;
            })

        }
        this.setState({
            rangeTime: rangeTime
        })
    }
    handleSaveSchedule = () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error("Invalid date!");
            return;
        }
        if (!selectedDoctor || _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selected doctor!");
            return;
        }
        let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formattedDate;
                    object.time = schedule.keyMap;
                    result.push(object);
                })
            } else {
                toast.error("Invalid selected time!");
                return;
            }
        }
        console.log('check data save', result);

    }
    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;

        return (
            < div className='manage-schedule-container' >
                <div className='m-s-title'>
                    <FormattedMessage id='manage-schedule.title' />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6'>
                            <label>
                                <FormattedMessage id='manage-schedule.select-doctor' />
                            </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-6'>
                            <label>
                                <FormattedMessage id='manage-schedule.select-date' />
                            </label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                value={this.state.currentDate}
                                className="form-control"
                                minDate={new Date()}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => this.handleClickBntTime(item)}
                                            className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })}
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleSaveSchedule()}
                            ><FormattedMessage id='manage-schedule.save-info' /></button>
                        </div>

                    </div>
                </div>

            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
