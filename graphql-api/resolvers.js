// This method just inserts the user's first name into the greeting message.
exports.resolvers = {
  Query: {
    user: (_obj, { id }, _context, _info) => {
      return users[id];
    },
    users: (_obj, _args, _context, _info) => {
      return Object.values(users);
    },
    me: (_obj, _args, { me }, _info) => {
      return me;
    },
    hello: () => 'Hello world!',
  },

  User: {
    username: (obj) => {
      return `${obj.firstname} ${obj.lastname}`;
    }
  }
};