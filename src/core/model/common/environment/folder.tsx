interface Folder {
    code            : string;
    designationAr   : string;
    designationEn   : string;
    designationFr   : string;
    _links          : {
        folder          :{
            href            : string
        },
        self            :{
            href            : string
        },
        archiveBox      :{
            href            : string
        }
    };
}

export type { Folder };