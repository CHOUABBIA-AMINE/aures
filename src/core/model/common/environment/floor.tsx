interface Floor {
    code            : string;
    designationAr   : string;
    designationEn   : string;
    designationFr   : string;
    _links          : {
        floor           :{
            href            : string
        },
        self            :{
            href            : string
        }
    };
}

export type { Floor };