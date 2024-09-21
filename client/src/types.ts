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
    expire_at:string;
    KaleshItem:  Array<KaleshItem>;
    KaleshComments: Array<KaleshComment>;
}

type KaleshItemForm = {
    image: File | null;
};

type KaleshItem = {
    id: number;
    count: number;
    image: string;
}

type KaleshComment = {
    id: number;
    comment: string
    created_at: number;
}