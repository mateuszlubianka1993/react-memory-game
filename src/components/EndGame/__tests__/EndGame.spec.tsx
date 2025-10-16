import { render, screen, fireEvent } from "@testing-library/react";
import EndGame from "../EndGame";
import { EndGameProps } from "../../../types";

describe('EndGame Component', () => {
    const defaultProps: EndGameProps = {
        name: 'Player1',
        isMultiplayer: false,
        isOpen: false,
        gameHistory: [
            { user: 'Player1', foundPair: true },
            { user: 'Player1', foundPair: true },
            { user: 'Player2', foundPair: true },
        ],
        deckType: 'classic',
        restartGame: jest.fn(),
        onModalClose: jest.fn(),
    };

    beforeEach(() => {
        localStorage.clear();
    });

    test('renders correctly for single player', () => {
        render(<EndGame {...defaultProps} />);
        expect(screen.getByText('Congratulations Player1!')).toBeInTheDocument();
        expect(screen.getByText('You found all the pairs.')).toBeInTheDocument();
        expect(screen.getByText('Your moves: 3')).toBeInTheDocument();
        expect(screen.getByText('Save Result')).toBeInTheDocument();
        expect(screen.getByText('Restart Game')).toBeInTheDocument();
    });

    test('renders correctly for multiplayer', () => {
        const multiplayerProps = { ...defaultProps, isMultiplayer: true };
        render(<EndGame {...multiplayerProps} />);
        expect(screen.getByText('You won Player1!')).toBeInTheDocument();
        expect(screen.getByText('Your pairs: 2')).toBeInTheDocument();
        expect(screen.getByText('Oponent pairs: 1')).toBeInTheDocument();
        expect(screen.getByText('Restart Game')).toBeInTheDocument();
    });

    test('handles save result', () => {
        render(<EndGame {...defaultProps} />);
        fireEvent.click(screen.getByText('Save Result'));
        expect(localStorage.getItem('best_results')).toBeTruthy();
        expect(screen.getByText('Score saved!')).toBeInTheDocument();
    });

    test('handles restart game', () => {
        render(<EndGame {...defaultProps} />);
        fireEvent.click(screen.getByText('Restart Game'));
        expect(defaultProps.restartGame).toHaveBeenCalled();
    });
});