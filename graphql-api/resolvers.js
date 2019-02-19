import uuidv4 from 'uuid/v4';

export default {
  Query: {
    user: (_obj, { id }, { models }, _info) => {
      return models.users[id];
    },
    users: (_obj, _args, { models }, _info) => {
      return Object.values(models.users);
    },
    me: (_obj, _args, { me }, _info) => {
      return me;
    },
    messages: (_obj, _args, { models }) => {
      return Object.values(models.messages);
    },
    message: (_obj , { id }, { models} ) => {
      return models.messages[id];
    },
    hello: () => 'Hello world!',
  },

  Mutation: {
    createMessage: (obj, { text }, { me, models }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };
      models.messages[id] = message;
      models.users[me.id].messageIds.push(id);

      return message;
    },
    deleteMessage: (parent, { id, models }) => {
      const { [id]: message, ...otherMessages } = models.messages;

      if (!message) {
        return null;
      }

      models.messages = otherMessages;

      return message;
    },
  },

  User: {
    username: (obj) => {
      return `${obj.firstname} ${obj.lastname}`;
    },
    messages: (user, _args, { models }) => {
      return Object.values(models.messages).filter(
        message => message.userId === user.id,
      );
    },
  },

  Message: {
    user: (obj, _args, { models }, _info) => {
      return models.users[obj.userId];
    },
  },
};