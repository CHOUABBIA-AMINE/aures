interface StructureType {
    designationAr   : string;
    designationEn   : string;
    designationFr   : string;
    acronymAr       : string;
    acronymEn       : string;
    acronymFr       : string;
    _links          : {
        structureType   :{
            href            : string
        },
        self            :{
            href            : string
        }
    }
}

export type { StructureType };