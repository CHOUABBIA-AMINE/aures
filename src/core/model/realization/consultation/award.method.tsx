interface AwardMethod {
    designationAr           : string;
    designationEn           : string;
    designationFr           : string;
    acronymAr               : string;
    acronymEn               : string;
    acronymFr               : string;
    _links                  : {
        awardMethod            :{
            href                    : string
        },
        self                    :{
            href                    : string
        }
    }
}

export type { AwardMethod };