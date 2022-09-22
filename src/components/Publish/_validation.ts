import { MAX_DECIMALS } from '@utils/constants'
import * as Yup from 'yup'
import { getMaxDecimalsValidation } from '@utils/numbers'
import { retrieveShaclSchema } from '@utils/aquarius'
import {
  ShaclSchema,
  ShaclSchemaField
} from '@context/MarketMetadata/_shaclType'
import { capitalizeFirstLetter } from '@utils/textTransform'

// TODO: conditional validation
// e.g. when algo is selected, Docker image is required
// hint, hint: https://github.com/jquense/yup#mixedwhenkeys-string--arraystring-builder-object--value-schema-schema-schema
const validationMetadata = {
  type: Yup.string()
    .matches(/dataset|algorithm/g, { excludeEmptyString: true })
    .required('Required'),
  name: Yup.string()
    .required('Required')
    .test(async (value, { path, createError }): Promise<any> => {
      if (!value) return
      const schemaField: any = await retrieveShaclSchema()
      const fieldValidation: ShaclSchemaField =
        schemaField[path.split('.')[0]][path.split('.')[1]]
      // TODO: add minLength when integrated in endpoint
      if (value.length < 10) {
        return createError({
          message: `${capitalizeFirstLetter(
            path.split('.')[1]
          )} must be at least ${10} characters`
        })
      } else if (value.length > fieldValidation.maxLength) {
        return createError({
          message: `${capitalizeFirstLetter(
            path.split('.')[1]
          )} must have maximum ${fieldValidation.maxLength} characters`
        })
      } else {
        return value
      }
    }),
  description: Yup.string()
    .required('Required')
    .test(async (value, { path, createError }): Promise<any> => {
      if (!value) return
      const schemaField: any = await retrieveShaclSchema()
      const fieldValidation: ShaclSchemaField =
        schemaField[path.split('.')[0]][path.split('.')[1]]
      // TODO: add minLength when integrated in endpoint
      if (value.length < 10) {
        return createError({
          message: `${capitalizeFirstLetter(
            path.split('.')[1]
          )} must be at least ${10} characters`
        })
      } else if (value.length > fieldValidation.maxLength) {
        return createError({
          message: `${capitalizeFirstLetter(
            path.split('.')[1]
          )} must have maximum ${fieldValidation.maxLength} characters`
        })
      } else {
        return value
      }
    }),
  author: Yup.string()
    .required('Required')
    .test(async (value, { path, createError }): Promise<any> => {
      if (!value) return
      const schemaField: any = await retrieveShaclSchema()
      const fieldValidation: ShaclSchemaField =
        schemaField[path.split('.')[0]][path.split('.')[1]]
      // TODO: add minLength when integrated in endpoint
      if (value.length < 1) {
        return createError({
          message: `${capitalizeFirstLetter(
            path.split('.')[1]
          )} must be at least ${1} characters`
        })
      } else if (value.length > fieldValidation.maxLength) {
        return createError({
          message: `${capitalizeFirstLetter(
            path.split('.')[1]
          )} must have maximum ${fieldValidation.maxLength} characters`
        })
      } else {
        return value
      }
    }),
  tags: Yup.string()
    .nullable(true)
    .test(async (value, { path, createError }): Promise<any> => {
      if (!value) return true
      const schemaField: any = await retrieveShaclSchema()
      const fieldValidation: ShaclSchemaField =
        schemaField[path.split('.')[0]][path.split('.')[1]]
      // TODO: add minLength when integrated in endpoint
      if (value.length < 1) {
        return createError({
          message: `${capitalizeFirstLetter(
            path.split('.')[1]
          )} must be at least ${1} characters`
        })
      } else if (value.length > fieldValidation.maxLength) {
        return createError({
          message: `${capitalizeFirstLetter(
            path.split('.')[1]
          )} must have maximum ${fieldValidation.maxLength} characters`
        })
      } else {
        return value
      }
    }),
  termsAndConditions: Yup.boolean()
}

const validationService = {
  files: Yup.array<{ url: string; valid: boolean }[]>()
    .of(
      Yup.object().shape({
        url: Yup.string().url('Must be a valid URL.').required('Required'),
        valid: Yup.boolean().isTrue().required('File must be valid.')
      })
    )
    .min(1, `At least one file is required.`)
    .required('Enter a valid URL and click ADD FILE.'),
  links: Yup.array<{ url: string; valid: boolean }[]>()
    .of(
      Yup.object().shape({
        url: Yup.string().url('Must be a valid URL.'),
        // TODO: require valid file only when URL is given
        valid: Yup.boolean()
        // valid: Yup.boolean().isTrue('File must be valid.')
      })
    )
    .nullable(),
  dataTokenOptions: Yup.object().shape({
    name: Yup.string(),
    symbol: Yup.string()
  }),
  timeout: Yup.string().required('Required'),
  access: Yup.string()
    .matches(/compute|access/g)
    .required('Required'),
  providerUrl: Yup.object().shape({
    url: Yup.string().url('Must be a valid URL.').required('Required'),
    valid: Yup.boolean().isTrue().required('Valid Provider is required.'),
    custom: Yup.boolean()
  })
}

const validationPricing = {
  type: Yup.string()
    .matches(/fixed|free/g, { excludeEmptyString: true })
    .required('Required'),
  // https://github.com/jquense/yup#mixedwhenkeys-string--arraystring-builder-object--value-schema-schema-schema

  price: Yup.number()
    .min(1, (param: { min: number }) => `Must be more or equal to ${param.min}`)
    .max(
      1000000,
      (param: { max: number }) => `Must be less than or equal to ${param.max}`
    )
    .test(
      'maxDigitsAfterDecimal',
      `Must have maximum ${MAX_DECIMALS} decimal digits`,
      (param) => getMaxDecimalsValidation(MAX_DECIMALS).test(param?.toString())
    )
    .required('Required')
}

// TODO: make Yup.SchemaOf<FormPublishData> work, requires conditional validation
// of all the custom docker image stuff.
// export const validationSchema: Yup.SchemaOf<FormPublishData> =
export const validationSchema: Yup.SchemaOf<any> = Yup.object().shape({
  user: Yup.object().shape({
    stepCurrent: Yup.number(),
    chainId: Yup.number().required('Required'),
    accountId: Yup.string().required('Required')
  }),
  metadata: Yup.object().shape(validationMetadata),
  services: Yup.array().of(Yup.object().shape(validationService)),
  pricing: Yup.object().shape(validationPricing)
})
