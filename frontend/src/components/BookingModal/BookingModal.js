import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { toast } from 'react-toastify';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            phoneNumber: '',
            isSubmitting: false
        }
    }

    handleOnChangeInput = (event, id) => {
        let value = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = value;
        this.setState({
            ...stateCopy
        })
    }

    handleConfirmBooking = async () => {
        let { fullName, email, phoneNumber } = this.state;
        let { selectedTime, doctorId, selectedDate } = this.props;

        // Validate
        if (!fullName || !email || !phoneNumber) {
            toast.error("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        // Validate email format
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Email không hợp lệ!");
            return;
        }

        // Validate phone number (basic validation)
        let phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(phoneNumber)) {
            toast.error("Số điện thoại không hợp lệ!");
            return;
        }

        this.setState({ isSubmitting: true });

        try {
            let data = {
                doctorId: doctorId,
                timeType: selectedTime.timeType,
                date: selectedDate,
                patientName: fullName,
                patientEmail: email,
                patientPhone: phoneNumber
            };

            if (this.props.onConfirm) {
                await this.props.onConfirm(data);
            }
        } catch (error) {
            console.log('Error booking:', error);
            toast.error("Có lỗi xảy ra khi đặt lịch!");
        } finally {
            this.setState({ isSubmitting: false });
        }
    }

    handleCloseModal = () => {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        let { isOpen, selectedTime } = this.props;
        let { fullName, email, phoneNumber, isSubmitting } = this.state;

        if (!isOpen) {
            return null;
        }

        return (
            <div className="booking-modal-overlay" onClick={this.handleCloseModal}>
                <div className="booking-modal-container" onClick={(e) => e.stopPropagation()}>
                    <div className="booking-modal-header">
                        <h3>Đặt lịch khám</h3>
                        <span className="close-btn" onClick={this.handleCloseModal}>
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="booking-modal-body">
                        {selectedTime && (
                            <div className="selected-time-info">
                                <p><strong>Thời gian đã chọn:</strong> {selectedTime.timeDisplay}</p>
                            </div>
                        )}
                        <div className="form-group">
                            <label>Họ và tên *</label>
                            <input
                                type="text"
                                className="form-control"
                                value={fullName}
                                onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                placeholder="Nhập họ và tên"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email *</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                placeholder="Nhập email"
                            />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại *</label>
                            <input
                                type="tel"
                                className="form-control"
                                value={phoneNumber}
                                onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                placeholder="Nhập số điện thoại"
                            />
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button
                            className="btn btn-secondary"
                            onClick={this.handleCloseModal}
                            disabled={isSubmitting}
                        >
                            Hủy
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={this.handleConfirmBooking}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Đang gửi...' : 'Gửi'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookingModal;

