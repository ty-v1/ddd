import React from 'react';
import { QueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';

export const PageTemplate: React.FC = ({ children }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            // TODO modal
            <div>
              There was an error!
              <button onClick={() => resetErrorBoundary()}>Try again</button>
            </div>
          )}>
          <div>
            <main className="p-3">
              <nav>{/*TODO パンくず*/}</nav>
              <div>{children}</div>
            </main>
          </div>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
