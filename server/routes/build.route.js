import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import buildCtrl from '../controllers/build.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/builds - Get list of builds */
  .get(buildCtrl.list)

  /** POST /api/builds - Create new build */
  .post(validate(paramValidation.createBuild), buildCtrl.create);

router.route('/:buildId')
  /** GET /api/builds/:buildId - Get build */
  .get(buildCtrl.get)

  /** PUT /api/builds/:buildId - Update build */
  .put(validate(paramValidation.updateBuild), buildCtrl.update)

  /** DELETE /api/builds/:buildId - Delete build */
  .delete(buildCtrl.remove);

/** Load build when API with buildId route parameter is hit */
router.param('buildId', buildCtrl.load);

export default router;
