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
        consultationSteps       :{
            href                    : string
        },
    }
}

export type { ConsultationPhase };