interface BudgetGoal {
    quantity                : number;
    _links                  : {
        budgetGoal              :{
            href                    : string
        },
        self                    :{
            href                    : string
        },
        budgetItem              :{
            href                    : string
        },
        structure               :{
            href                    : string
        }
    }
}

export type { BudgetGoal };