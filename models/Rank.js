const mongoose = require("mongoose")

const rankSchema = new mongoose.Schema(
    {
        rank:{
            type:Number,
            // default:null,
        },
        totalScore:{
            type:Number,
            required:true,
            default:0,
        },
        matchesPlayed:{
            type:Number,
            required:true,
            default:0,
        },
    }
)

module.exports = mongoose.model("Rank", rankSchema);