import React, { useState } from 'react'
import { Form } from '@mobx-form-constructor/core'
import { __MOBX_FORM_CONSTRUCTOR_HOOK__ } from '@mobx-form-constructor/react/constants'

import Collapsible from './Collapsible'
import FormDebugger from './FormDebugger'

interface IProps {
  fixed?: boolean
}

function Debugger({ fixed = true }: IProps) {
  const [forms, setForms] = useState<Form[]>([])

  if (!window[__MOBX_FORM_CONSTRUCTOR_HOOK__]) {
    window[__MOBX_FORM_CONSTRUCTOR_HOOK__] = {
      registerForm(form: Form) {
        setForms([...forms, form])
        return () => {
          setForms(forms.filter(f => f !== form))
        }
      }
    }
  }

  return (
    <Collapsible openOnInit={forms.length > 0} fixed={fixed}>
      <FormDebugger forms={forms} />
    </Collapsible>
  )
}

export default React.memo(Debugger)
