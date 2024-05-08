interface ArchiveBox {
    code            : string;
    _links          : {
        archiveBox      :{
            href            : string
        },
        self            :{
            href            : string
        },
        shelf           :{
            href            : string
        },
        shelfFloor      :{
            href            : string
        }
    };
}

export type { ArchiveBox };