import Joi from "joi";

export function validateProperty(name, value, objectSchema) {
  const obj = { [name]: value };
  const propertySchema = { [name]: objectSchema[name] };
  const { error } = Joi.object(propertySchema).validate(obj);
  return error ? error.details[0].message : null;
}
