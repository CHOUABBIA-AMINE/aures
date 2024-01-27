interface User {
    id          : string;
    username    : string;
    /*firstnameAr : string;
    lastnameAr  : string;
    firstnameLt : string;
    lastnameLt  : string;
    enabled     : boolean;
    locked      : boolean;
    expireDate  : Date;
    employee    : string;
    person      : string;
    picture     : string;
    roles       : string[];
    authorities : string[];*/
    token      ?: string;
}

export type { User };