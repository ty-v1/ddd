import { createContext, useContext } from 'react';
import { Configuration, DefaultApi } from 'api';

type ApiContextProps = {
  readonly api: DefaultApi
};

export const ApiContext = createContext<ApiContextProps>({
  api: new DefaultApi()
});

export const useApiContext: (config: Configuration) => ApiContextProps = () => useContext(ApiContext);
