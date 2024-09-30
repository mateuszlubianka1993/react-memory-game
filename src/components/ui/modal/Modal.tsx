import { FC, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { RiCloseLargeLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { ModalProps } from "../../../types/ui.types";
import styles from "./modal.module.scss";

function createWrapper(wrapperId: string) {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
}

const Modal: FC<ModalProps> = ({ children, wrapperId = 'modalRoot', onModalClose }) => {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        let systemCreated = false;

        if (!element) {
            systemCreated = true;
            element = createWrapper(wrapperId);
        }
        setWrapperElement(element);
    
        return () => {
            if (systemCreated && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }
    }, [wrapperId]);

    const handleModalClose = () => {
        onModalClose && onModalClose();
    };

    if (!wrapperElement) return null;

    return createPortal(
        <>
            <div className={styles.modal__overlay} onClick={handleModalClose} />
            <motion.dialog
                className={styles.modal}
                onClose={handleModalClose}
                key={Math.random()}
                initial={{ opacity: 0, y: 80, x: 80, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                exit={{ opacity: 0, y: 80, x: 80, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                open
            >
                <div className={styles.modal__content}>
                    <div className={styles.modal__header}>
                        <form method="dialog">
                            <span
                                className={styles.modal__closeButton}
                                onClick={handleModalClose}
                                role="button"
                            >
                                <RiCloseLargeLine />
                            </span>
                        </form>
                    </div>
                    <div>{children}</div>
                </div>
            </motion.dialog>
        </>,
    wrapperElement
    );
};

export default Modal;
