const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
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
          { username: args.username },
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

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        return "Can't find this user";
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        return "Wrong password!";
      }
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args.bookData } },
          { new: true }
        );
        return updatedUser;
      }
      throw AuthenticationError;
    },
    deleteBook: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: args.bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw AuthenticationError;
    },
  },
};
module.exports = resolvers;
