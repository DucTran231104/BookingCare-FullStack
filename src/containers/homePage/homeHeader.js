import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './homeHeader.scss';
// Old way (v4.7.0)
import 'font-awesome/css/font-awesome.min.css';

// <i className="fa fa-user"></i>

// New way (v5)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
// <FontAwesomeIcon icon={faUser} />
import { faTooth } from '@fortawesome/free-solid-svg-icons';

import { faHospital } from '@fortawesome/free-solid-svg-icons';
import { faMobile } from '@fortawesome/free-solid-svg-icons';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { faMedkit } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/bookingcare-2020.svg';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import LanguageUtils from '../../utils/LanguageUtils';
import { changeLanguageApp } from '../../store/actions';
import { useInsertionEffect } from 'react';

class homeHeader extends Component {

    changeLanguage = (language) => {
        // alert("Change language to: " + language);
        //fire redux even: actions
        this.props.changeLanguageAppRedux(language);
    }
    render() {
        let language = this.props.language;
        console.log("check userInfo from redux: ", this.props.userInfo);
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='home-header-content-left'>
                            <i className='fa fa-bars btn-bars'></i>
                            <img src={logo} alt='logo' className='home-header-content-left-logo'></img>

                        </div>

                        <div className='home-header-content-center'>
                            <div className='child-content'>
                                <div><b> <FormattedMessage id="home-header.speciality" /></b></div>
                                <div className='sub-title'>
                                    <FormattedMessage id="home-header.search-doctor" />
                                </div>
                            </div>

                            <div className='child-content'>

                                <div>
                                    <b><FormattedMessage id="home-header.medical-facility" /></b>
                                </div>

                                <div className='sub-title'>
                                    <FormattedMessage id="home-header.choose-hospital"></FormattedMessage>
                                </div>
                            </div>

                            <div className='child-content'>

                                <div>
                                    <b><FormattedMessage id="home-header.doctor"></FormattedMessage></b>
                                </div>

                                <div className='sub-title'>
                                    <FormattedMessage id="home-header.choose-doctor"></FormattedMessage>
                                </div>
                            </div>

                            <div className='child-content'>

                                <div>
                                    <b><FormattedMessage id="home-header.medical-examination-package"></FormattedMessage></b>
                                </div>
                                <div className='sub-title'><FormattedMessage id="home-header.general-health-check"></FormattedMessage>
                                </div>
                            </div>


                        </div>

                        <div className='home-header-content-right'>

                            <div className='support'> <i className="fa fa-question-circle question-icon" ></i><FormattedMessage id="home-header.support"></FormattedMessage></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)} >VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)} >EN</span></div>
                        </div>
                    </div>
                </div>

                <div className='home-header-banner'>
                    <div className='content-up'>

                        <div className='title1'>
                            <FormattedMessage id="banner.flatform"></FormattedMessage>

                        </div>

                        <div className='title2'>
                            <FormattedMessage id="banner.health-care"></FormattedMessage>

                        </div>

                        <div className='search'>
                            <section className='search-container'>
                                <label className='search-field'>
                                    <FontAwesomeIcon icon={faSearch} />
                                    <input type='text'
                                        className='search-input'
                                        placeholder={LanguageUtils.getMessageByKey("banner.search-placeholder", language)}
                                    />
                                </label>

                            </section>


                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='option'>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <FontAwesomeIcon icon={faHospital} />
                                </div>
                                <div className='text-child'>

                                    <span><FormattedMessage id="banner.child1"></FormattedMessage></span>

                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <FontAwesomeIcon icon={faMobile} />
                                </div>

                                <div className='text-child'>
                                    <span><FormattedMessage id="banner.child2"></FormattedMessage></span>

                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <FontAwesomeIcon icon={faBed} />
                                </div>
                                <div className='text-child'>
                                    <span><FormattedMessage id="banner.child3"></FormattedMessage></span>

                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <FontAwesomeIcon icon={faMedkit} />
                                </div>
                                <div className='text-child'>
                                    <span><FormattedMessage id="banner.child4"></FormattedMessage></span>

                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className='far fa-comments' />
                                </div>
                                <div className='text-child'>
                                    <span><FormattedMessage id="banner.child5"></FormattedMessage></span>

                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <FontAwesomeIcon icon={faTooth} />
                                </div>
                                <div className='text-child'>
                                    <span><FormattedMessage id="banner.child6"></FormattedMessage></span>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)) //dispatch action to change language
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(homeHeader);
