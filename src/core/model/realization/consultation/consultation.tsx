import { Dayjs }                from 'dayjs';

interface Consultation {
    internalId              : string;
    consultationYear        : string;
    reference               : string;
    designationAr           : string;
    designationEn           : string;
    designationFr           : string;
    allocatedAmount         : number;
    financialEstimation     : number;
    startDate               : Dayjs | null;
    approvalReference       : string;
    approvalDate            : Dayjs | null;
    publishDate             : Dayjs | null;
    deadline                : Dayjs | null;
    observation             : string;
    _links                  : {
        consultation            :{
            href                    : string
        },
        self                    :{
            href                    : string
        },
        awardMethod             :{
            href                    : string
        },
        realizationNature       :{
            href                    : string
        },
        budgetType              :{
            href                    : string
        },
        realizationStatus       :{
            href                    : string
        },
        approvalStatus          :{
            href                    : string
        },
        realizationDirector     :{
            href                    : string
        },
        consultationStep        :{
            href                    : string
        },
        documents               :{
            href                    : string
        },
        referencedMails         :{
            href                    : string
        },
        budgetItems             :{
            href                    : string
        },
        submissions             :{
            href                    : string
        }
    }
}

export type { Consultation };