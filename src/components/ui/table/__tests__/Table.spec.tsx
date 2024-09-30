import { render, screen, fireEvent } from "@testing-library/react";
import Table from "../Table";
import { TableHeaderItem } from "../../../../types";

const headers: TableHeaderItem[] = [
    { id: 'name', text: 'Name', sortable: true },
    { id: 'age', text: 'Age', sortable: true },
    { id: 'address', text: 'Address', sortable: false },
];

const data = [
    { name: 'John Doe', age: 28, address: '123 Main St' },
    { name: 'Jane Smith', age: 34, address: '456 Oak St' },
    { name: 'Sam Green', age: 22, address: '789 Pine St' },
];

describe('Table component', () => {
    test('renders table headers correctly', () => {
        render(<Table headers={headers} data={data} />);
        headers.forEach(header => {
            expect(screen.getByText(header.text)).toBeInTheDocument();
        });
    });

    test('renders table data correctly', () => {
        render(<Table headers={headers} data={data} />);
        data.forEach(row => {
            expect(screen.getByText(row.name)).toBeInTheDocument();
            expect(screen.getByText(row.age.toString())).toBeInTheDocument();
            expect(screen.getByText(row.address)).toBeInTheDocument();
        });
    });

    test('displays "No data to display..." when data is empty', () => {
        render(<Table headers={headers} data={[]} />);
        expect(screen.getByText('No data to display...')).toBeInTheDocument();
    });

    test('sorts data by column when header is clicked', () => {
        render(<Table headers={headers} data={data} />);
        
        const nameHeader = screen.getByText('Name');
        fireEvent.click(nameHeader);

        const sortedDataAsc = data.slice().sort((a, b) => a.name.localeCompare(b.name));
        sortedDataAsc.forEach((row, index) => {
            expect(screen.getAllByRole('row')[index + 1]).toHaveTextContent(row.name);
        });

        fireEvent.click(nameHeader);

        const sortedDataDesc = data.slice().sort((a, b) => b.name.localeCompare(a.name));
        sortedDataDesc.forEach((row, index) => {
            expect(screen.getAllByRole('row')[index + 1]).toHaveTextContent(row.name);
        });
    });

    test('does not sort data when non-sortable header is clicked', () => {
        render(<Table headers={headers} data={data} />);
        
        const addressHeader = screen.getByText('Address');
        fireEvent.click(addressHeader);

        data.forEach((row, index) => {
            expect(screen.getAllByRole('row')[index + 1]).toHaveTextContent(row.address);
        });
    });
});