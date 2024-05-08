interface ConsultationStep {
    designationAr           : string;
    designationEn           : string;
    designationFr           : string;
    _links                  : {
        consultationStep        :{
            href                    : string
        },
        self                    :{
            href                    : string
        }
    }
}

export type { ConsultationStep };