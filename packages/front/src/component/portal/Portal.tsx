import React from 'react';
import ReactDOM from 'react-dom';

type PortalProps = {
  readonly children: React.ReactElement;
}

const PortalRoot = document.createElement('div');

/**
 * ダイアログやモーダルをdocument root直下にマウントするときに使うポータル
 */
const Portal: React.FC<PortalProps> = ({ children }) => {
  React.useEffect(() => {
    const body = document.querySelector('body');
    body?.appendChild(PortalRoot);
  }, []);

  return ReactDOM.createPortal(
    children,
    PortalRoot,
  );
};

export default Portal;
