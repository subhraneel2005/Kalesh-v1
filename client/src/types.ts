type KaleshFormType = {
    title?: string;
    decsription?: string;
};

type KaleshFormTypeError = {
    title?: string;
    decsription?: string;
    expire_at?: string;
    image?: string;
};

type KaleshType = {
    id: number;
    user_id: number;
    title: string;
    decsription: string;
    image:string;
    created_at: string;
    expire_at:string
}

type KaleshItemForm = {
    image: File | null;
};