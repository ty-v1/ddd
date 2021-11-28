import React, { ReactNode } from 'react';
import { Meta } from '@storybook/react';
import { CardList } from '@/component/card/CardList';
import { createDnDContext } from '@/hook/dnd/DnDContext';
import Immutable from 'immutable';
import { useDnD } from '@/hook/dnd/useDnD';

export default {
  component: CardList,
  title: 'CardList',
} as Meta;

type Item = {
  readonly id: number;
  readonly content: string;
};

const items = {
  groupA: Immutable.List([
    {
      id: 1,
      content: 'G1-1',
    },
    {
      id: 2,
      content: 'G1-2',
    },
    {
      id: 3,
      content: 'G1-3',
    },
    {
      id: 4,
      content: 'G1-4',
    },
  ]),
  groupB: Immutable.List([
    {
      id: 5,
      content: 'G2-1',
    },
    {
      id: 6,
      content: 'G2-2',
    },
    {
      id: 7,
      content: 'G2-3',
    },
    {
      id: 8,
      content: 'G2-4',
    },
  ]),
};


const map = Immutable.Map<Immutable.List<Item>>(items);


const Template = () => {


  const factory: (i: Item, index: number) => [ReactNode, string] = ({ id, content }) => {
    return [
      content,
      id.toString(10)
    ];
  };

  const DnDContext = createDnDContext<Item>();
  const context = useDnD<Item>({
    initialData: map
  });

  return (
    <DnDContext.Provider value={context}>
      <div style={{ display: 'flex' }}>
        <div>
          <h3>GroupA</h3>
          <CardList items={context.groupToItems.get('groupA') ?? Immutable.List.of<Item>()}
                    group="groupA"
                    cardFactory={factory}
          />
        </div>
        <div>
          <h3>GroupB</h3>
          <CardList items={context.groupToItems.get('groupB') ?? Immutable.List.of<Item>()}
                    group="groupB"
                    cardFactory={factory}
          />
        </div>
      </div>
    </DnDContext.Provider>
  );
};

export const Default = Template.bind({});
