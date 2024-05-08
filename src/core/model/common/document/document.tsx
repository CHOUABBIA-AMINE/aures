import { Dayjs }                from "dayjs";

interface Doc {
    reference       : string;
    issueDate       : Dayjs | null;
    _links          : {
        document        :{
            href            : string
        },
        self            :{
            href            : string
        },
        documentType    :{
            href            : string
        },
        file            :{
            href            : string
        }
    }
}

export type { Doc };