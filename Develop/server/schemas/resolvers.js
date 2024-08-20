const { User } = require("../models");
const { signToken } = require("../utils/auth");
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      const foundUser = await User.findOne({
        $or: [
          {
            _id: context.user
              ? context.user._id
              : args.user
              ? user._id
              : params.id,
          },
          { username: params.username },
        ],
      });

      if (!foundUser) {
        return "Cannot find a user with this id!";
      }

      return foundUser;
    },
  },

  Mutation: {
    createUser: async (parent, args, context) => {
      const user = await User.create(args);
      if (!user) {
        return "Something is wrong!";
      }
      const token = signToken(user);
      return { token, user };
    },
  },
};
module.exports = resolvers;
