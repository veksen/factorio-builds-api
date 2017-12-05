import Blueprint from '../models/blueprint.model';

/**
 * Load blueprint and append to req.
 */
function load(req, res, next, id) {
  Blueprint.get(id)
    .then((blueprint) => {
      req.blueprint = blueprint; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get blueprint
 * @returns {Blueprint}
 */
function get(req, res) {
  return res.json(req.blueprint);
}

/**
 * Get blueprint by build id
 * @returns {Blueprint[]}
 */
function getByBuild(req, res) {
  console.log(req.params.buildId);
  Blueprint.getByBuild(req.params.buildId)
    .then(blueprints => res.json(blueprints))
    .catch(e => next(e));
}

/**
 * Create new blueprint
 * @property {string} req.body.name - The name of the blueprint.
 * @property {number} req.body.order - The order of the blueprint.
 * @property {string} req.body.desc - The description of the blueprint.
 * @property {string} req.body.hash - The hash of the blueprint.
 * @property {string} req.body.build - The build's objectId.
 * @returns {Blueprint}
 */
function create(req, res, next) {
  const blueprint = new Blueprint({
    name: req.body.name,
    order: req.body.order,
    desc: req.body.desc,
    hash: req.body.hash,
    build: req.body.build
  });

  blueprint.save()
    .then(savedBlueprint => res.json(savedBlueprint))
    .catch(e => next(e));
}

/**
 * Update existing blueprint
 * @property {string} req.body.name - The name of the blueprint.
 * @property {number} req.body.order - The order of the blueprint.
 * @property {string} req.body.desc - The description of the blueprint.
 * @property {string} req.body.hash - The hash of the blueprint.
 * @property {string} req.body.build - The build's objectId.
 * @returns {Blueprint}
 */
function update(req, res, next) {
  const blueprint = req.blueprint;
  blueprint.name = req.body.name,
  blueprint.order = req.body.order,
  blueprint.desc = req.body.desc,
  blueprint.hash = req.body.hash,
  blueprint.build = req.body.build

  blueprint.save()
    .then(savedBlueprint => res.json(savedBlueprint))
    .catch(e => next(e));
}

/**
 * Get blueprint list.
 * @property {number} req.query.skip - Number of blueprints to be skipped.
 * @property {number} req.query.limit - Limit number of blueprints to be returned.
 * @returns {Blueprint[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Blueprint.list({ limit, skip })
    .then(blueprints => res.json(blueprints))
    .catch(e => next(e));
}

/**
 * Delete blueprint.
 * @returns {Blueprint}
 */
function remove(req, res, next) {
  const blueprint = req.blueprint;
  blueprint.remove()
    .then(deletedBlueprint => res.json(deletedBlueprint))
    .catch(e => next(e));
}

export default { load, get, getByBuild, create, update, list, remove };
