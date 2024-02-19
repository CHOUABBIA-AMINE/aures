interface Role {
    name        : string;
    _links      : {
        role        :{
            href        : string
        },
        self        :{
            href        : string
        },
        users       :{
            href        : string
        },
        authorities :{
            href        : string
        }
    }
}

export type { Role };