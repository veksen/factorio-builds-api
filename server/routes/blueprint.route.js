import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import blueprintCtrl from '../controllers/blueprint.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/blueprints - Get list of blueprints */
  .get(blueprintCtrl.list)

  /** POST /api/blueprints - Create new blueprint */
  // .post(blueprintCtrl.create);
  .post(validate(paramValidation.createBlueprint), blueprintCtrl.create);

router.route('/:blueprintId')
  /** GET /api/blueprints/:blueprintId - Get blueprint */
  .get(blueprintCtrl.get)

  /** PUT /api/blueprints/:blueprintId - Update blueprint */
  // .put(blueprintCtrl.update)
  .put(validate(paramValidation.updateBlueprint), blueprintCtrl.update)

  /** DELETE /api/blueprints/:blueprintId - Delete blueprint */
  .delete(blueprintCtrl.remove);

router.route('/build/:buildId')
  /** GET /api/blueprints/build/:buildId - Get blueprints for a build */
  .get(blueprintCtrl.getByBuild);

/** Load blueprint when API with blueprintId route parameter is hit */
router.param('blueprintId', blueprintCtrl.load);

export default router;
