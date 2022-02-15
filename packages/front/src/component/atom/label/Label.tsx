import React from 'react';
import styled from 'styled-components';

type LabelProps = {
  readonly color: string;
  readonly name: string;
}

const Label: React.FC<LabelProps> = ({ color, name }) => {
  return (
    <Wrapper color={color}>{name}</Wrapper>
  );
};

type WrapperProps = {
  readonly color: string;
}

const Wrapper = styled.span<WrapperProps>`
  background-color: ${({ color }) => color};
  border-radius: 1rem;
  padding: 0.25rem 0.5rem;
`;

export default Label;
