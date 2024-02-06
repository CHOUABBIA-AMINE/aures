const Lists = new Map();

const user = [
        { id: 'id', name: 'Id', width: '5%' },
        { id: 'username', name: 'Username', width: '30%' },
        { id: 'enabled', name: 'Enabled', width: '15%' },
        { id: 'locked', name: 'Locked', width: '15%' },
        { id: 'expirationDate', name: 'Expiration Date', width: '25%' }
    ];
const role = [
        { id: 'id', name: 'Id', width: '5%' },
        { id: 'name', name: 'Name', width: '30%' }
    ];


Lists.set("user", user);
Lists.set("role", role);

export default Lists;
