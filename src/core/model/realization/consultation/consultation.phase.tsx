interface ConsultationPhase {
    designationAr           : string;
    designationEn           : string;
    designationFr           : string;
    _links                  : {
        consultationPhase       :{
            href                    : string
        },
        self                    :{
            href                    : string
        }
    }
}

export type { ConsultationPhase };