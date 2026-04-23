const mongoose = require("mongoose");
const express = require("express");

const GrievanceSchema = mongoose.Schema(
{
  title : {
        type: String,
        required:true,
        minlength:4
        },
    description : {    
        type: String,
        required: true,
        maxlength:150
        },
        location: {
            lat: {type: Number,required:true },
            lng: { type:Number,required:true },
        },
        date:{
        type: Date,
        default:Date.now
        },
        imageurl: {
            type: String,
            required: true
        },
        status: {
        //pending,working,completed!!
            type: String,
            default:"Pending!"
        },
        upvotes: {
            type: Number,
            default:0
        },
        proposal: {
            type:String
        },
        
}
);
module.exports = mongoose.model("Grievance", GrievanceSchema); 