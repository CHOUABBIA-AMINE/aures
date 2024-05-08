interface Bloc {
    codeAr          : string;
    codeLt          : string;
    designationAr   : string;
    designationEn   : string;
    designationFr   : string;
    _links          : {
        bloc            :{
            href            : string
        },
        self            :{
            href            : string
        }
    };
}

export type { Bloc };