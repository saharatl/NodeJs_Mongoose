const { Product } = require("../models/product");
const utils = require("../utils/mapperUtils");
const _ = require("lodash");
// CRUD (Create, Read, Update, Delete) with Mongoose

const createProduct = async (req, res) => {
  try {
    const data = req.body;
    const checkExistData = await utils.checkExistingProducts(data);
    if (!checkExistData.existed) {
      await Product.create(data)
        .then(() => {
          res.json({
            resultCode: "20100",
            resultDesc: "Product created success",
            developerMessage: "Product created success",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.json({
        resultCode: "20002",
        resultDesc: "Data is Exist.",
        developerMessage: "Data is Exist.",
      });
    }
  } catch (error) {
    res.json({
      resultCode: "50060",
      resultDesc: "Internal Server Error",
      developerMessage: JSON.stringify(error),
    });
  }
};

const findAll = async (req, res) => {
  try {
    const data = {};
    await Product.find(data)
      .then((products) => {
        res.json({
          resultCode: "20000",
          resultDesc: "Success",
          developerMessage: "Success",
          resultData: products,
        });
      })
      .catch((err) => {
        res.json({
          resultCode: "50060",
          resultDesc: "Internal Server Error",
          developerMessage: JSON.stringify(error),
        });
      });
  } catch (error) {
    res.json({
      resultCode: "50060",
      resultDesc: "Internal Server Error",
      developerMessage: JSON.stringify(error),
    });
  }
};
const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findById(id)
      .then((products) => {
        res.json({
          resultCode: "20000",
          resultDesc: "Success",
          developerMessage: "Success",
          resultData: products,
        });
      })
      .catch((err) => {
        res.json({
          resultCode: "50060",
          resultDesc: "Internal Server Error",
          developerMessage: JSON.stringify(error),
        });
      });
  } catch (error) {
    res.json({
      resultCode: "50060",
      resultDesc: "Internal Server Error",
      developerMessage: JSON.stringify(error),
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    if (data && !_.isEmpty(data)) {
      if (utils.checkLengthValidObjectId(id)) {
        const checkExistData = await utils.checkExistingId(id);
        if (checkExistData.existed) {
          await Product.findByIdAndUpdate(id, { $set: data })
            .then(() => {
              res.json({
                resultCode: "20000",
                resultDesc: "Success",
                developerMessage: "Success",
              });
            })
            .catch((err) => {
              res.json({
                resultCode: "50060",
                resultDesc: "Internal Server Error",
                developerMessage: JSON.stringify(error),
              });
            });
        } else {
          res.json({
            resultCode: "20002",
            resultDesc: "_id is Exist.",
            developerMessage: "_id is Exist.",
          });
        }
      } else {
        res.json({
          resultCode: "40300",
          resultDesc: "Id is invalid format.",
          developerMessage: "Id is invalid format.",
        });
      }
    } else {
      res.json({
        resultCode: "40300",
        resultDesc: "Missing or Invalid Parameter: productName, price",
        developerMessage: "Missing or Invalid Parameter: productName, price",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      resultCode: "50060",
      resultDesc: "Internal Server Error",
      developerMessage: JSON.stringify(error),
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (utils.checkLengthValidObjectId(id)) {
      await Product.findByIdAndDelete(id)
        .then(() => {
          res.json({
            resultCode: "20000",
            resultDesc: "Success",
            developerMessage: "Success",
          });
        })
        .catch((err) => {
          res.json({
            resultCode: "50060",
            resultDesc: "Internal Server Error",
            developerMessage: JSON.stringify(error),
          });
        });
    } else {
      res.json({
        resultCode: "40300",
        resultDesc: "Id is invalid format.",
        developerMessage: "Id is invalid format.",
      });
    }
  } catch (error) {
    res.json({
      resultCode: "50060",
      resultDesc: "Internal Server Error",
      developerMessage: JSON.stringify(error),
    });
  }
};

const duplicateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (utils.checkLengthValidObjectId(id)) {
      const data = await Product.findById(id);
      if (data) {
        const newData = {
          productName: data.productName + "_Copy",
          price: data.price + "_Copy",
          lastUpdateDate: new Date(),
        };
        await Product.create(newData)
          .then(() => {
            res.json({
              resultCode: "20000",
              resultDesc: "Success",
              developerMessage: "Success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.json({
          resultCode: "20002",
          resultDesc: "Cannot duplicate because data is null",
          developerMessage: "Cannot duplicate because data is null",
        });
      }
    } else {
      res.json({
        resultCode: "40300",
        resultDesc: "Id is invalid format.",
        developerMessage: "Id is invalid format.",
      });
    }
  } catch (error) {
    res.json({
      resultCode: "50060",
      resultDesc: "Internal Server Error",
      developerMessage: JSON.stringify(error),
    });
  }
};

module.exports = {
  createProduct,
  findAll,
  findOne,
  updateProduct,
  deleteProduct,
  duplicateProduct,
};
