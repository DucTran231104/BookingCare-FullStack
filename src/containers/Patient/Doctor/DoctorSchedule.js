import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate, sendBookingEmail } from '../../../services/userService';
import { FormattedMessage, injectIntl } from 'react-intl';
import BookingModal from '../../../components/BookingModal/BookingModal';
import { toast } from 'react-toastify';




class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isModalOpen: false,
            selectedTime: null,
            selectedDate: null
        }
    }
    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        this.setState({
            allDays: allDays,
        })
    }
    getArrDays = (language) => {
        let arrDate = [];

        for (let i = 0; i < 7; i++) {
            let object = {};
            let date = moment().add(i, 'days');

            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let labelVi = date.format('DD/MM');
                    let today = `Hôm nay - ${labelVi}`;
                    object.label = today
                } else {
                    let labelVi = date.format('dddd DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let labelEn = date.locale('en').format('DD/MM');
                    let today = `Today - ${labelEn}`;
                    object.label = today
                } else {
                    let labelEn = date.locale('en').format('ddd DD/MM');
                    object.label = this.capitalizeFirstLetter(labelEn);
                }
            }

            object.value = date.startOf('day').valueOf();
            arrDate.push(object);
        }

        return arrDate;
    };

    async componentDidUpdate(prevProps, prevStates, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language)
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.DetailDoctorFromParent !== prevProps.DetailDoctorFromParent) {
            let allDays = this.getArrDays(this.props.language)
            let response = await getScheduleDoctorByDate(this.props.DetailDoctorFromParent, allDays[0].value);
            this.setState({
                allAvailableTime: response.data ? response.data : []
            })

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
                    allAvailableTime: response.data ? response.data : [],
                    selectedDate: date
                })
            }
        }
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    handleClickTime = (timeItem, date) => {
        let { language } = this.props;
        let timeDisplay = language === LANGUAGES.VI ? timeItem.timeTypeData.valueVi : timeItem.timeTypeData.valueEn;

        this.setState({
            isModalOpen: true,
            selectedTime: {
                ...timeItem,
                timeDisplay: timeDisplay
            },
            selectedDate: date
        });
    }

    handleCloseModal = () => {
        this.setState({
            isModalOpen: false,
            selectedTime: null,
            selectedDate: null
        });
    }

    handleConfirmBooking = async (bookingData) => {
        try {
            let response = await sendBookingEmail(bookingData);
            if (response && response.errCode === 0) {
                toast.success("Đặt lịch thành công! Email đã được gửi đến bác sĩ.");
                this.handleCloseModal();
            } else {
                toast.error(response.errMessage || "Có lỗi xảy ra khi đặt lịch!");
            }
        } catch (error) {
            console.log('Error booking:', error);
            toast.error("Có lỗi xảy ra khi đặt lịch!");
        }
    }
    render() {

        let { allDays, allAvailableTime, isModalOpen, selectedTime, selectedDate } = this.state;
        console.log("check allDays:", this.state)
        let { language, DetailDoctorFromParent } = this.props
        let currentSelectedDate = allDays.length > 0 ? allDays[0].value : null;

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
                            <i className="fas fa-calendar-alt"> <span><FormattedMessage id="patient.detail-doctor.schedule" /></span></i>
                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <React.Fragment>
                                    <div className='time-content-btns'>
                                        {allAvailableTime.map((item, index) => {
                                            let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                            let selectedDateValue = this.state.selectedDate || (allDays.length > 0 ? allDays[0].value : null);
                                            return (
                                                <button
                                                    key={index}
                                                    className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                                    onClick={() => this.handleClickTime(item, selectedDateValue)}
                                                >
                                                    {timeDisplay}
                                                </button>

                                            )
                                        })}
                                    </div>

                                    <div className='book-free'>
                                        <FormattedMessage id="patient.detail-doctor.choose" />
                                        <i class="far fa-hand-point-up"></i>
                                        <FormattedMessage id="patient.detail-doctor.book-free" />
                                    </div>
                                </React.Fragment>

                                :
                                <div className='no-schedule'>
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </div>
                            }
                        </div>
                    </div>

                </div>
                <BookingModal
                    isOpen={isModalOpen}
                    selectedTime={selectedTime}
                    doctorId={DetailDoctorFromParent}
                    selectedDate={selectedDate}
                    onClose={this.handleCloseModal}
                    onConfirm={this.handleConfirmBooking}
                />
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
