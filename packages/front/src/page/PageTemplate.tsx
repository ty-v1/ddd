import React from 'react';

export const PageTemplate: React.FC = ({ children }) => {
  return (
    <div>
      <main>
        <nav>
          {/*TODO パンくず*/}
        </nav>
        <div>
          {children}
        </div>
      </main>
    </div>
  );
};
