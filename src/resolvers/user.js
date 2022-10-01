export const resolvers = {
    Query: {
        getUser: (parent, {id}, {models}) => models.User.findOne({ where: {id} }),
        allUsers: (parent, args, {models}) => models.User.findAll()
    },
    Mutation: {
        createUser: (parent, args, {models}, info) => models.User.create(args),
    } 
  };