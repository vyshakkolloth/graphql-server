const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    description:{
        type:String
    },
    status:{
        type:String,
        enum:["Done","In Progress"]
    },
    clientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"client"
        ,require

    }
})
module.exports= mongoose.model("project",projectSchema)