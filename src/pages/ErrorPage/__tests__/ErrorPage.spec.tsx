import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ErrorPage from "../index";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe("ErrorPage", () => {
    const mockedNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (require("react-router-dom").useNavigate as jest.Mock).mockReturnValue(mockedNavigate);
    });

    test("renders the ErrorPage component", () => {
        render(
            <MemoryRouter>
                <ErrorPage />
            </MemoryRouter>
        );

        expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
        expect(screen.getByText("Sorry, the page you are looking for does not exist.")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /go back/i })).toBeInTheDocument();
    });

    test("navigates back when 'Go Back' button is clicked", () => {
        render(
            <MemoryRouter>
                <ErrorPage />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole("button", { name: /go back/i }));
        expect(mockedNavigate).toHaveBeenCalledWith(-1);
    });
});
