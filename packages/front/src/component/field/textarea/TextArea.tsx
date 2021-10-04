import React, { ChangeEvent } from 'react';

type TextAreaProps = {
  readonly value?: string;
  readonly onChange?: (value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = (props) => {

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (props.onChange === undefined) {
      return;
    }

    props.onChange(event.target.value);
  };

  return <textarea value={props.value} onChange={handleChange}/>;
};

export default TextArea;
