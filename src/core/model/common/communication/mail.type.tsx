interface MailType {
    designationAr   : string;
    designationEn   : string;
    designationFr   : string;
    _links          : {
        mailType        :{
            href            : string
        },
        self            :{
            href            : string
        }
    };
}

export type { MailType };