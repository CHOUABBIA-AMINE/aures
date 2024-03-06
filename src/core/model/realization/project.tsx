import { Dayjs }                from 'dayjs';

interface Project {
    internalId              : string;
    projectYear             : string;
    designationAr           : string;
    designationEn           : string;
    designationFr           : string;
    observation             : string;
    startDate               : Dayjs | null;
    _links                  : {
        project                 :{
            href                    : string
        },
        self                    :{
            href                    : string
        }
    }
}

export type { Project };