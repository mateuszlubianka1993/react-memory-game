import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '../Navigation';
import { INavigation } from '../../../types';

describe('Navigation Component', () => {
    it('should render null if navItems is empty', () => {
        const { container } = render(
            <MemoryRouter>
                <Navigation navItems={[]} />
            </MemoryRouter>
        );
        expect(container.firstChild).toBeNull();
    });

    it('should render null if navItems is not provided', () => {
        const { container } = render(
            <MemoryRouter>
                <Navigation navItems={null as unknown as INavigation['navItems']} />
            </MemoryRouter>
        );
        expect(container.firstChild).toBeNull();
    });

    it('should render the navigation items correctly', () => {
        const navItems = [
            { path: '/home', text: 'Home' },
            { path: '/about', text: 'About' },
        ];

        const { getByText } = render(
            <MemoryRouter>
                <Navigation navItems={navItems} />
            </MemoryRouter>
        );

        expect(getByText('Home')).toBeInTheDocument();
        expect(getByText('About')).toBeInTheDocument();
    });
});
