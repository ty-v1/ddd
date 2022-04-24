import React, { CSSProperties, DragEvent, DragEventHandler, ReactNode } from 'react';
import { useDnDContext } from '@/hook/dnd/DnDContext';
import styled from 'styled-components';

type Props = {
  readonly index: number;
  readonly group: string;
  readonly children?: ReactNode;
}

// TODO css
const style: CSSProperties = {
  cursor: 'move',
};

export const Card: React.FC<Props> = (props) => {

  const {
    onDragStart,
    onDragEnd,
    move,
    dragItemIndex,
    dragItemGroup
  } = useDnDContext();

  const {
    index,
    group,
    children
  } = {
    ...props,
  };

  const handleDragStart: DragEventHandler = (event) => {
    event.stopPropagation();
    event.dataTransfer.effectAllowed = 'move';

    onDragStart(group, index);
  };


  function handleDragOver(event: DragEvent) {
    event.preventDefault();

    if (dragItemGroup !== group || dragItemIndex === index) {
      return;
    }

    move(index);
  }

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();

    if (dragItemGroup !== group || dragItemIndex === index) {
      return;
    }

    move(index);
  };

  const handleDragenter = (event: DragEvent) => event.preventDefault();
  const handleDragEnd = () => onDragEnd();

  return (
    <Wrapper className="Box p-2 color-bg-overlay mb-2"
             draggable
             onDrop={handleDrop}
             onDragOver={handleDragOver}
             onDragStart={handleDragStart}
             onDragEnd={handleDragEnd}
             onDragEnter={handleDragenter}
             style={style}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-width: 400px;
  width: 400px;

  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;
