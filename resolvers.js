const { User, Hobby } = require('./models');

const resolvers = {
  Query: {
    users: () => User.findAll({
      include: [Hobby]
    }),
    user: (_, { id }) => User.findByPk(id, {
      include: [Hobby]
    }),
    hobbies: () => Hobby.findAll(),
  },
  Mutation: {
    createUser: async (_, { name, email, hobbyNames }) => {
      const newUser = await User.create({ name, email });
      const hobbies = await Promise.all(hobbyNames.map(hobbyName =>
        Hobby.findOrCreate({ where: { name: hobbyName } })
          .then(([hobby]) => hobby)
      ));
      await newUser.setHobbies(hobbies);
      return newUser;
    },
    updateUser: async (_, { id, name, email, hobbyNames }) => {
      const user = await User.findByPk(id);
      if (name) user.name = name;
      if (email) user.email = email;
      if (name || email) await user.save();
      if (hobbyNames) {
        const hobbies = await Promise.all(hobbyNames.map(hobbyName =>
          Hobby.findOrCreate({ where: { name: hobbyName } })
            .then(([hobby]) => hobby)
        ));
        await user.setHobbies(hobbies);
      }
      return user;
    },
    deleteUser: async (_, { id }) => {
      const user = await User.findByPk(id);
      if (user) {
        await user.destroy();
        return user;
      }
      return null;
    },
    createHobby: async (_, { name, description }) => {
      return await Hobby.create({ name, description });
    },
  },
  User: {
    hobbies: (user) => user.getHobbies()
  },
  Hobby: {
    users: (hobby) => hobby.getUsers()
  }
};
module.exports = resolvers;
