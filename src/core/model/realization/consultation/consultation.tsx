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
        project                 :{
            href                    : string
        },
        beneficiaries           :{
            href                    : string
        },
        documents               :{
            href                    : string
        },
        referencedMails         :{
            href                    : string
        },
        budgetGoals             :{
            href                    : string
        },
        tenders                 :{
            href                    : string
        }
    }
}

export type { Consultation };