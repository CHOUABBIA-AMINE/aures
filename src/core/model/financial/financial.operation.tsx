interface FinancialOperation {
    operation               : string;
    budgetYear              : string
    _links                  : {
        financialOperation      :{
            href                    : string
        },
        self                    :{
            href                    : string
        },
        budgetType              :{
            href                    : string
        },
    }
}

export type { FinancialOperation };