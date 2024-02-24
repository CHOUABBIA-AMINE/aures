interface StructureType {
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
        }
    }
}

export type { StructureType };