interface Authority {
    name        : string;
    _links      : {
        role        :{
            href        : string
        },
        self        :{
            href        : string
        },
        authority   :{
            href        : string
        }
    }
}

export type { Authority };