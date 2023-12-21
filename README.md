# GraphQL Server with Express and MongoDB

This is a sample project showcasing a server-side GraphQL implementation using Express.js and MongoDB. The server is designed to handle basic CRUD (Create, Read, Update, Delete) operations with a MongoDB database, providing a GraphQL API for interaction.

## Features

- **GraphQL:** Implements a GraphQL API using Apollo Server for efficient data querying and manipulation.
- **Express.js:** Utilizes Express.js as the web server framework for handling HTTP requests.
- **MongoDB:** Stores data persistently in a MongoDB database.
- **CRUD Operations:** Provides endpoints for creating, reading, updating, and deleting data.
- **Schema Definition:** Defines GraphQL schema for clear communication between the client and server.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed locally or accessible remotely.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vyshakkolloth/graphql-server.git
   cd your-server-repository
## Getting Started
>Install dependencies:
`yarn`



> Start the development server:
`yarn dev`

---
#### ENV EXAMPLE

- `PORT`=3000
- `NODE_ENV`="devlopment"
- `MONGODB`="mongodb://127.0.0.1:27017/graphQl"

## Project Structure
* `models/ `: MongoDB schema models.
* `schemas/`: GraphQL schema definitions.
* `index.js`: Entry point for the Express server.

## GraphQL Schema
The GraphQL schema is defined in the `schemas/` directory.

#### Example Type

```bash

const ClientsType=new GraphQLObjectType({
    name:"client",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString}
    })
});
```
---
#### Example Query
```json client:{
            type:ClientsType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return clientsSchema.findById(args.id)
            }
        }, 

 ```
 ---
#### Example Mutation
~~~
deleteCLient:{
                type:ClientsType,
                args:{
                    id:{type:new GraphQLNonNull(GraphQLID)},
                },resolve(parent,args){  
                    return clientsSchema.findByIdAndDelete(args.id)
                }
            },
~~~


