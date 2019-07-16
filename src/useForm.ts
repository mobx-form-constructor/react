import { useState, useEffect } from 'react'
import {
  Form,
  IFormConfig,
  ModelConstructorType
} from '@mobx-form-constructor/core'

import { __MOBX_FORM_CONSTRUCTOR_HOOK__ } from './constants'

export function useForm<M extends ModelConstructorType>(
  model: M,
  config?: IFormConfig<InstanceType<M>>,
  $Form = Form
) {
  const [form] = useState(() => new $Form(model as InstanceType<M>, config))

  useEffect(() => {
    if (window[__MOBX_FORM_CONSTRUCTOR_HOOK__]) {
      return window[__MOBX_FORM_CONSTRUCTOR_HOOK__].registerForm(form)
    }
  }, [])

  return form
}
