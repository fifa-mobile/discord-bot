var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CardSchema = new Schema(
  {
    id: {type: String, unique: true, required: true},
    typeID: {type: Number, required: true},
    img: {type: String, unique: true, required: true},
    updatedAt: {type: Date},
  }
);

CardSchema
.virtual('type')
.get(function () {
  const data = require('../../data/pack/values');
  let type = 'unknown';
  try {
    type = data[this.typeID][3];
  } catch(e) {
    throw new Error(
      `can't find typeID from data/pack/values ${this.typeID}`
    );
  }
  return type;
});

module.exports = mongoose.model('Card', CardSchema);
