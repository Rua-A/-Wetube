import mongoose from "mongoose";

const videoSchema= new mongoose.Schema({
    title: {type : String, required :true, trim:true ,maxLength:80},
    description: {type : String, required :true, trim:true, minLength:20},
    createdAt: {type:Date, require: true, default: Date.now},
    hashtags: [{type:String, trim:true}],
    meta:{
        views:{type: Number, default: 0, require: true},
        rating:{type: Number, default: 0, require: true},
    },

});
//mongoos 미들웨어는 비디오 모델이 만들어지기 전에 실행시켜야한다.
/*
videoSchema.pre("save",async function() {
    this.hashtags = this.hashtags[0].split(",").map((word) => (word.startsWith("#") 
    ? word : `#${word}`));
});
*/

videoSchema.static('formatHashtags',function(hashtags){
    return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
})

const Video = mongoose.model("Video",videoSchema);
export default Video;