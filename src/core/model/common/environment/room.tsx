interface Room {
    code            : string;
    designationAr   : string;
    designationEn   : string;
    designationFr   : string;
    _links          : {
        room            :{
            href            : string
        },
        self            :{
            href            : string
        },
        bloc            :{
            href            : string
        },
        floor           :{
            href            : string
        },
        structure       :{
            href            : string
        }
    };
}

export type { Room };