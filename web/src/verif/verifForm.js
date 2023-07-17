import Joi from "joi";

// super if 

export const adresseVerif = Joi.object({
  prenom: Joi.string()
    .min(2)
    .max(30)
    .pattern(/^[^<>{}'";]*$/)
    .required()
    .messages({
      'string.empty': 'Le prénom ne peut pas être vide',
      'string.min': 'Le prénom doit comporter au moins 2 caractères',
      'string.max': 'Le prénom doit comporter au plus 30 caractères',
      'any.required': 'Le prénom est un champ obligatoire',
    }),

  nom: Joi.string()
    .min(2)
    .max(30)
    .pattern(/^[^<>{}'";]*$/)
    .required()
    .messages({
      'string.empty': 'Le nom ne peut pas être vide',
      'string.min': 'Le nom doit comporter au moins 2 caractères',
      'string.max': 'Le nom doit comporter au plus 30 caractères',
      'any.required': 'Le nom est un champ obligatoire',
    }),

  adresse1: Joi.string()
    .pattern(/^[^<>{}'";]*$/)
    .required()
    .messages({
      'string.empty': "L'adresse ne peut pas être vide",
      'any.required': "L'adresse est un champ obligatoire",
    }),

  adresse2: Joi.string()
    .pattern(/^[^<>{}'";]*$/)
    .allow(''),

  ville: Joi.string()
    .required()
    .pattern(/^[^<>{}'";]*$/)
    .messages({
      'string.empty': 'La ville ne peut pas être vide',
      'any.required': 'La ville est un champ obligatoire',
    }),

  codePostal: Joi.string()
    .length(5)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.empty': 'Le code postal ne peut pas être vide',
      'string.length': 'Le code postal doit comporter exactement 5 chiffres',
      'string.pattern.base': 'Le code postal doit comporter uniquement des chiffres',
      'any.required': 'Le code postal est un champ obligatoire',
    }),

  pays: Joi.string()
    .required()
    .pattern(/^[^<>{}'";]*$/)
    .messages({
      'string.empty': 'Le pays ne peut pas être vide',
      'any.required': 'Le pays est un champ obligatoire',
    }),

  telephone: Joi.string()
    .pattern(/^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/)
    .required()
    .messages({
      'string.empty': 'Le numéro de téléphone ne peut pas être vide',
      'string.pattern.base': 'Le numéro de téléphone doit respecter le format français',
      'any.required': 'Le numéro de téléphone est un champ obligatoire',
    }),
    user_Id: Joi.string()
    .required()
    .messages({
      'string.empty': "L'user_Id ne peut pas être vide",
      'any.required': "L'user_Id est un champ obligatoire",
    }),
});
