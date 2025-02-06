import Joi from 'joi';

export const createOrderSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  asset: Joi.string().min(1).required(),
  quantity: Joi.number().positive().required(),
  price: Joi.number().positive().required(),
  type: Joi.string().valid('BUY', 'SELL').required(),
});
