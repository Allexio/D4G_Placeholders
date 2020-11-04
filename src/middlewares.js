const { query } = require('express-validator');
const {
  departmentList,
  regionList,
  townshipList
} = require('./dataProvider');

const middlewareRegionQuery = query('region')
  .exists({ checkNull: true })

  .isString()

  .custom((region) => {
    if (!regionList.includes(region)) {
      throw new Error('Invalid region');
    }
  })


const middlewarePrefixQuery = query('prefix')
  .exists({ checkNull: true })
  .isString()


const middlewareDepartment = query('department')
  .exists({ checkNull: true })
  .isString()
  .custom((department) => {
    if (!departmentList.includes(department)) {
      throw new Error('Invalide department');
    }
  })


const middlewareTownship = query('township')
  .exists({ checkNull: true })
  .isString()
  .withMessage('Invalide township')
  .custom((township) => {
    if (!townshipList.includes(township)) {
      throw new Error('Invalide township');
    }
  })

const handleErrorMiddleWare = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      const retErrors = { errors: errors.array() };
      console.error(`[BAD REQUEST PARAMS] \n\t -[PATH: ${req.path}] \n\t -[ERROR_TRACE: ${JSON.stringify(retErrors)}] \n\t -[AT: ${new Date().toUTCString()}]`);
      return res.status(422).json(retErrors);
  }
  next();
};


module.exports = {
  middlewareDepartment,
  middlewarePrefixQuery,
  middlewareRegionQuery,
  middlewareTownship,
};
