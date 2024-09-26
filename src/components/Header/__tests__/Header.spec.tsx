import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../Header";

describe("Header", () => {
    test("renders heading text", async () => {
        render(<MemoryRouter><Header /></MemoryRouter>);
        expect(screen.getByRole("heading", { name: "Memory" })).toBeInTheDocument();
    });
});
