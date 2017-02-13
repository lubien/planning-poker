import R from 'ramda'
import yayson from 'yayson'
import casefy from 'object-keys-to-case'
import camelCase from 'camel-case'
import snakeCase from 'snake-case'

const {Store} = yayson()
const store = new Store()

export const camelize = str =>
  casefy(str, camelCase)

export const snakefy = str =>
  casefy(str, casefy)

const jsonApiField = ({pointer}) => {
  const fieldRegex = /\/data\/attributes\/(.*)/
  const [, field] = fieldRegex.exec(pointer)
  return field
    .replace('-', '_')
}

const simplifyJsonApiError = ({title, source, detail}) => ({
  field: jsonApiField(source),
  title,
  detail
})

const aggregateJsonApiErrorsFromSameField = (acc, error) => {
  if (!acc[error.field]) {
    acc[error.field] = []
  }

  acc[error.field].push(error)

  return acc
}

export const parseErrors = errors =>
  errors
    .map(simplifyJsonApiError)
    .reduce(aggregateJsonApiErrorsFromSameField, {})

export const parseJsonApi = data =>
  store.sync(data)

export const resolveAsJson = async res => {
  const json = await res.json()

  return R.pipe(
    parseJsonApi,
    camelize
  )(json)
}

export const resolveErrorAsJson = async res => {
  throw (await resolveAsJson(res))
}

export const insertChangesetErrors = errors =>
  R.mergeWith(R.concat, parseErrors(errors))

export const jsonApiRequest = request =>
  request
    .then(resolveAsJson)
    .catch(resolveErrorAsJson)
