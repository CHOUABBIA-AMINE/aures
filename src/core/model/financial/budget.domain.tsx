interface BudgetDomain {
    designationAr           : string;
    designationEn           : string;
    designationFr           : string;
    _links                  : {
        budgetDomain            :{
            href                    : string
        },
        self                    :{
            href                    : string
        },
        budgetRubrics           :{
            href                    : string
        }
    }
}

export type { BudgetDomain };