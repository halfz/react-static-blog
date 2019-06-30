import {
  createHistory,
  createMemorySource,
  LocationProvider as ReachProvider,
} from '@reach/router';
import React, {
  createContext,
  useContext,
} from 'react';

const history = createHistory(typeof window !== 'undefined' ? window : createMemorySource('/'));

export const LocationContext = createContext({});
const useLocation = () => useContext(LocationContext);

export const LocationProvider = (props) => (
  <ReachProvider history={history}>
    {(reachContext) => (
      <LocationContext.Provider {...props} value={reachContext} />
    )}
  </ReachProvider>
);

export default useLocation;
