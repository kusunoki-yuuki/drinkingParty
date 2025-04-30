export type DrinkingParty = {
    drinking_party_id: number;
    drinking_party_name: string;
    date: string;
    location: string;
    remarks: string;
    participants: Array<{
        user_id: number;
        fee: number;
        is_paid: boolean;
        is_advance_payment: boolean;
        remarks: string;
        user_name: string;
    }>;
};