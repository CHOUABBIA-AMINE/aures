interface BudgetType {
    designationAr           : string;
    designationEn           : string;
    designationFr           : string;
    acronymAr               : string;
    acronymEn               : string;
    acronymFr               : string;
    _links                  : {
        budgetType            :{
            href                    : string
        },
        self                    :{
            href                    : string
        }
    }
}

export type { BudgetType };