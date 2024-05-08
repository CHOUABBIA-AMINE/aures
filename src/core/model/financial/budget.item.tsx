interface BudgetItem {
    designationAr           : string;
    designationEn           : string;
    designationFr           : string;
    unitairCost             : number;
    planedQuantity          : number;
    allocatedAmount         : number;
    _links                  : {
        budgetItem              :{
            href                    : string
        },
        self                    :{
            href                    : string
        },
        budgetItemStatus        :{
            href                    : string
        },
        budgetRubric            :{
            href                    : string
        },
        financialOperation      :{
            href                    : string
        },
        budgetGoals             :{
            href                    : string
        }
    }
}

export type { BudgetItem };