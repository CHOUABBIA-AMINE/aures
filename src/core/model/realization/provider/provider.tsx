import { Dayjs }                from 'dayjs';

interface Provider {
    designationLt           : string;
    designationAr           : string;
    acronymLt               : string;
    acronymAr               : string;
    address                 : string;
    capital                 : number;
    comercialRegistryNumber : string;
    comercialRegistryDate   : Dayjs | null;
    taxeIdentityNumber      : string;
    statIdentityNumber      : string;
    bank                    : string;
    bankAccount             : string;
    swiftNumber             : string;
    phoneNumbers            : string;
    faxNumbers              : string;
    mail                    : string;
    website                 : string;
    _links                  : {
        provider                :{
            href                    : string
        },
        self                    :{
            href                    : string
        },
        logo                    :{
            href                    : string
        },
        economicNature          :{
            href                    : string
        },
        country                 :{
            href                    : string
        },
        state                   :{
            href                    : string
        }
    }
}

export type { Provider };