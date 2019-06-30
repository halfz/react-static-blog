Check React Hook - [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect) - first

Similar with connect(mapStateToProps, mapDispatchToProps) 

## Quick Tutorial

```javascript
import {
  useMapDispatch,
  useMapState,
} from 'halfz/react-hook-redux';

const Component = () => {
  
  
  const mapStateToProps = (state, ownProps) => {
    ...Something
  };
  
  const {
    businesses, technologies, investmentPhases,
  } = useMapState(mapStateToProps, {
    watchSelector: (state) => state.get('app'),
    watchPropSelector: () => null,
  });
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    ...Something
  };
  

  const {
    getBusinesses,
    getInvestmentPhases,
    getTechnologies,
  } = useMapDispatch(mapDispatchToProps, {
    ownProps: props,
  });
  
  // do something
  return <SomeComponent />;
}
```

## APIs

```javascript
useMapState((state) => stateMap, { ownProps});
```
```javascript
useMapDispatch((dispatch) => dispatchMap, { ownProps});
```
```javascript
useMapStateImmutable({
  key: ['get', 'in', 'for', 'immutable']
}, { ownProps});
```

[redux bindActionCreators](https://redux.js.org/api/bindactioncreators)

```javascript
const actions = useBindActionCreators(actions);
```
