import React from 'react';
import './PerformanceModal.css';

const PerformanceModal = ({ isOpen, onClose, pageLoadTime, imageLoadTimes }) => {
    return (
        isOpen && (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <h2>Performance Metrics</h2>
                    <p>Page Load Time: {pageLoadTime} ms</p>
                    <div className="image-load-times">
                        {imageLoadTimes.map((loadTime, index) => (
                            <p key={index} className="image-load-time">Image {index + 1} Load Time: {loadTime} ms</p>
                        ))}
                    </div>
                    <button className="close-button" onClick={onClose}>Close</button>
                </div>
            </div>
        )
    );
};

export default PerformanceModal;