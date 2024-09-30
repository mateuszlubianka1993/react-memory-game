import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../Input";
import { InputProps } from "../../../../types/ui.types";

describe('Input Component', () => {
    const defaultProps: InputProps = {
        label: 'Test Label',
        value: '',
        placeholder: 'Enter text',
        onChange: jest.fn(),
        onBlur: jest.fn(),
        error: false,
    };

    it('should render the input with label', () => {
        render(<Input {...defaultProps} />);
        expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    });

    it('should render the input without label', () => {
        render(<Input {...defaultProps} label={undefined} />);
        expect(screen.queryByLabelText('Test Label')).not.toBeInTheDocument();
    });

    it('should call onChange when input value changes', () => {
        render(<Input {...defaultProps} />);
        const inputElement = screen.getByPlaceholderText('Enter text');
        fireEvent.change(inputElement, { target: { value: 'New Value' } });
        expect(defaultProps.onChange).toHaveBeenCalled();
    });

    it('should call onBlur when input loses focus', () => {
        render(<Input {...defaultProps} />);
        const inputElement = screen.getByPlaceholderText('Enter text');
        fireEvent.blur(inputElement);
        expect(defaultProps.onBlur).toHaveBeenCalled();
    });

    it('should apply error class when error is true', () => {
        render(<Input {...defaultProps} error={true} />);
        const inputElement = screen.getByPlaceholderText('Enter text');
        expect(inputElement).toHaveClass(/error/);
    });

    it('should not apply error class when error is false', () => {
        render(<Input {...defaultProps} error={false} />);
        const inputElement = screen.getByPlaceholderText('Enter text');
        expect(inputElement).not.toHaveClass(/error/);
    });
});