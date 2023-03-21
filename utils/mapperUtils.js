const utils = {};
const _ = require("lodash");
const { Product } = require("../models/product");

utils.checkLengthValidObjectId = (id) => {
  if (!_.isEmpty(id)) {
    if (id.length !== 24) {
      return false;
    }
  }
  return true;
};

utils.checkExistingProducts = async (body) => {
  let existing = {
    existed: false,
    data: {},
  };
  await Product.find({ productName: body.productName }).then((result) => {
    if (result && !_.isEmpty(result)) {
      existing.existed = true;
      existing.data = result;
    }
  });
  return existing;
};

utils.checkExistingId = async (id) => {
  let existing = {
    existed: false,
    data: {},
  };
  await Product.findById(id).then((result) => {
    if (result && !_.isEmpty(result)) {
      existing.existed = true;
      existing.data = result;
    }
  });
  return existing;
};

module.exports = utils;
