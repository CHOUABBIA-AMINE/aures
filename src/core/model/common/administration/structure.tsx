interface Structure {
    designationAr   : string;
    designationEn   : string;
    designationFr   : string;
    acronymAr       : string;
    acronymEn       : string;
    acronymFr       : string;
    _links          : {
        structure       :{
            href            : string
        },
        self            :{
            href            : string
        },
        structureType   :{
            href            : string
        },
        structureUp     :{
            href            : string
        }
    }
}

export type { Structure };