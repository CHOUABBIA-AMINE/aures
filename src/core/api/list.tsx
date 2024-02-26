const Lists = new Map();

const structure = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'designationFr',  name: 'Designation',        width: 'calc(60%)',         align: 'left',      type:"text" },
    { id: 'acronymFr',      name: 'Acronyme',           width: 'calc(40%-120px)',   align: 'left',      type:"text" }
];
const job = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'designationFr',  name: 'Designation',        width: 'calc(100%-120px)',  align: 'left',      type:"text" }
];
const employee = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'serial',         name: 'Matricule',          width: 'calc(30%)',         align: 'left',      type:"text" },
    { id: 'nameLt',         name: 'Name',               width: 'calc(70%-120px)',   align: 'left',      type:"text" }
];
const user = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'username',       name: 'Username',           width: '30%',               align: 'left',      type:"text"},
    { id: 'enabled',        name: 'Enabled',            width: '15%',               align: 'left',      type:"number"},
    { id: 'locked',         name: 'Locked',             width: '15%',               align: 'left',      type:"number"},
    { id: 'expirationDate', name: 'Expiration Date',    width: 'calc(40%-120px)',   align: 'center',    type:"date" }
];
const role = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'name',           name: 'Name',               width: 'calc(100%-120px)',  align: 'left',      type:"text" }
];

Lists.set("structure", structure);
Lists.set("job", job);
Lists.set("employee", employee);
Lists.set("user", user);
Lists.set("role", role);

export default Lists;
