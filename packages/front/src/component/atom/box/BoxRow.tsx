import styled from 'styled-components';

export const BoxRow = styled.div`
  color: #ADBAC7;
  border-bottom: 1px solid #444C56;
  background-color: #22272E;
  padding: 16px;

  &:first-of-type {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  
  &:last-of-type {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

`;
