interface MailNature {
    designationAr   : string;
    designationEn   : string;
    designationFr   : string;
    _links          : {
        mailNature      :{
            href            : string
        },
        self            :{
            href            : string
        }
    };
}

export type { MailNature };