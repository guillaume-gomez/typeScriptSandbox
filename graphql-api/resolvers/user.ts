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
    user: (_obj, { id }, { models }, _info) => {
      return models.users[id];
    },
    users: (_obj, _args, { models }, _info) => {
      return Object.values(models.users);
    },
    me: (_obj, _args, { me }, _info) => {
      return me;
    },
    hello: () => 'Hello world!',
  },

  Mutation: {
  },

  User: {
    username: (obj) => {
      return `${obj.firstname} ${obj.lastname}`;
    },
    messages: (user, _args, { models }) => {
      let messagesByUser = function(message: Message): boolean { return message.userId === user.id; };
      return Object.values(models.messages).filter(messagesByUser);
    },
  },
};