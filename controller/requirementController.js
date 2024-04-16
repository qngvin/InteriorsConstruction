const RequirementModel = require('../models/Requirement.js');
const getAllReq = async (req, res, next) => {
  try {
    const require = await RequirementModel.find({});
    res.status(200).json(require);
  } catch (error) {
    return res.status(500).json({
      msg: 'Failed'
    })
  }
}


const getReqByID = async (req, res, next) => {
  try {
    const { id } = res.params;

    await RequirementModel.findById(id).then(
      (requirement) => {
        res.status(200);
        res.json(requirement);
      }
    )

  } catch (error) {
    return res.status(500).json({
      msg: 'Failed'
    })
  }

}

const getReqByName = async (req, res, next) => {
  try {
    const { Name } = req.params;
    await RequirementModel.findOne({ Name: name }).then(
      (requirement) => {
        res.status(200);
        res.json(requirement);
      }
    )
  } catch (error) {
    return res.status(500).json({
      msg: 'Failed'
    })
  }
}

const updateReqById = (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;
  RequirementModel.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  ).then(
    (requirement) =>{
      res.status(200);
      res.setHeader("Content-Type", "application/json");
      res.json(requirement);
    },(err) => next(err)
  ).catch((err) => next(err));
}

const deleteReqById = (req, res, next) => {
  const {id} = req.params;
  RequirementModel.findByIdAndDelete(id).then(
    (resp) => {
      res.status(200);
      res.setHeader("Content-Type", "application/json");
      res.json(resp);
    }, (err) => next(err)
  ).catch((err) => next(err));
}

module.exports = {
  getAllReq,
  getReqByID,
  getReqByName,
  updateReqById,
  deleteReqById,

}
