import { DefaultDateFormatter } from '@/util/constants';
import { Markdown } from '@/component/organism/markdown/Markdown';
import React, { useCallback, useState } from 'react';
import { LocalDateTime } from '@js-joda/core';

// ToDo dto
type Props = {
  readonly id: string;
  readonly description: string;
  readonly updateDateTime: LocalDateTime;
  readonly onUpdate: (id: string, description: string) => void;
};

export const Comment: React.FC<Props> = (props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const toEditMode = useCallback(() => setIsEditMode(true), [setIsEditMode]);
  const toViewMode = useCallback(() => setIsEditMode(false), [setIsEditMode]);

  return (
    !isEditMode
      ? <CommentInner onEdit={toEditMode} {...props}/>
      : <Form description={props.description}
              onCancel={toViewMode}
              onSubmit={(e) => console.log(e)}/>
  );
};

// ToDo dto
type CommentInnerProps = {
  readonly id: string;
  readonly description: string;
  readonly updateDateTime: LocalDateTime;
  readonly onUpdate: (id: string, description: string) => void;
  readonly onEdit: () => void;
};

const CommentInner: React.FC<CommentInnerProps> = ({ id, description, updateDateTime, onEdit }) => {
  return (
    <div className="Box">
      <div className="Box-header">
        <div className="d-flex flex-justify-between">
          <div>
            Commented on {updateDateTime.format(DefaultDateFormatter)}
          </div>
          <div>
            <button className="btn btn-sm mr-1"
                    role="button"
                    onClick={onEdit}>Edit
            </button>
          </div>
        </div>
      </div>
      <div className="Box-row">
        <Markdown>{description}</Markdown>
      </div>
    </div>
  );
};


// ToDo dto
type FormProps = {
  readonly description: string;
  readonly onCancel: () => void;
  readonly onSubmit: (e: string) => void;
};

const Form: React.FC<FormProps> = (props) => {
  const [description, setDescription] = useState(props.description);
  const [isWriteMode, setIsWriteMode] = useState(true);
  const toWriteMode = useCallback(() => setIsWriteMode(true), [setIsWriteMode]);
  const toPreviewMode = useCallback(() => setIsWriteMode(false), [setIsWriteMode]);

  return (
    <div className="Box">
      <div className="Box-row">
        <div className="tabnav">
          <nav className="tabnavs">
            <a className="tabnav-tab"
               aria-current={isWriteMode ? 'page' : false}
               onClick={() => toWriteMode()}>Write</a>
            <a className="tabnav-tab"
               aria-current={!isWriteMode ? 'page' : false}
               onClick={() => toPreviewMode()}>Preview</a>
          </nav>
        </div>

        {
          !isWriteMode
            ? <Markdown>{description}</Markdown>
            : (
              <div className="form-group">
                <div className="form-group-body mb-2">
                  <textarea className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}/>
                </div>

                <button className="btn mr-2"
                        onClick={() => props.onSubmit(description)}>Submit
                </button>

                <button className="btn btn-danger"
                        onClick={() => props.onCancel()}>Cancel
                </button>

              </div>
            )
        }
      </div>
    </div>
  );
};
