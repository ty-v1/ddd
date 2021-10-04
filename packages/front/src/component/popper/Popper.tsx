import React from 'react';
import Portal from '../portal/Portal';
import styled from 'styled-components';

type PopperProps = {
  readonly children: React.ReactElement;
  readonly open: boolean;
};

/**
 * TODO 位置調整できるようにする
 */
const Popper: React.FC<PopperProps> = ({ children, open }) => {


  return (
    <Portal>
      {/*TODO style component化*/}
      <Wrapper open={open}>
        {children}
      </Wrapper>
    </Portal>
  );
};

type WrapperProps = {
  readonly open: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  z-index: 10;
  display: ${({ open }) => open ? 'block' : 'none'};
`;

export default Popper;
