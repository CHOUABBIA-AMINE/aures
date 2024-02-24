interface Employee {
    serial          : string;
    hiringDate      : Date;
    _links          : {
        employee        :{
            href            : string
        },
        self            :{
            href            : string
        },
        person          :{
            href            : string
        },
        militaryRank    :{
            href            : string
        },
        job             :{
            href            : string
        }
    }
}

export type { Employee };