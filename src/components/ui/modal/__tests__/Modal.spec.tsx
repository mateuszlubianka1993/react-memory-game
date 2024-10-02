import { render, fireEvent } from "@testing-library/react";
import Modal from "../Modal";

describe('Modal Component', () => {
    const onModalCloseMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the modal with children', () => {
        const { getByText } = render(
            <Modal onModalClose={onModalCloseMock}>
                <div>Modal Content</div>
            </Modal>
        );

        expect(getByText('Modal Content')).toBeInTheDocument();
    });

    it('should call onModalClose when overlay is clicked', () => {
        const { getByRole } = render(
            <Modal onModalClose={onModalCloseMock}>
                <div>Modal Content</div>
            </Modal>
        );

        fireEvent.click(getByRole('dialog').previousSibling!);
        expect(onModalCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should call onModalClose when close button is clicked', () => {
        const { getByRole } = render(
            <Modal onModalClose={onModalCloseMock}>
                <div>Modal Content</div>
            </Modal>
        );

        fireEvent.click(getByRole('button'));
        expect(onModalCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should create and remove wrapper element dynamically', () => {
        const wrapperId = 'testWrapper';
        const { unmount } = render(
            <Modal wrapperId={wrapperId} onModalClose={onModalCloseMock}>
                <div>Modal Content</div>
            </Modal>
        );

        const wrapperElement = document.getElementById(wrapperId);
        expect(wrapperElement).not.toBeNull();

        unmount();
        expect(document.getElementById(wrapperId)).toBeNull();
    });
});