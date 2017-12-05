import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Blueprint Schema
 */
const BlueprintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  order: { type: Number, default: 0 },
  desc: { type: String },
  hash: { type: String, required: true },
  build: { type: mongoose.Schema.Types.ObjectId, ref: 'Blueprint' },
}, { timestamps: true });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
BlueprintSchema.method({
});

/**
 * Statics
 */
BlueprintSchema.statics = {
  /**
   * Get blueprint
   * @param {ObjectId} id - The objectId of the blueprint.
   * @returns {Promise<Blueprint, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((blueprint) => {
        if (blueprint) {
          return blueprint;
        }
        const err = new APIError('No such blueprint exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List blueprints belonging to a specific build, in descending order of 'createdAt' timestamp, and order.
   * @param {string} buildId - Id of the belonging build.
   * @returns {Promise<Blueprint[]>}
   */
  getByBuild(buildId) {
    return this.find({ build: buildId })
      .sort({ createdAt: -1 })
      .sort({ order: -1 })
      .exec();
  },

  /**
   * List blueprints in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of blueprints to be skipped.
   * @param {number} limit - Limit number of blueprints to be returned.
   * @param {number} withDrafts - Include drafts in results.
   * @returns {Promise<Blueprint[]>}
   */
  list({ skip = 0, limit = 50, withDrafts = false } = {}) {
    const query = withDrafts === false ? {
      $or: [
        { draft: false },
        { draft: { $exists: false } },
      ]
    } : {};
    return this.find(query)
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Blueprint
 */
export default mongoose.model('Blueprint', BlueprintSchema);
