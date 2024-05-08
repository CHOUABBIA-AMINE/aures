interface ShelfFloor {
    code            : string;
    designationAr   : string;
    designationEn   : string;
    designationFr   : string;
    _links          : {
        shelfFloor      :{
            href            : string
        },
        self            :{
            href            : string
        }
    };
}

export type { ShelfFloor };