import { ChangeEvent, ReactNode } from "react";
import { SORT_TYPES } from "../config/ui";

const { ASCENDING, DESCENDING } = SORT_TYPES;
type ASCENDING = string;
type DESCENDING = string;

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
    fluid?: boolean;
}

export interface ModalProps {
    children: ReactNode;
    ref: any;
    openModal?: () => void;
    closeModal?: () => void;
    onModalClose?: () => void;
}

export interface ToggleSwitchProps {
    label: string;
    id: string;
    btnLabels?: {
        yes: string;
        no: string;
    }
    onChange: (state: boolean) => void;
}

export interface TableHeaderItem {
    id: string;
    text: string;
    sortable?: boolean;
}

export interface TableProps {
    headers: TableHeaderItem[];
    data: Array<{ [key: string]: any }>;
}

export type SortType = ASCENDING | DESCENDING;

export interface TableSortConfig {
    key: string;
    direction: SortType;
}
