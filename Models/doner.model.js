const mongoose = require('mongoose');

const donerSchema = new mongoose.Schema({
    donerName:{
        type: String,
        required: [true, "You Have To Provide The Doner Name"],
        maxlength: [50, "Doner Name Cannot Exceed 50 letter!"]
    },
    moneyGiven:{
        type: String,
        required: [true, "You Have To State The Amount Of Money Given"],
    },
    givenFor:{
        type: [String],
        required: [true, "You Have To Provide A Discipline"],
        enum:[
            "غارمين",
            "صدقة",
            "زكاة مال",
            "زكاة فطر",
            "أسقف",
            "أيتام",
            "كفالة يتيم",
            "كفارة يمين",
            "تجهيز عرائس",
            "توصيلات المياه",
            "أخرى",
        ]
    },
    // date:{
    //     type:Date,
    //     required:true
    // },
},
{
    timestamps: true
  }
);



const Doner = mongoose.model('Doner', donerSchema);
module.exports = Doner;