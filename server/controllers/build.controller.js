import Build from '../models/build.model';

/**
 * Load build and append to req.
 */
function load(req, res, next, id) {
  Build.get(id)
    .then((build) => {
      req.build = build; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get build
 * @returns {Build}
 */
function get(req, res) {
  return res.json(req.build);
}

/**
 * Create new build
 * @property {boolean} req.body.draft - The build a draft.
 * @property {string} req.body.name - The name of the build.
 * @property {string} req.body.image - The image of the build (jpg stripped).
 * @property {string} req.body.desc - The description of the build.
 * @property {string} req.body.category - The category of the build.
 * @property {string} req.body.createdBy - The creator's objectId.
 * @property {string} req.body.updatedBy - The latest updater's objectId.
 * @property {string} req.body.ownedBy - The owner's objectId.
 * @returns {Build}
 */
function create(req, res, next) {
  const build = new Build({
    name: req.body.name,
    image: req.body.image,
    desc: req.body.desc,
    category: req.body.category,
    createdBy: req.body.createdBy,
    updatedBy: req.body.updatedBy,
    ownedBy: req.body.ownedBy
  });

  build.save()
    .then(savedBuild => res.json(savedBuild))
    .catch(e => next(e));
}

/**
 * Update existing build
 * @property {boolean} req.body.draft - The build a draft.
 * @property {string} req.body.name - The name of the build.
 * @property {string} req.body.image - The image of the build (jpg stripped).
 * @property {string} req.body.desc - The description of the build.
 * @property {string} req.body.category - The category of the build.
 * @property {string} req.body.updatedBy - The latest updater's objectId.
 * @property {string} req.body.ownedBy - The owner's objectId.
 * @returns {Build}
 */
function update(req, res, next) {
  const build = req.build;
  build.draft = req.body.draft;
  build.name = req.body.name;
  build.image = req.body.image;
  build.desc = req.body.desc;
  build.category = req.body.category;
  build.updatedBy = req.body.updatedBy;
  build.ownedBy = req.body.ownedBy;

  build.save()
    .then(savedBuild => res.json(savedBuild))
    .catch(e => next(e));
}

/**
 * Get build list.
 * @property {number} req.query.skip - Number of builds to be skipped.
 * @property {number} req.query.limit - Limit number of builds to be returned.
 * @returns {Build[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Build.list({ limit, skip })
    .then(builds => res.json(builds))
    .catch(e => next(e));
}

/**
 * Delete build.
 * @returns {Build}
 */
function remove(req, res, next) {
  const build = req.build;
  build.remove()
    .then(deletedBuild => res.json(deletedBuild))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
