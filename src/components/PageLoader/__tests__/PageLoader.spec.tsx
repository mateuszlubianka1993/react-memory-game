import { render } from "@testing-library/react";
import PageLoader from "../PageLoader";

jest.mock('../../../components', () => ({
    Spinner: () => <div data-testid="spinner" />,
}));

describe('PageLoader', () => {
    it('should render the spinner', () => {
        const { getByTestId } = render(<PageLoader />);
        expect(getByTestId('spinner')).toBeInTheDocument();
    });

    it('should render the loading text', () => {
        const { getByText } = render(<PageLoader />);
        expect(getByText('Loading...')).toBeInTheDocument();
    });
});