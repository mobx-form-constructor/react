import React from 'react'
import { Field as IField } from '@mobx-form-constructor/core'
import { useObserver } from 'mobx-react-lite'

export interface IBaseProps<T> {
  field: IField<any, any>
  type?: 'input' | 'checkbox' | 'radio'
  value?: string
  component: T
}

export type FieldPropsType<C extends React.ElementType> = IBaseProps<C> &
  React.ComponentPropsWithRef<C>

export function Field<T extends React.ElementType = 'input'>({
  field,
  type,
  value,
  component,
  ...rest
}: FieldPropsType<T>) {
  return useObserver(() => {
    const bindings =
      type === 'radio'
        ? field.bindRadio(value)
        : type === 'checkbox'
        ? field.bindCheckbox()
        : field.bind()

    const error = (field.touched || field.form.submitFailed) && field.error

    return React.createElement(component, { ...bindings, ...rest, type, error })
  })
}
