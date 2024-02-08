const Lists = new Map();

const user = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'username',       name: 'Username',           width: '30%',               align: 'start',     type:"text"},
    { id: 'enabled',        name: 'Enabled',            width: '15%',               align: 'start',     type:"number"},
    { id: 'locked',         name: 'Locked',             width: '15%',               align: 'start',     type:"number"},
    { id: 'expirationDate', name: 'Expiration Date',    width: 'calc(40%-120px)',   align: 'center',    type:"date" }
];
const role = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center',    type:"number" },
    { id: 'name',           name: 'Name',               width: 'calc(100%-120px)',  align: 'start',     type:"text" }
];

Lists.set("user", user);
Lists.set("role", role);

export default Lists;
