interface BudgetSubDomain {
    designationAr           : string;
    designationEn           : string;
    designationFr           : string;
    _links                  : {
        budgetSubDomain         :{
            href                    : string
        },
        self                    :{
            href                    : string
        },
        budgetDomain            :{
            href                    : string
        },
        budgetRubrics           :{
            href                    : string
        }
    }
}

export type { BudgetSubDomain };