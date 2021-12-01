import React, { CSSProperties, DragEvent, DragEventHandler, ReactNode } from 'react';
import { useDnDContext } from '@/hook/dnd/DnDContext';

type Props = {
  readonly index: number;
  readonly group: string;
  readonly width?: string;
  readonly height?: string;
  readonly children?: ReactNode;
}


// TODO css
const style: CSSProperties = {
  cursor: 'move',
  padding: '16px',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: 'black',
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
    width,
    height,
    children
  } = {
    ...props,
    width: '100px',
    height: '100px'
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
    <div draggable
         onDrop={handleDrop}
         onDragOver={handleDragOver}
         onDragStart={handleDragStart}
         onDragEnd={handleDragEnd}
         onDragEnter={handleDragenter}
         style={{
           ...style,
           width,
           height
         }}>
      {children}
    </div>
  );
};
