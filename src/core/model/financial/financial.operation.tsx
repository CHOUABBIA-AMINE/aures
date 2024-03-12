interface FinancialOperation {
    operation               : string;
    _links                  : {
        financialOperation      :{
            href                    : string
        },
        self                    :{
            href                    : string
        },
        budgetPlan              :{
            href                    : string
        },
    }
}

export type { FinancialOperation };