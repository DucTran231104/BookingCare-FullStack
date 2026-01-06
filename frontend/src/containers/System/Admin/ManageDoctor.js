import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss'
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES, CRUD_ACTIONS, USER_ROLE } from '../../../utils';
import { getAllDoctors } from '../../../services/userService';
import { getDetailInfoDoctorService } from '../../../services/userService';
import { FormattedMessage, injectIntl } from 'react-intl';
import { has } from 'lodash';



const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            // listPrice: [],
            // listPayment: [],
            // listProvince: [],
            // selectedPrice: '',
            // selectedPayment: '',
            // selectProvince: '',
            // nameClinic: '',
            // addressClinic: '',
            // note: ''

        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
        // this.props.getAllRequiredDoctorInfo();
    }
    componentDidUpdate(prevProps, prevStates, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors || prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);

            // Mặc định danh sách bác sĩ
            let newState = {
                listDoctors: dataSelect
            };

            const { userInfo } = this.props;

            // Nếu là bác sĩ (R2) thì tự động chọn chính mình và khóa select
            if (userInfo && userInfo.roleId === USER_ROLE.DOCTOR && this.props.allDoctors) {
                const currentDoctor = this.props.allDoctors.find(
                    (item) => item.email === userInfo.email
                );
                if (currentDoctor) {
                    const labelEn = `${currentDoctor.lastName} ${currentDoctor.firstName}`;
                    const labelVi = `${currentDoctor.firstName} ${currentDoctor.lastName}`;
                    const doctorOption = {
                        value: currentDoctor.id,
                        label: this.props.language === LANGUAGES.VI ? labelVi : labelEn
                    };
                    newState.selectedDoctor = doctorOption;
                    newState.listDoctors = [doctorOption];

                    // Tự động load thông tin markdown của bác sĩ hiện tại
                    this.handleChangeSelect(doctorOption);
                }
            }

            this.setState(newState);
        }
        // if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
        //     let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfo;

        //     let dataSelectPrice = this.buildDataInputSelect(resPrice);
        //     let dataSelectPayment = this.buildDataInputSelect(resPayment);
        //     let dataSelectProvince = this.buildDataInputSelect(resProvince);

        //     console.log('<<<<<<<<<<data new>>>>:', dataSelectPrice, dataSelectPayment, dataSelectProvince)
        //     this.setState({
        //         listPrice: dataSelectPrice,
        //         listPayment: dataSelectPayment,
        //         listProvince: dataSelectProvince,
        //     })
        // }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailInfoDoctorService(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
    };
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        const { selectedDoctor } = this.state;
        if (!selectedDoctor) {
            alert('Vui lòng chọn bác sĩ');
            return;
        }
        let success = this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            id: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        });
        if (success) {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                selectedDoctor: '',
                hasOldData: false
            })
        }

    }
    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    buildDataInputSelect = (inputData) => {
        // add type key
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
    render() {
        let { hasOldData } = this.state;
        console.log('check state:', this.state)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder='Chon Bac si'
                            // Nếu là bác sĩ thì khóa select (chỉ cho phép sửa thông tin của chính mình)
                            isDisabled={this.props.userInfo && this.props.userInfo.roleId === USER_ROLE.DOCTOR}
                        />
                    </div>
                    <div className='content-right form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.info-intro" /></label>
                        <textarea className='form-control' row="4"
                            onChange={(event) => this.handleOnChangeDescription(event)}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                {/* <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <label>Chọn giá</label>
                        <Select
                            value={this.state.dataSelectPrice}
                            onChange={this.handleChangeSelect}
                            options={this.state.listPrice}
                            placeholder={'Chọn giá'}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Chọn phương thức toán</label>
                        <Select
                            value={this.state.dataSelectPayment}
                            onChange={this.handleChangeSelect}
                            options={this.state.listPayment}
                            placeholder={'Chọn phương thức toán'}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Chọn tỉnh thành</label>
                        <Select
                            value={this.state.dataSelectProvince}
                            onChange={this.handleChangeSelect}
                            options={this.state.listProvince}
                            placeholder={'Chọn tỉnh thành'}
                        />
                    </div>

                    <div className="col-4 form-group">
                        <label>Tên phòng khám </label>
                        <input className="form-control" />
                    </div>
                    <div className="col-4 form-group">
                        <label>Địa chỉ phòng khám</label>
                        <input className="form-control" />
                    </div>
                    <div className="col-4 form-group">
                        <label>Lưu ý</label>
                        <input className="form-control" />
                    </div>
                </div> */}


                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown} />
                </div>
                <button className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                    onClick={() => this.handleSaveContentMarkdown()}>
                    {hasOldData === true ? 'Luu thong tin' : 'Tao thong tin'}
                </button>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        userInfo: state.user.userInfo,
        // allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
        // getAllRequiredDoctorInfo: () => dispatch(actions.getRequireDoctorInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
