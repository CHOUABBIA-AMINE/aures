interface Shelf {
    code            : string;
    _links          : {
        shelf           :{
            href            : string
        },
        self            :{
            href            : string
        },
        room            :{
            href            : string
        }
    };
}

export type { Shelf };