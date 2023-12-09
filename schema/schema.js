// const{clients,projects}= require("../sample")

const {GraphQLObjectType, graphql, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList} = require("graphql")
const clientsSchema =require("../models/Client")
const projectsSchema =require("../models/Project")



const ClientsType=new GraphQLObjectType({
    name:"client",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString}
    })
});
const ProjectType=new GraphQLObjectType({
    name:"Project",
    fields:()=>({
        id:{type:GraphQLID},
        clientId:{
            type:ClientsType,
            resolve(parent,args){
                return clientsSchema.findById(parent.clientId)
            }
        },

        name:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},

        
    })
});

const RootQuery= new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        client:{
            type:ClientsType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return clientsSchema.findById(args.id)
            }
        },
        clients:{
            type:new GraphQLList(ClientsType),
            resolve(parent,args){
                return clientsSchema.find()
            }
        },
    // },
    project:{
        type:ProjectType,
        args:{id:{type:GraphQLID}},
        resolve(parent,args){
           return projectsSchema.findById(args.id)
        }
    },
    eprojects:{
        type:new GraphQLList(ProjectType),
        resolve(parent,args){
            return projectsSchema.find()
        }
    }

    }
})




module.exports = new GraphQLSchema({
    query:RootQuery
})
