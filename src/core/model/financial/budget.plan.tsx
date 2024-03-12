interface BudgetPlan {
    designationAr           : string;
    designationEn           : string;
    designationFr           : string;
    budgetYear              : string;
    _links                  : {
        budgetPlan              :{
            href                    : string
        },
        self                    :{
            href                    : string
        },
        budgetType              :{
            href                    : string
        },
        budgetPlanStatus        :{
            href                    : string
        }
    }
}

export type { BudgetPlan };