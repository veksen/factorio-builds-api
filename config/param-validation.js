import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // POST /api/builds
  createBuild: {
    body: {
      draft: Joi.boolean(),
      name: Joi.string().required(),
      image: Joi.when('draft', { is: true, then: Joi.string().hex().required() }),
      desc: Joi.string().required(),
      category: Joi.string().regex(/^[a-z]*$/).required(),
    }
  },

  // UPDATE /api/builds/:buildId
  updateBuild: {
    body: {
      draft: Joi.boolean(),
      name: Joi.string().required(),
      image: Joi.when('draft', { is: true, then: Joi.string().hex().required() }),
      desc: Joi.string().required(),
      category: Joi.string().regex(/^[a-z]*$/).required(),
    },
    params: {
      buildId: Joi.string().hex().required()
    }
  }
};
