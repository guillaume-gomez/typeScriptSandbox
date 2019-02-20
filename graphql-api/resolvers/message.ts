import uuidv4 from 'uuid/v4';

interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  messages: Array<Message>
}

interface Message {
  id: string;
  text: string;
  userId: string;
}

export default {
  Query: {
    messages: (_obj, _args, { models }) => {
      return Object.values(models.messages);
    },
    message: (_obj , { id }, { models} ) => {
      return models.messages[id];
    }
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

  Message: {
    user: (obj, _args, { models }, _info) => {
      return models.users[obj.userId];
    },
  },
};