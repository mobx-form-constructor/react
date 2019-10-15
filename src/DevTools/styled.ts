import styled from 'styled-components'

export const Wrap = styled.div`
  padding: 1rem;
  background: #2a2f3a;
  height: 100%;
  width: 300px;
  & > ul {
    background: transparent !important;
    margin: 0 !important;
  }
  overflow: scroll;
  box-sizing: border-box;
  select {
    height: 24px;
    background: transparent;
    color: #ececec;
    border: none;
    font-size: 16px;
    width: 100%;
    margin: 10px 0;
  }
`

export const NoForms = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ececec;
`
