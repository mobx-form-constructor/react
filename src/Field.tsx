import React, { ComponentType, ComponentPropsWithRef, ReactNode } from 'react'
import { Field as IField } from '@mobx-form-constructor/core'
import { useObserver } from 'mobx-react-lite'

export type BindType = 'input' | 'checkbox' | 'radio'

export interface IBaseProps<
  F extends IField,
  T extends BindType,
  C extends FieldComponentType = ComponentType<FieldComponentProps>
> {
  field: F
  type?: T
  value?: F['value']
  component: C
}

export type GenericComponentType = 'input' | 'textarea' | 'select'
export type FieldComponentType = ComponentType<any> | GenericComponentType

export type Bindings<
  F extends IField,
  T extends BindType = 'input'
> = ReturnType<
  T extends 'input'
    ? F['bind']
    : T extends 'checkbox'
    ? F['bindCheckbox']
    : T extends 'radio'
    ? F['bindRadio']
    : never
>

export type FieldComponentProps<
  F extends IField = IField,
  T extends BindType = 'input'
> = Bindings<F, T> & {
  field: F
  error: F['error']
  children: ReactNode
}

export function Field<
  C extends FieldComponentType,
  F extends IField,
  T extends BindType
>({
  field,
  type,
  value,
  component,
  ...rest
}: (C extends ComponentType<infer P>
  ? Omit<P, 'component' | keyof FieldComponentProps> &
      Partial<FieldComponentProps<F, T>>
  : ComponentPropsWithRef<C>) &
  IBaseProps<F, T, C>) {
  return useObserver(() => {
    const bindings =
      type === 'radio'
        ? field.bindRadio(value)
        : type === 'checkbox'
        ? field.bindCheckbox()
        : field.bind()

    const error = (field.touched || field.form.submitFailed) && field.error

    return React.createElement(component, {
      ...bindings,
      ...rest,
      type,
      error: typeof component !== 'string' ? error : undefined,
      field: typeof component !== 'string' ? field : undefined
    })
  })
}
