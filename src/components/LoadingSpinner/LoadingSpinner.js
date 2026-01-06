import React from 'react';
import { FormattedMessage } from 'react-intl';
import './LoadingSpinner.scss';

const LoadingSpinner = ({ message }) => {
    return (
        <div className="loading-spinner-container">
            <div className="loading-spinner">
                <div className="spinner">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
            {message && (
                <div className="loading-message">
                    {message}
                </div>
            )}
        </div>
    );
};

export default LoadingSpinner;

