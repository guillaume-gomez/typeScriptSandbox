// This method just inserts the user's first name into the greeting message.
const { users, messages } = require ('./mock');
const uuidv4 = require('uuid/v4');

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
        console.log(messages)
      return Object.values(messages);
    },
    message: (parent, { id }) => {
      return messages[id];
    },
    hello: () => 'Hello world!',
  },

  Mutation: {
    createMessage: (obj, { text }, { me }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };
      messages[id] = message;
      users[me.id].messageIds.push(id);

      return message;
    },
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
    user: (obj, _args, _context, _info) => {
      return users[obj.userId];
    },
  },
};