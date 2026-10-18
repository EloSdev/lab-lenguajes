export type Roast = "light" | "medium" | "dark";
export type Grind = "grano" | "molido";

export interface Coffee {
    readonly id: number;
    name: string;
    origin: string;
    notes: string[];
    roast: Roast;
    price: number;
    stock: number;
    discount?: number;
}

export interface Address {
    street: string;
    city: string;
    zip: string;
}

export interface Preferences {
    grind?: Grind;
    newsletter?: boolean;
}

export interface Customer {
    readonly id: number;
    name: string;
    email: string;
    address?: Address;
    preferences?: Preferences;
}