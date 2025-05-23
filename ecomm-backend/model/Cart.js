const mongoose = require('mongoose');
const {Schema} = mongoose;


const cartSchema = new Schema({
quantity:{type: Number, required:true},
product:{type:Schema.Types.ObjectId, ref:'Product', required:true},
user:{type:Schema.Types.ObjectId, ref:'User', required:true}

})


// chage _id   ==>> id
const virtual = cartSchema.virtual('id');

virtual.get(function(){
    return this._id.toHexString();
})

cartSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function (doc,ret) {delete ret._id}
})

exports.Cart = mongoose.model('Cart', cartSchema);