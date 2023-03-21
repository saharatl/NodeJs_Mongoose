const { DummyPost } = require("../models/dummyJsonPost");
const _ = require("lodash");
const createDummyPost = async (req, res) => {
  const data = req.body;
  await DummyPost.create(data).then(() => {
    res.json({
      resultCode: "20100",
      resultDesc: "Dummy created success",
      developerMessage: "Dummy created success",
    });
  });
};

const findAllDummyPost = async (req, res) => {
  const data = {};
  await DummyPost.find(data).then((dummy) => {
    res.json({
      Post: dummy,
      total: dummy.length,
    });
  });
};

const findOneDummyPost = async (req, res) => {
  const { id } = req.params;
  await DummyPost.findById(id).then((dummy) => {
    res.json(dummy);
  });
};

const randomDummyPost = async (req, res) => {
  const count = await DummyPost.countDocuments();
  const randomIndex = Math.floor(Math.random() * count);
  await DummyPost.findOne()
    .skip(randomIndex)
    .then((dummy) => {
      res.json(dummy);
    });
};
// localhost:5000/dummyjson/post/select?select=..., ...
const selectDummyPost = async (req, res) => {
  const select = req.query.select ? req.query.select.split(",") : [];
  await DummyPost.find()
    .select(select.join(" "))
    .then((dummy) => {
      res.json(dummy);
    });
};

const selectTitleAllPost = async (req, res) => {
  await DummyPost.find({})
    .select("title")
    .then((items) => {
      const titles = items.map((value) => value.title);
      res.json(titles);
    });
};

//localhost:5000/dummyjson/post/search?q=...&q=...
const searchDummyPost = async (req, res) => {
  const searchRegex = new RegExp(req.query.q, "i");
  await DummyPost.find({ title: searchRegex }).then((dummy) => {
    res.json(dummy);
  });
};
// localhost:5000/dummyjson/post/limit?limit=...&skip=...
const limitSkipDummyPost = async (req, res) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  await DummyPost.find()
    .skip(skip)
    .limit(limit)
    .then((dummy) => {
      res.json(dummy);
    });
};
const deleteDummyPost = async (req, res) => {
  const { id } = req.params;
  await DummyPost.findByIdAndDelete(id).then(() => {
    res.json({
      resultCode: "20000",
      resultDesc: "Success",
      developerMessage: "Success",
    });
  });
};
const updateDummyPost = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  await DummyPost.findByIdAndUpdate(id, { $set: data }).then(() => {
    res.json({
      resultCode: "20000",
      resultDesc: "Success",
      developerMessage: "Success",
    });
  });
};
module.exports = {
  createDummyPost,
  findAllDummyPost,
  findOneDummyPost,
  updateDummyPost,
  deleteDummyPost,
  searchDummyPost,
  limitSkipDummyPost,
  selectDummyPost,
  selectTitleAllPost,
  randomDummyPost,
};
