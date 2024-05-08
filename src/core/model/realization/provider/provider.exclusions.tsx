import { Dayjs }                from 'dayjs';

interface ProviderExclusion {
    startDate               : Dayjs | null;
    endDate                 : Dayjs | null;
    cause                   : string;
    _links                  : {
        providerExclusion       :{
            href                    : string
        },
        self                    :{
            href                    : string
        },
        exclusionType           :{
            href                    : string
        },
        provider                :{
            href                    : string
        },
        reference               :{
            href                    : string
        }
    }
}

export type { ProviderExclusion };