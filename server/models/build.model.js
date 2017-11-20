import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Build Schema
 */
const BuildSchema = new mongoose.Schema({
  draft: { type: Boolean, default: false },
  name: { type: String, required: true },
  image: { type: String },
  desc: { type: String },
  category: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ownedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
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
BuildSchema.method({
});

/**
 * Statics
 */
BuildSchema.statics = {
  /**
   * Get build
   * @param {ObjectId} id - The objectId of the build.
   * @returns {Promise<Build, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((build) => {
        if (build) {
          return build;
        }
        const err = new APIError('No such build exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List builds in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of builds to be skipped.
   * @param {number} limit - Limit number of builds to be returned.
   * @returns {Promise<Build[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Build
 */
export default mongoose.model('Build', BuildSchema);
