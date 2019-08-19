const Chatkit = require('@pusher/chatkit-server');

const chatkit = new Chatkit.default({
    instanceLocator: "v1:us1:95077b15-c43c-4d68-ae92-7a1f082f91c8",
    key: "b7bd9cc1-fbd0-43dc-b9d7-6ecfddb236d7:ZVFoqZ7HLsWL6XNhbnugGcNs8xBQZKHkmLwyRP945AA="
})

module.exports = chatkit;