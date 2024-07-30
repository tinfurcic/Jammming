import React, { useEffect, useRef } from 'react';
import styles from './WarningModal.module.css';

const WarningModal = ({ isOpen, onClose, onYes, onNo }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            const modalElement = modalRef.current;
            const focusableElements = modalElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }

            const handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    onClose();
                }

                // Focus trapping logic
                if (e.key === 'Tab') {
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];

                    if (e.shiftKey) { // Shift + Tab
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else { // Tab
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            };

            modalElement.addEventListener('keydown', handleKeyDown);

            return () => {
                modalElement.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} ref={modalRef} onClick={(e) => e.stopPropagation()}>
                <h2>Warning</h2>
                <p className={styles.specialStupid}>Opening a playlist will discard your current playlist draft.</p>
                <p className={styles.specialStupid}>Are you sure you want to proceed?</p>
                <div className={styles.buttonsSection} >
                    <div className={styles.buttonContainer} >
                        <button className={`${styles.button} ${styles.yes}`} onClick={() => { onYes(); onClose(); }}>Yes</button>
                    </div>
                    <div className={styles.buttonContainer} >
                        <button className={`${styles.button} ${styles.no}`} onClick={() => { onNo(); onClose(); }}>No</button>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default WarningModal;
