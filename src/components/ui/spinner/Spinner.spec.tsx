import { render, screen } from "@testing-library/react";
import Spinner from "./Spinner";

describe("Spinner component", () => {
    it("renders without crashing", () => {
        render(<Spinner />);
        const spinnerElement = screen.getByRole("status");
        expect(spinnerElement).toBeInTheDocument();
    });
});
