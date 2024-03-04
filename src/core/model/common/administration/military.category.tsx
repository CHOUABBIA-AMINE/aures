interface MilitaryCategory {
    designationAr   : string;
    designationEn   : string;
    designationFr   : string;
    _links          : {
        militaryCategory    :{
            href                : string
        },
        self                :{
            href                : string
        },
        militaryRanks       :{
            href                : string
        }
    }
}

export type { MilitaryCategory };