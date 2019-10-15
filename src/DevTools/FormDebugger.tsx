import React, { useState, useEffect } from 'react'
import { Form } from '@mobx-form-constructor/core'
import JSONTreeComponent from 'react-json-tree'
import { observer } from 'mobx-react-lite'

import { getForm } from './utils'
import { Wrap, NoForms } from './styled'

interface IProps {
  forms: Form[]
}

function FormDebugger({ forms }: IProps) {
  const [form, setForm] = useState(forms.length ? forms[forms.length - 1] : null)

  useEffect(() => {
    if ((!form && forms.length) || forms.find(f => f !== form)) {
      setForm(forms[forms.length - 1])
    }
    if (!forms.length) {
      setForm(null)
    }
  }, [forms])

  function handleFormChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const instance = forms.find(f => f.name === e.target.value)
    if (instance) {
      setForm(instance)
    }
  }

  return (
    <Wrap>
      {form ? (
        <>
          <select onChange={handleFormChange} value={form.name}>
            {forms.map(f => (
              <option value={f.name} key={f.name}>
                {f.name}
              </option>
            ))}
          </select>
          <JSONTreeComponent
            hideRoot
            shouldExpandNode={keyPath => {
              if (keyPath.includes('values')) return true

              return false
            }}
            data={getForm(form)}
          />
        </>
      ) : (
        <NoForms>No forms found</NoForms>
      )}
    </Wrap>
  )
}

export default observer(FormDebugger)
