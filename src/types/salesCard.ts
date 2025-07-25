export interface SalesCard{
    id: string;
    fullName: string;
    email: string;
    phone: string;
    company: string | null;
    message: string | null;
    createdAt: Date;
}