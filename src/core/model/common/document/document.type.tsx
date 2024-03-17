interface AURESDocumentType {
    designationAr   : string;
    designationEn   : string;
    designationFr   : string;
    _links          : {
        documentType    :{
            href            : string
        },
        self            :{
            href            : string
        }
    };
}

export type { AURESDocumentType };