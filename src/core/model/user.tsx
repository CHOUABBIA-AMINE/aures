interface User {
    //id          : string;
    username    : string | undefined;
    password    : string | undefined;
    expireDate  : Date;
    enabled     : boolean;
    locked      : boolean;
    userURL     : string;
    roleURL     : string;
    /*firstnameAr : string;
    lastnameAr  : string;
    firstnameLt : string;
    lastnameLt  : string;
    employee    : string;
    person      : string;
    picture     : string;
    roles       : string[];
    authorities : string[];*/
}

export type { User };