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
    messages: () => {
      return Object.values(messages);
    },
    message: (parent, { id }) => {
      return messages[id];
    },
    hello: () => 'Hello world!',
  },

  User: {
    username: (obj) => {
      return `${obj.firstname} ${obj.lastname}`;
    },
    messages: user => {
      return Object.values(messages).filter(
        message => message.userId === user.id,
      );
    },
  },
  Message: {
    user: (obj, args, { me }) => {
      return obj[message.userId];
    },
  },
};