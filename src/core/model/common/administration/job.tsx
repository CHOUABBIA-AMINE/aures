interface Job {
    designationAr   : string;
    designationEn   : string;
    designationFr   : string;
    _links          : {
        job             :{
            href            : string
        },
        self            :{
            href            : string
        },
        structure       :{
            href            : string
        }
    }
}

export type { Job };