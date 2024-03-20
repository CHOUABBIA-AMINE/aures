const Lists = new Map();

const provider = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'designationLt',  name: 'Designation',        width: '60%',               align: 'left',      type:"text" },
    { id: 'acronymLt',      name: 'Acronyme',           width: 'calc(40%-120px)',   align: 'left',      type:"text" }
];
const financialOperation = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'type',           name: 'Budget Type',        width: '40%',               align: 'left',      type:"text" },
    { id: 'budgetYear',     name: 'Year',               width: 'calc(20%-120px)',   align: 'left',      type:"text" },
    { id: 'operation',      name: 'Operation',          width: '40%',               align: 'left',      type:"text" }
];
const budgetItem = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'designationFr',  name: 'Designation',        width: 'calc(70%-120px)',   align: 'left',      type:"text" },
    { id: 'planedQuantity', name: 'Quantity',           width: '15%',               align: 'center',    type:"number" },
    { id: 'allocatedAmount',name: 'Amount',             width: '15%',               align: 'right',     type:"money" }
];
const project = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'internalOrder',  name: 'Internal Id',        width: '15%',               align: 'center',    type:"text" },
    { id: 'designationFr',  name: 'Designation',        width: 'calc(85%-120px)',   align: 'left',      type:"text" }
];
const consultation = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'internalOrder',  name: 'Internal Id',        width: '15%',               align: 'center',    type:"text" },
    { id: 'designationFr',  name: 'Designation',        width: 'calc(85%-120px)',   align: 'left',      type:"text" }
];
const contract = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'reference',      name: 'Reference',          width: '15%',               align: 'center',    type:"text" },
    { id: 'designationFr',  name: 'Designation',        width: 'calc(85%-120px)',   align: 'left',      type:"text" }
];
const document = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'reference',      name: 'Reference',          width: 'calc(40%-120px)',   align: 'left',      type:"text" },
    { id: 'type',           name: 'Type',               width: '40%',               align: 'left',      type:"text" },
    { id: 'issueDate',      name: 'Date',               width: '20%',               align: 'center',    type:"date" }
];
const mail = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'reference',      name: 'Reference',          width: 'calc(40%-120px)',   align: 'left',      type:"text" },
    { id: 'mailDate',       name: 'Date',               width: '20%',               align: 'center',    type:"date" },
    { id: 'subject',        name: 'Subject',            width: '40%',               align: 'left',      type:"text" }
];
const structure = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'designationFr',  name: 'Designation',        width: '60%',               align: 'left',      type:"text" },
    { id: 'acronymFr',      name: 'Acronyme',           width: 'calc(40%-120px)',   align: 'left',      type:"text" }
];
const job = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'designationFr',  name: 'Designation',        width: 'calc(100%-120px)',  align: 'left',      type:"text" }
];
const employee = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'serial',         name: 'Matricule',          width: '15%',               align: 'left',      type:"text" },
    { id: 'militaryRank.designationFr',  name: 'Rank',  width: '20%',               align: 'left',      type:"text" },
    { id: 'person.nameLt',  name: 'Name',               width: 'calc(50%-120px)',   align: 'left',      type:"text" },
    { id: 'job.designationFr',  name: 'Job',            width: '20%',               align: 'left',      type:"text" }
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

Lists.set("provider", provider);
Lists.set("financialOperation", financialOperation);

Lists.set("budgetItem", budgetItem);

Lists.set("project", project);
Lists.set("consultation", consultation);
Lists.set("contract", contract);

Lists.set("document", document);

Lists.set("mail", mail);

Lists.set("structure", structure);
Lists.set("job", job);
Lists.set("employee", employee);
Lists.set("user", user);
Lists.set("role", role);

export default Lists;
