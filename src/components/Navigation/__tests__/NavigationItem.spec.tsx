import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavigationItem from "../NavigationItem";
import { INavigationItem } from "../../../types";

describe("NavigationItem", () => {
    const mockProps: INavigationItem = {
        path: "/test-path",
        text: "Test Text"
    };

    it("should render the link with the correct path", () => {
        const { getByRole } = render(
            <MemoryRouter>
                <NavigationItem {...mockProps} />
            </MemoryRouter>
        );
        const linkElement = getByRole("link");
        expect(linkElement).toHaveAttribute("href", mockProps.path);
    });

    it("should render the text correctly", () => {
        const { getByText } = render(
            <MemoryRouter>
                <NavigationItem {...mockProps} />
            </MemoryRouter>
        );
        const textElement = getByText(mockProps.text);
        expect(textElement).toBeInTheDocument();
    });
});
