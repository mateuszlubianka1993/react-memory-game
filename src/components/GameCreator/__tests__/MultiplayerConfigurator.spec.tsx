import { render, screen, fireEvent } from "@testing-library/react";
import MultiplayerConfigurator from "../components/MultiplayerConfigurator/MultiplayerConfigurator";

describe('MultiplayerConfigurator', () => {
    it('should render the ToggleSwitch component', () => {
        render(<MultiplayerConfigurator onChange={() => {}} />);
        const toggleSwitch = screen.getByLabelText('Enable multiplayer');
        expect(toggleSwitch).toBeInTheDocument();
    });

    it('should call onChange with true when the switch is turned on', () => {
        const handleChange = jest.fn();
        render(<MultiplayerConfigurator onChange={handleChange} />);
        const toggleSwitch = screen.getByLabelText('Enable multiplayer');
        fireEvent.click(toggleSwitch);
        expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('should call onChange with false when the switch is turned off', () => {
        const handleChange = jest.fn();
        render(<MultiplayerConfigurator onChange={handleChange} />);
        const toggleSwitch = screen.getByLabelText('Enable multiplayer');
        fireEvent.click(toggleSwitch);
        fireEvent.click(toggleSwitch);
        expect(handleChange).toHaveBeenCalledWith(false);
    });
});