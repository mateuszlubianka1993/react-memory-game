import { render, fireEvent } from "@testing-library/react";
import ToggleSwitch from "../ToggleSwitch";
import { ToggleSwitchProps } from "../../../../types";

describe('ToggleSwitch', () => {
    const defaultProps: ToggleSwitchProps = {
        label: 'Test Label',
        id: 'test-toggle',
        btnLabels: { yes: 'On', no: 'Off' },
        onChange: jest.fn(),
    };

    it('renders without crashing', () => {
        const { getByLabelText } = render(<ToggleSwitch {...defaultProps} />);
        expect(getByLabelText('Test Label')).toBeInTheDocument();
    });

    it('toggles the switch when clicked', () => {
        const { getByLabelText } = render(<ToggleSwitch {...defaultProps} />);
        const checkbox = getByLabelText('Test Label') as HTMLInputElement;

        expect(checkbox.checked).toBe(false);
        fireEvent.click(checkbox);
        expect(checkbox.checked).toBe(true);
        fireEvent.click(checkbox);
        expect(checkbox.checked).toBe(false);
    });

    it('calls onChange with the correct value when toggled', () => {
        const onChangeMock = jest.fn();
        const { getByLabelText } = render(<ToggleSwitch {...defaultProps} onChange={onChangeMock} />);
        const checkbox = getByLabelText('Test Label') as HTMLInputElement;

        fireEvent.click(checkbox);
        expect(onChangeMock).toHaveBeenCalledWith(true);
        fireEvent.click(checkbox);
        expect(onChangeMock).toHaveBeenCalledWith(false);
    });

    it('displays the correct button labels', () => {
        const { container } = render(<ToggleSwitch {...defaultProps} />);
        const checkedLabel = container.querySelector('[data-checked]')?.getAttribute('data-checked');
        const uncheckedLabel = container.querySelector('[data-unchecked]')?.getAttribute('data-unchecked');

        expect(checkedLabel).toBe('On');
        expect(uncheckedLabel).toBe('Off');
    });
});