interface Person {
    firstnameAr     : string;
    lastnameAr      : string;
    firstnameLt     : string;
    lastnameLt      : string;
    birthDate       : Date;
    birthPlace      : string;
    address         : string;
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
        },
        picture         :{
            href            : string
        }
    }
}

export type { Person };