import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../index";

describe('HomePage', () => {
    it('should render the HomePage component', () => {
        const { container } = render(<MemoryRouter><HomePage /></MemoryRouter>);
        expect(container.firstChild).toHaveClass(/homepage/);
    });

    it('should contain a nav element with correct class', () => {
        const { container } = render(<MemoryRouter><HomePage /></MemoryRouter>);
        const navElement = container.querySelector('nav');
        expect(navElement).toBeInTheDocument();
    });
});
