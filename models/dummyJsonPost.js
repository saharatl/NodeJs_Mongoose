const mongoose = require("mongoose");
const DummyPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    userId: {
      type: Number,
    },
    tags: {
      type: [String],
    },
    reactions: {
      type: Number,
    },
  },
  { versionKey: false }
);
const DummyPost = mongoose.model(" DummyPost", DummyPostSchema);

module.exports = { DummyPost };
