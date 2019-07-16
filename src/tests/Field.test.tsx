import React from 'react'
import { Form } from '@mobx-form-constructor/core'
import { render } from '@testing-library/react'

import { Field, FieldComponentProps } from '../Field'

import { Model } from './Model'

interface ICustomInput extends FieldComponentProps {
  label: string
}

export function CustomInput({
  value,
  onChange,
  onBlur,
  onFocus,
  label, // custom property
  field, // field is forwarded
  error,
  children
}: ICustomInput) {
  return (
    <div>
      <div>key: {field.key}</div>
      <label>
        {label}
        <input
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </label>
      {error && <span>{error}</span>}
      {children}
    </div>
  )
}

function FieldTestComponent() {
  const form = new Form(Model)
  return (
    <>
      <Field
        field={form.fields.username}
        component={CustomInput}
        label="Username"
      >
        children
      </Field>
      <Field
        field={form.fields.username}
        component={CustomInput}
        label="Username"
      ></Field>

      <Field field={form.fields.username} component="select" placeholder="sd">
        children
      </Field>
      <Field
        field={form.fields.username}
        component="select"
        placeholder="sd"
      ></Field>
    </>
  )
}

describe('Field', () => {
  it('should renders correctly without any type error', () => {
    const { container } = render(<FieldTestComponent />)

    expect(container).toMatchSnapshot()
  })
})
