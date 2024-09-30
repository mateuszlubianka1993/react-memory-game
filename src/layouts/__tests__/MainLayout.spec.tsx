import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainLayout from "../MainLayout";

jest.mock("../../components", () => ({
    Header: () => <div>Mocked Header</div>,
}));

describe("MainLayout", () => {
    it("should render the Header component", () => {
        const { getByText } = render(
            <MemoryRouter>
                <MainLayout />
            </MemoryRouter>
        );
        expect(getByText("Mocked Header")).toBeInTheDocument();
    });

    it("should render the Outlet component", () => {
        const { container } = render(
            <MemoryRouter>
                <MainLayout />
            </MemoryRouter>
        );
        expect(container.querySelector("div")).toBeInTheDocument();
    });
});