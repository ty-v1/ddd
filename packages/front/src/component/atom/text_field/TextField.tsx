import React, { ChangeEvent } from 'react';

type TextFieldProps = {
  readonly value?: string;
  readonly type?: 'text';
  readonly onChange?: (value: string) => void;
} | {
  readonly value?: number;
  readonly type: 'number';
  readonly onChange?: (value: number) => void;
}


const TextField: React.FC<TextFieldProps> = (props) => {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (props.onChange === undefined) {
      return;
    }

    if (props.type === 'number') {
      props.onChange(Number.parseInt(event.target.value, 10));
    } else {
      props.onChange(event.target.value);
    }
  };

  return <input value={props.value} type={props.type} onChange={handleChange}/>;
};

export default TextField;
