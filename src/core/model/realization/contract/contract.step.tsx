interface ContractStep {
    designationAr           : string;
    designationEn           : string;
    designationFr           : string;
    _links                  : {
        contractStep            :{
            href                    : string
        },
        self                    :{
            href                    : string
        }
    }
}

export type { ContractStep };