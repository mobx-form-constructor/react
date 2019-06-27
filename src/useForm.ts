import { useState, useEffect } from 'react'
import { Form } from '@mobx-form-constructor/core'

import { __MOBX_FORM_CONSTRUCTOR_HOOK__ } from './constants'

export function useForm<F extends Form>(form: (() => F) | F) {
  const [$form] = useState(typeof form === 'function' ? form : () => form)

  if (
    form instanceof Form &&
    $form !== form &&
    process.env.NODE_ENV !== 'production'
  ) {
    console.warn(
      // tslint:disable-next-line:max-line-length
      `[@mobx-form-constructor/react]: You are trying to re-create form instance '${$form.name}', you need to avoid re-render this component or decorate creating form instance by fn`
    )
  }

  useEffect(() => {
    if (window[__MOBX_FORM_CONSTRUCTOR_HOOK__]) {
      return window[__MOBX_FORM_CONSTRUCTOR_HOOK__].registerForm($form)
    }
  }, [])

  return $form
}
