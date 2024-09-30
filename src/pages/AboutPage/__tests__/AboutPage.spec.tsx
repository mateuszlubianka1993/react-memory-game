import { render, screen } from "@testing-library/react";
import AboutPage from "../index";

describe('AboutPage', () => {
    it('renders the About Us title', () => {
        render(<AboutPage />);
        const titleElement = screen.getByText(/About Us/i);
        expect(titleElement).toBeInTheDocument();
    });

    it('renders the welcome message', () => {
        render(<AboutPage />);
        const welcomeMessage = screen.getByText(/Welcome to the React Memory Game! This game is designed to test your memory skills./i);
        expect(welcomeMessage).toBeInTheDocument();
    });

    it('renders the game instructions', () => {
        render(<AboutPage />);
        const instructions = screen.getByText(/Match pairs of cards to win the game. Have fun!/i);
        expect(instructions).toBeInTheDocument();
    });
});
