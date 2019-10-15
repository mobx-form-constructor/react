import styled, { css } from 'styled-components'

export const Chip = styled.span`
  background: #2a2f3a;
  padding: 5px 10px;
  color: #ececec;
  position: absolute;
  z-index: 1000;
  top: 25px;
  left: -42px;
  cursor: pointer;
  border-radius: 5px 5px 0 0;
  transform: rotate(0.75turn);

  &:hover {
    filter: brightness(120%);
  }
`

export const Content = styled.div<{ isOpen: boolean }>`
  height: 100%;
  width: ${({ isOpen }) => (isOpen ? '300' : '0')}px;
  transition: 0.15s ease-in-out;
`

export const Wrap = styled.div<{ fixed: boolean }>`
  height: 100vh;
  ${({ fixed }) =>
    fixed
      ? css`
          position: fixed;
        `
      : css`
          position: relative;
        `};
  right: 0;
  top: 0;
`
