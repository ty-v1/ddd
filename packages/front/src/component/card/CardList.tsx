import React, { DragEvent, ReactElement, ReactNode } from 'react';
import { Card } from '@/component/card/Card';
import Immutable from 'immutable';
import { useDnDContext } from '@/hook/dnd/DnDContext';

type Props<T> = {
  readonly items: Immutable.List<T>;
  readonly group: string;
  readonly cardFactory: (e: T, index: number) => [ReactNode, string];
}

export const CardList: <T, >(props: Props<T>) => ReactElement<Props<T>> = <T, >(props: Props<T>) => {
  const { items, cardFactory, group } = props;

  const { add, dragItemGroup } = useDnDContext();

  const handleDragOver = (event: DragEvent) => {
    if (group === dragItemGroup) {
      return;
    }

    add(group);
    event.stopPropagation();
  };

  const cards = items.map((e, i) => {
    const [content, key] = cardFactory(e, i);
    return (
      <Card index={i} group={group} key={key}>
        {content}
      </Card>
    );
  });

  return (
    <div onDragOverCapture={handleDragOver}>
      {cards}
    </div>
  );
};
