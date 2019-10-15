import React, { useState, useEffect } from 'react'

import { Wrap, Content, Chip } from './styled'

function Collapsible(props: React.PropsWithChildren<{ openOnInit: boolean; fixed: boolean }>) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!props.openOnInit) {
      setOpen(false)
      return
    }

    const timeout = setTimeout(() => {
      setOpen(true)
    }, 50)

    return () => clearTimeout(timeout)
  }, [props.openOnInit])

  return (
    <Wrap fixed={props.fixed}>
      <Chip onClick={() => setOpen(!open)}>Form</Chip>
      <Content isOpen={open}>{props.children}</Content>
    </Wrap>
  )
}

export default Collapsible
