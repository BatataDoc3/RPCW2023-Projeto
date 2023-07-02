const mongoose = require("mongoose");
const Acordao = require("../models/acordao");

pageSize = 5;

module.exports.listacordaos = (queryBody) => {
  let page = queryBody.page;
  let orderBy = queryBody.orderBy;
  let keywords = queryBody.keywords;
  let query;
  if (!keywords || keywords == "") {
    query = Acordao.find({}, { processo: 1, data_acordao: 1, url: 1 });
  } else {
    keywords = keywords.replace(/"/g, "");
    query = Acordao.find(
      {
        $text: { $search: keywords },
        $or: [
          { meio_processual: { $regex: new RegExp(keywords, "i") } },
          { descritores: { $in: [new RegExp(keywords, "i")] } },
          { area_tematica_1: { $in: [new RegExp(keywords, "i")] } },
          { area_tematica_2: { $in: [new RegExp(keywords, "i")] } },
        ],
      },
      { processo: 1, data_acordao: 1, url: 1 }
    );
  }

  for (let q in queryBody) {
    if (q != "page" && q != "orderBy" && q != "keywords") {
      queryBody[q] = queryBody[q].replace(/"/g, "");
      query.find({ [q]: queryBody[q] });
    }
  }


  let count = query.clone();
  count.countDocuments()
  
  
  query.skip((page - 1) * pageSize).limit(pageSize);
  if (orderBy != null) {
    let sortOrder;
    params = orderBy.split(";");
    if (params[1] == "asc") {
      sortOrder = 1;
    } else {
      sortOrder = -1;
    }
    query
      .sort({ [params[0]]: sortOrder })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
  }




  return count.exec()
  .then((count) => {
    return query
      .exec()
      .then((acordaos) => {
        return {
          acordaos: acordaos,
          totalItem: count,
          itemsPerPage: pageSize,
        };
      }
    )
  })
  .catch((err) => {
    console.log(err);
    return err;
  });
  //return query
  //  .exec()
  //  .then((acordaos) => {
  //    return {
  //      acordaos: acordaos,
  //      totalItem: totalItem,
  //      itemsPerPage: pageSize,
  //    };
  //  })
  //  .catch((err) => {
  //    console.log(err);
  //    return err;
  //  });
};

module.exports.getacordao = (id) => {
  console.log(id);
  return Acordao.findOne({ _id: id })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

module.exports.addacordao = (acordao) => {
  let { adicionar, data_review, user, ...newAcordao } = acordao;
  return new Acordao({ ...newAcordao }).save();
};

module.exports.updateacordao = (id, acordao) => {
  let { adicionar, data_review, user, ...newAcordao } = acordao;
  return Acordao.updateOne(
    { _id: id },
    { $set: { ...newAcordao } },
    { new: true }
  ).save();
};
