import { render, screen, fireEvent } from "@testing-library/react";
import ModeItem from "../components/ModeItem/ModeItem";
import { getRandomCardByMode } from "../../../helpers/createDeck";
import { ModeItemProps } from "../../../types";
// import styles from "../components/ModeItem/modeItem.module.scss";

jest.mock('../../../helpers/createDeck', () => ({
    getRandomCardByMode: jest.fn(),
}));

const mockCard = {
    id: '1',
    name: 'Test Card',
    img: 'test-card.jpg',
};

describe('ModeItem Component', () => {
    const defaultProps: ModeItemProps = {
        modeName: 'Easy',
        active: false,
        onClick: jest.fn(),
    };

    beforeEach(() => {
        (getRandomCardByMode as jest.Mock).mockReturnValue(mockCard);
    });

    it('should render without crashing', () => {
        render(<ModeItem {...defaultProps} />);
        expect(screen.getByText('Easy')).toBeInTheDocument();
    });

    it('should display the card image and name', () => {
        render(<ModeItem {...defaultProps} />);
        expect(screen.getByAltText('Test Card')).toBeInTheDocument();
        expect(screen.getByText('Easy')).toBeInTheDocument();
    });

    it('should not call onClick when clicked and active', async () => {
        render(<ModeItem {...defaultProps} active={true} />);
        fireEvent.click(screen.getByText('Easy'));
        expect(defaultProps.onClick).not.toHaveBeenCalled();
    });

    it('should call onClick with modeName when clicked and not active', () => {
        render(<ModeItem {...defaultProps} />);
        fireEvent.click(screen.getByText('Easy'));
        expect(defaultProps.onClick).toHaveBeenCalledWith('Easy');
    });

    it('should not render if card is undefined', () => {
        (getRandomCardByMode as jest.Mock).mockReturnValue(undefined);
        const { container } = render(<ModeItem {...defaultProps} />);
        expect(container.firstChild).toBeNull();
    });
});