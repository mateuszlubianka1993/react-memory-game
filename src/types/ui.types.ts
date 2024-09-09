import { ChangeEvent, ReactNode } from "react";

export interface InputProps {
    label: string;
    value?: string;
    placeholder?: string;
    error?: boolean;
    onChange: (value: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (value: ChangeEvent<HTMLInputElement>) => void;
}

export interface ButtonProps {
    onClick: () => void;
    disabled?: boolean;
    children: ReactNode;
}
