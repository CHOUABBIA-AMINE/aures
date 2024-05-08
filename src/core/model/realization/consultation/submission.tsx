import { Dayjs }                from 'dayjs';

interface Submission {
    submissionDate          : Dayjs | null;
    financialOffer          : number;
    _links                  : {
        submission              :{
            href                    : string
        },
        self                    :{
            href                    : string
        },
        consultation            :{
            href                    : string
        },
        tender                  :{
            href                    : string
        },
        administrativePart      :{
            href                    : string
        },
        technicalPart           :{
            href                    : string
        },
        financialPart           :{
            href                    : string
        }
    }
}

export type { Submission };