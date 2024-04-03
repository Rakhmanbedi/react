import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './ImageGallery.css';
import PerformanceModal from './PerformanceModal';

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [pageLoadTime, setPageLoadTime] = useState(0);
    const [imageLoadTimes, setImageLoadTimes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('https://api.unsplash.com/photos', {
                    params: {
                        client_id: '_kI7NXyrIZjVK0iAyoovk_EQjy8Ey4qsQg77eNRZRPI',
                        per_page: 26
                    }
                });
                setImages(response.data);
                const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
                setPageLoadTime(loadTime);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const openModal = () => {
        setModalOpen(true);
        const imgLoadTimes = images.map(image => window.performance.getEntriesByName(image.urls.regular)[0].duration);
        setImageLoadTimes(imgLoadTimes);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="image-gallery">
            {images.map(image => (
                <LazyLoadImage
                    key={image.id}
                    src={image.urls.regular}
                    alt={image.alt_description || 'Image'}
                    effect="blur"
                    width="auto"
                    height="auto"
                    onLoad={() => {
                        const imgLoadTime = window.performance.getEntriesByName(image.urls.regular)[0].duration;
                        console.log(`Image ${image.id} load time: ${imgLoadTime} ms`);
                    }}
                />
            ))}
            <div className="page-load-time" onClick={openModal}>
                Page Load Time: {pageLoadTime} ms
            </div>
            <PerformanceModal
                isOpen={modalOpen}
                onClose={closeModal}
                pageLoadTime={pageLoadTime}
                imageLoadTimes={imageLoadTimes}
            />
        </div>
    );
};

export default ImageGallery;