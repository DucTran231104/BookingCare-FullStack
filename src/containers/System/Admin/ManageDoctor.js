import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss'
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import { getAllDoctors } from '../../../services/userService';
import { getDetailInfoDoctorService } from '../../../services/userService';
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
            hasOldData: false

        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
    }
    componentDidUpdate(prevProps, prevStates, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);

            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);

            this.setState({
                listDoctors: dataSelect
            })
        }
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
        console.log('check res', res);
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
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Tao thong tin bac si
                </div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label>Chon bac si:</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className='content-right form-group'>
                        <label>Thong tin gioi thieu:</label>
                        <textarea className='form-control  ' row="4"
                            onChange={(event) => this.handleOnChangeDescription(event)}
                            value={this.state.description}
                        >
                            aaaaaaaaaaaaaaa
                        </textarea>
                    </div>

                </div>
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

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
