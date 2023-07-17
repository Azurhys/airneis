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

function expiryDateValidation(value, helpers) {
  // Décomposition de la valeur en mois et année
  const [month, year] = value.split('/');

  // Vérification que le mois est compris entre 1 et 12
  if (month < 1 || month > 12) {
    return helpers.message('Le mois doit être compris entre 01 et 12');
  }

  // Obtenir l'année actuelle
  const currentYear = new Date().getFullYear() % 100; // % 100 pour avoir les deux derniers chiffres

  // Obtenir le mois actuel
  const currentMonth = new Date().getMonth() + 1; // + 1 car les mois commencent à 0

  // Vérification que l'année est bien ultérieure ou égale à l'année actuelle
  if (year < currentYear || (year == currentYear && month < currentMonth)) {
    return helpers.message("La date d'expiration ne peut pas être dans le passé");
  }

  // Si tout va bien, on retourne la valeur
  return value;
}

export const carteVerif = Joi.object({
  cardNumber: Joi.string()
    .length(16)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.empty': 'Le numéro de la carte ne peut pas être vide',
      'string.length': 'Le numéro de la carte doit comporter exactement 16 chiffres',
      'string.pattern.base': 'Le numéro de la carte doit comporter uniquement des chiffres',
      'any.required': 'Le numéro de la carte est un champ obligatoire',
    }),

    expiryDate: Joi.string()
    .custom(expiryDateValidation, 'Validation de la date d\'expiration')
    .required()
    .messages({
      'string.empty': "La date d'expiration ne peut pas être vide",
      'any.required': "La date d'expiration est un champ obligatoire",
    }),

  cardName: Joi.string()
    .pattern(/^[^<>{}'";]*$/)
    .required()
    .messages({
      'string.empty': 'Le nom sur la carte ne peut pas être vide',
      'any.required': 'Le nom sur la carte est un champ obligatoire',
    }),

  cvv: Joi.string()
    .length(3)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.empty': 'Le CVV ne peut pas être vide',
      'string.length': 'Le CVV doit être de 3 chiffres',
      'string.pattern.base': 'Le CVV doit être composé uniquement de chiffres',
      'any.required': 'Le CVV est un champ obligatoire',
    }),
});