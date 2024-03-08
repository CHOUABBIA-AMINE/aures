interface ContractPhase {
    designationAr           : string;
    designationEn           : string;
    designationFr           : string;
    _links                  : {
        contractPhase           :{
            href                    : string
        },
        self                    :{
            href                    : string
        }
        contractSteps           :{
            href                    : string
        },
    }
}

export type { ContractPhase };