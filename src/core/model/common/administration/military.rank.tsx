interface MilitaryRank {
    designationAr   : string;
    designationEn   : string;
    designationFr   : string;
    _links          : {
        militaryRank    :{
            href            : string
        },
        self            :{
            href            : string
        },
        militaryCategory:{
            href            : string
        }
    }
}

export type { MilitaryRank };