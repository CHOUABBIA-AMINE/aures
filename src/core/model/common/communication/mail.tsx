import { Dayjs }                from "dayjs";

interface Mail {
    reference       : string;
    recordNumber    : string;
    subject         : string;
    mailDate        : Dayjs | null;
    recordDate      : Dayjs | null;
    _links          : {
        mail            :{
            href            : string
        },
        self            :{
            href            : string
        },
        mailNature      :{
            href            : string
        },
        mailType        :{
            href            : string
        },
        structure       :{
            href            : string
        },
        file            :{
            href            : string
        },
    };
}

export type { Mail };