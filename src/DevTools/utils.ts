import { Form, FieldsType, Field } from '@mobx-form-constructor/core'
import { toJS } from 'mobx'

export function getFields(fields: FieldsType<any>, data: any = {}) {
  for (const key of Object.keys(fields)) {
    const field = fields[key]

    data[key] =
      field instanceof Field
        ? {
            key: field.key,
            valid: field.valid,
            invalid: field.invalid,
            dirty: field.dirty,
            value: field.value,
            initial: field.initial,
            active: field.active,
            touched: field.touched,
            visited: field.visited,
            error: field.error,
            validating: field.validating,
            pristine: field.pristine
          }
        : {
            key: field.key,
            value: field.value.map(f => (f instanceof Field ? getFields({ '': f }) : getFields(f)))
          }
  }

  return data
}

export function getForm(form: Form) {
  return {
    values: toJS(form.values, {
      detectCycles: true,
      exportMapsAsObjects: true,
      recurseEverything: true
    }),
    initialValues: form.initialValues,
    fields: getFields(form.fields),
    submitting: form.submitting,
    submitted: form.submitted,
    submitFailed: form.submitFailed,
    invalid: form.invalid,
    valid: form.valid,
    pristine: form.pristine,
    dirty: form.dirty,
    errors: form.errors,
    error: form.error
  }
}
