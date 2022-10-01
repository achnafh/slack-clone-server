import models from "../sequelize/models";

export const resolvers = {
    Query: {

    },
    Mutation: {
        createTeam: async (_, args, {models, user}) => {
            try {
                await models.Team.create({...args, owner: user.id});
                return true;
            } catch(err) {
                console.log(err.message);
                return false
            }
        }
    }
    
  };