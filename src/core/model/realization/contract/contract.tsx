import { Dayjs }                from 'dayjs';

interface Contract {
    internalId              : string;
    contractYear            : string;
    reference               : string;
    designationAr           : string;
    designationEn           : string;
    designationFr           : string;
    amount                  : number;
    transferableAmount      : number;
    startDate               : Dayjs | null;
    approvalReference       : string;
    approvalDate            : Dayjs | null;
    contractDate            : Dayjs | null;
    notifyDate              : Dayjs | null;
    contractDuration        : number;
    observation             : string;
    _links                  : {
        contract                :{
            href                    : string
        },
        self                    :{
            href                    : string
        },
        contractType            :{
            href                    : string
        },
        provider                :{
            href                    : string
        },
        realizationStatus       :{
            href                    : string
        },
        contractStep            :{
            href                    : string
        },
        approvalStatus          :{
            href                    : string
        },
        currency                :{
            href                    : string
        },
        consultation            :{
            href                    : string
        },
        contractUp              :{
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
        }
    }
}

export type { Contract };