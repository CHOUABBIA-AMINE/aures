interface BudgetRubric {
    designationAr           : string;
    designationEn           : string;
    designationFr           : string;
    _links                  : {
        budgetRubric            :{
            href                    : string
        },
        self                    :{
            href                    : string
        },
        budgetDomain            :{
            href                    : string
        },
        budgetItems             :{
            href                    : string
        }
    }
}

export type { BudgetRubric };