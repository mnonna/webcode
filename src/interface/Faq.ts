export default interface I_Faq {
    question: string;
    answer: string;
}

export interface I_Data_Faq {
    data: I_Faq[] | null;
}