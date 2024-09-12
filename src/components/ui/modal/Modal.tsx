import { FC, useRef, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import { RiCloseLargeLine } from "react-icons/ri";
import { ModalProps } from "../../../types/ui.types";
import styles from "./modal.module.scss";

const Modal: FC<ModalProps> = forwardRef(({ children, onModalClose }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const modalRoot = document.getElementById('modalRoot');

    const handleDialogClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    useImperativeHandle(ref, () => ({
        closeModal: handleDialogClose,
        openModal: () => {
            if (dialogRef.current) {
                dialogRef.current.showModal();
            }
        }
    }));

    if (!modalRoot) return null;

    return createPortal(
        <dialog className={styles.modal} ref={dialogRef} onClose={onModalClose}>
            <div className={styles.modal__header}>
                <form method="dialog">
                    <span className={styles.modal__closeButton} onClick={handleDialogClose}>
                        <RiCloseLargeLine />
                    </span>
                </form>
            </div>
            <div className={styles.modal__content}>
                {children}
            </div>
        </dialog>
    , modalRoot);
});

export default Modal;