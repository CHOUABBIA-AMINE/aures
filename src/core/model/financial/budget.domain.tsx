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
        budgetSubDomains        :{
            href                    : string
        }
    }
}

export type { BudgetDomain };