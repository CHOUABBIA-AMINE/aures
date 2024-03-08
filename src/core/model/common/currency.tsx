interface Currency {
    designationAr   : string;
    designationEn   : string;
    designationFr   : string;
    codeAr          : string;
    codeLt          : string;
    _links          : {
        currency    :{
            href            : string
        },
        self            :{
            href            : string
        }
    }
}

export type { Currency };