interface State {
    code            : string;
    designationAr   : string;
    designationLt   : string;
    _links          : {
        state    :{
            href            : string
        },
        self            :{
            href            : string
        }
    }
}

export type { State };