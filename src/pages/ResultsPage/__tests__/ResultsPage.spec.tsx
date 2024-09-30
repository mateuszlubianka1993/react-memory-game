import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResultsPage from '../index';
import { ROUTER_PATHS } from '../../../config/router';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('ResultsPage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('renders without crashing', () => {
        render(
            <MemoryRouter>
                <ResultsPage />
            </MemoryRouter>
        );
        expect(screen.getByText('Best results')).toBeInTheDocument();
    });

    it('displays "Start new game" button if there are no results in localStorage', () => {
        render(
            <MemoryRouter>
                <ResultsPage />
            </MemoryRouter>
        );

        expect(screen.getByText('Start new game')).toBeInTheDocument();
    });

    it('navigates to home page when "Start new game" button is clicked', () => {
        const navigate = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);

        render(
            <MemoryRouter>
                <ResultsPage />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Start new game'));
        expect(navigate).toHaveBeenCalledWith(ROUTER_PATHS.HOME);
    });
});
