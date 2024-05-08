const Lists = new Map();

const provider = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'designationLt',  name: 'Designation',        width: '60%',               align: 'left',      type:"text" },
    { id: 'acronymLt',      name: 'Acronyme',           width: 'calc(40%-120px)',   align: 'left',      type:"text" }
];
const exclusion = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'type',           name: 'Type',               width: 'calc(60%-120px)',   align: 'left',      type:"text" },
    { id: 'startDate',      name: 'Type',               width: '20%',               align: 'center',    type:"date" },
    { id: 'endDate',        name: 'Type',               width: '20%',               align: 'center',    type:"date" }
];
const financialOperation = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'type',           name: 'Budget Type',        width: '40%',               align: 'left',      type:"text" },
    { id: 'budgetYear',     name: 'Year',               width: 'calc(20%-120px)',   align: 'left',      type:"text" },
    { id: 'operation',      name: 'Operation',          width: '40%',               align: 'left',      type:"text" }
];
const budgetItem = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'year',           name: 'Plan',               width: '15%',               align: 'left',     type:"number" },
    { id: 'designationFr',  name: 'Designation',        width: 'calc(60%-120px)',   align: 'left',      type:"text" },
    { id: 'planedQuantity', name: 'Quantity',           width: '10%',               align: 'center',    type:"number" },
    { id: 'allocatedAmount',name: 'Amount',             width: '15%',               align: 'right',     type:"money" }
];
const budgetGoal = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'structure',      name: 'Beneficiary',        width: 'calc(90%-120px)',   align: 'left',      type:"text" },
    { id: 'quantity',       name: 'Quantity',           width: '10%',               align: 'right',     type:"number" }
];
const project = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'internalOrder',  name: 'Internal Id',        width: '15%',               align: 'center',    type:"text" },
    { id: 'designationFr',  name: 'Designation',        width: 'calc(85%-120px)',   align: 'left',      type:"text" }
];
const consultation = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    //{ id: 'internalOrder',  name: 'Internal Id',        width: '15%',               align: 'center',    type:"text" },
    { id: 'designationFr',  name: 'Designation',        width: 'calc(65%-120px)',   align: 'left',      type:"text" },
    { id: 'reference',      name: 'Reference',          width: '15%',               align: 'left',      type:"text" },
    { id: 'status',         name: 'Status',             width: '20%',               align: 'left',      type:"text" }
];
const submission = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'tender',         name: 'Tender',             width: 'calc(70%-300px)',   align: 'left',      type:"text" },
    { id: 'financialOffer', name: 'Financial Offer',    width: '15%',               align: 'right',     type:"money" },
    { id: 'submissionDate', name: 'Submission Date',    width: '15%',               align: 'left',      type:"date" }
];
const contract = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'reference',      name: 'Reference',          width: '15%',               align: 'center',    type:"text" },
    { id: 'designationFr',  name: 'Designation',        width: 'calc(55%-120px)',   align: 'left',      type:"text" },
    { id: 'providerName',   name: 'Provider',           width: '30%',               align: 'left',      type:"text" }
];
const document = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'reference',      name: 'Reference',          width: 'calc(40%-120px)',   align: 'left',      type:"text" },
    { id: 'type',           name: 'Type',               width: '40%',               align: 'left',      type:"text" },
    { id: 'issueDate',      name: 'Date',               width: '20%',               align: 'center',    type:"date" }
];
const mail = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'reference',      name: 'Reference',          width: 'calc(40%-180px)',   align: 'left',      type:"text" },
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
const room = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'code',           name: 'Code',               width: '5%',                align: 'left',      type:"text" },
    { id: 'designationFr',  name: 'Designation',        width: 'calc(40%-120px)',   align: 'left',      type:"text" },
    { id: 'bloc',           name: 'Bloc',               width: '15%',               align: 'left',      type:"text" },
    { id: 'floor',          name: 'Floor',              width: '15%',               align: 'left',      type:"text" },
    { id: 'structure',      name: 'Structure',          width: '15%',               align: 'left',      type:"text" }
];
const shelf = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'code',           name: 'Code',               width: '20%',               align: 'left',      type:"text" },
    { id: 'room',           name: 'Room',               width: '20%',               align: 'left',      type:"text" },
    { id: 'structure',      name: 'Structure',          width: 'calc(60%-120px)',   align: 'left',      type:"text" }
];
const archiveBox = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'code',           name: 'Code',               width: '20%',               align: 'left',      type:"text" },
    { id: 'shelf',          name: 'Shelf',              width: '20%',               align: 'left',      type:"text" },
    { id: 'room',           name: 'Room',               width: '20%',               align: 'left',      type:"text" },
    { id: 'structure',      name: 'Structure',          width: 'calc(40%-120px)',   align: 'left',      type:"text" }
];
const folder = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'code',           name: 'Code',               width: '15%',               align: 'left',      type:"text" },
    { id: 'designationFr',  name: 'Designation',        width: 'calc(40%-120px)',   align: 'left',      type:"text" },
    { id: 'archiveBox',     name: 'Archive Box',        width: '15%',               align: 'left',      type:"text" },
    { id: 'shelf',          name: 'Shelf',              width: '15%',               align: 'left',      type:"text" },
    { id: 'room',           name: 'Room',               width: '15%',               align: 'left',      type:"text" }
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
Lists.set("exclusion", exclusion);
Lists.set("financialOperation", financialOperation);

Lists.set("budgetItem", budgetItem);
Lists.set("budgetGoal", budgetGoal);

Lists.set("submission", submission);
Lists.set("consultation", consultation);
Lists.set("contract", contract);

Lists.set("document", document);

Lists.set("mail", mail);

Lists.set("structure", structure);
Lists.set("job", job);
Lists.set("employee", employee);

Lists.set("room", room);
Lists.set("shelf", shelf);
Lists.set("archiveBox", archiveBox);
Lists.set("folder", folder);

Lists.set("user", user);
Lists.set("role", role);

export default Lists;