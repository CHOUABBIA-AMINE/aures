interface ApprovalStatus {
    designationAr           : string;
    designationEn           : string;
    designationFr           : string;
    _links                  : {
        approvalStatus          :{
            href                    : string
        },
        self                    :{
            href                    : string
        }
    }
}

export type { ApprovalStatus };