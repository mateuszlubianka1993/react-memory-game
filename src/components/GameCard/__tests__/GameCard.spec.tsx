import { render, screen, fireEvent, act } from "@testing-library/react";
import GameCard from "../GameCard";
import { GAME_CARD_MODES } from "../../../config/game";

const mockCard = {
    id: '1',
    name: 'Test Card',
    img: 'test-image-url',
    pairId: '1'
};

const mockOnClick = jest.fn();

describe('GameCard Component', () => {
    it('should render the GameCard component', () => {
        render(<GameCard card={mockCard} onClick={mockOnClick} isOpen={false} />);
        expect(screen.getByText('Memory')).toBeInTheDocument();
        expect(screen.getByText('Flags')).toBeInTheDocument();
    });

    it('should display the correct label based on mode', () => {
        render(<GameCard card={mockCard} mode={GAME_CARD_MODES.LOGOS} onClick={mockOnClick} isOpen={true} />);
        expect(screen.getByText('Logos')).toBeInTheDocument();
    });

    it('should not call onClick if card is already open', async () => {
        await act(() => {
            render(<GameCard card={mockCard} onClick={mockOnClick} isOpen={true} />);
        });

        const cardElement = screen.getByText('Memory').closest('div');
        fireEvent.click(cardElement!);
        expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('should call onClick with card id when clicked', () => {
        render(<GameCard card={mockCard} onClick={mockOnClick} isOpen={false} />);
        const cardElement = screen.getByText('Memory').closest('div');
        fireEvent.click(cardElement!);
        expect(mockOnClick).toHaveBeenCalledWith(mockCard.id);
    });

    it('should display the card name and image on the back when flipped', async () => {
        await act(() => {
            render(<GameCard card={mockCard} isOpen={true} onClick={mockOnClick} />)
        });
        expect(screen.getAllByText(mockCard.name)[0]).toBeInTheDocument();
        expect(screen.getAllByText(mockCard.name)[1]).toBeInTheDocument();
        expect(screen.getByAltText(mockCard.name)).toHaveAttribute('src', mockCard.img);
    });
});