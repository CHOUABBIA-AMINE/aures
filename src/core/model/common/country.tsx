interface Country {
    designationAr   : string;
    designationEn   : string;
    designationFr   : string;
    _links          : {
        country    :{
            href            : string
        },
        self            :{
            href            : string
        }
    }
}

export type { Country };