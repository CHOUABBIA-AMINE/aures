import { Dayjs }                from "dayjs";

interface Person {
    firstnameAr     : string;
    lastnameAr      : string;
    firstnameLt     : string;
    lastnameLt      : string;
    birthDate       : Dayjs | null;
    birthPlace      : string;
    address         : string;
    picture         : number;
    _links          : {
        person          :{
            href            : string
        },
        self            :{
            href            : string
        },
        birthState       :{
            href            : string
        },
        addressState    :{
            href            : string
        }
    }
}

export type { Person };