const Lists = new Map();

const user = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center' },
    { id: 'username',       name: 'Username',           width: '30%',               align: 'start' },
    { id: 'enabled',        name: 'Enabled',            width: '15%',               align: 'start' },
    { id: 'locked',         name: 'Locked',             width: '15%',               align: 'start' },
    { id: 'expirationDate', name: 'Expiration Date',    width: 'calc(40%-120px)',   align: 'center' }
];
const role = [
    { id: 'id',             name: 'Id',                 width: '20px',              align: 'center' },
    { id: 'name',           name: 'Name',               width: 'calc(100%-120px)',  align: 'start' }
];

Lists.set("user", user);
Lists.set("role", role);

export default Lists;
