// const{clients,projects}= require("../sample")

const {GraphQLObjectType, graphql, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType} = require("graphql")
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

// mutations
const mutation= new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addCLient:{
            type:ClientsType,
            args:{
                name:{ type:new GraphQLNonNull(GraphQLString)},
                email:{ type:new GraphQLNonNull(GraphQLString)},
                phone:{ type:new GraphQLNonNull(GraphQLString)},

            },
          
            
            resolve(parent,args){
                const client =new clientsSchema({
                    name:args.name,
                    email:args.email,
                    phone:args.phone
                });
                return client.save();
            },
        
            }, addProject:{
                type:ProjectType,
                args:{
                    name:{type: new GraphQLNonNull(GraphQLString)},
                    description:{type: new GraphQLNonNull(GraphQLString)},
                    // status:{type: new GraphQLNonNull(GraphQLString)},
                    status: {
                        type: new GraphQLEnumType({
                            name:"ProjectStatus"
                            ,values:{
                                "done":{value:"Done"},
                                "progress":{value:"In Progrss"}
                            }
                        })
                        
                    },
                    clientId:{type:new GraphQLNonNull(GraphQLID)},
                },
                resolve(parent,args){
                    console.log(args,"-----")

                    const project= new projectsSchema({
                        name:args.name
                        ,description:args.description
                        ,status:args.status,
                        clientId:args.clientId
                    })
                    return project.save()
                }
            } ,
            deleteCLient:{
                type:ClientsType,
                args:{
                    id:{type:new GraphQLNonNull(GraphQLID)},
                },resolve(parent,args){  
                    return clientsSchema.findByIdAndDelete(args.id)
                }
            },
            deleteProject:{
                type:ProjectType,
                args:{
                    id:{type:new GraphQLNonNull(GraphQLID)},
                },resolve(parent,args){
                    return projectsSchema.findByIdAndDelete(args.id)
                }
            },
            // updateCLient:{
            //     type:ClientsType,
            //     args:{
            //        id:{type:new GraphQLNonNull(GraphQLID)},
            //      name:{ type:new GraphQLNonNull(GraphQLString)},
            //     email:{ type:new GraphQLNonNull(GraphQLString)},
            //     phone:{ type:new GraphQLNonNull(GraphQLString)},}
            //     ,resolve(parent,args){
            //         return clientsSchema.findByIdAndUpdate(args.id,{})
            //     }
            // }
            updatePRoject:{
            type:ProjectType,
            args:{
            id:{type:GraphQLID},
             name:{type: GraphQLString},
            description:{type: GraphQLString},
            status: {
                type: new GraphQLEnumType({
                    name:"ProjectStatusUpdate"
                    ,values:{
                        "done":{value:"Done"},
                        "progress":{value:"In Progrss"}
                    }
                })
                
            },
            // clientId:{type:new GraphQLNonNull(GraphQLID)},

            },
            resolve(parent,args){
                return projectsSchema.findByIdAndUpdate(
                    args.id,{
                        $set:{
                            name:args.name,
                            description:args.description,
                            status:args.status,
                            // clientId:args.cleintId

                        } 
                    },{new:true}
                )

            }
            }
}
})



module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation: mutation, 
})
