[Korean Version](./README.md)

# React Form Context

Using [React Context](https://reactjs.org/docs/context.html), make easy to maintain `data` for certain Component and its children.


## Quick Tutorial
`App/FormProvider.js`
```javascript
import reactFormContext from 'halfz/react-form-context';

const defaultValue = {
  field: 1,
  field2: 2,
};

const {
  Provider, Consumer, useFormContext,
} = reactFormContext(defaultValue);
export default Provider;
export {
  useFormContext,
  Consumer,
};
```

`App/Container.js`
```javascript
import React from 'react';
import FormProvider from './FormProvider';
import ChildComponent from './ChildComponent';

const Container = () => (
  <FormProvider>
    <ChildComponent/>
  </FormProvider>
);

export default Container;
```


`App/ChildComponent.js`
```javascript
import React from 'react';
import Consumer from 'App/FormProvider';

const Container = () => (
  <Consumer>
    {([data, updateData, setData]) => {
      return (<input value={data.field1} onChange={(e) => updateData('field1')(e.target.text)} />)
    }}
  </Consumer>
);

export default Container;
```

# APIs

### reactFormContext

- Usage
```javascript
import reactFormContext from 'halfz/react-form-context';
const {
  Provider,
  Consumer,
  useFormContext,
} = reactFormContext({/*<default-value>*/});
```
- Return Value
  - `Provider`
  
     [React Context Provider](https://reactjs.org/docs/context.html#contextprovider) with `data`
     
  - `Consumer`
     
     [React Context Consumer](https://reactjs.org/docs/context.html#contextconsumer) for `data`
     
  - `useFormContext`
  
     [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext) with `data` context
     
### Provider

- Usage

```javascript
  <Provider>
    <Compoment>
  </Provider>
```

### Consumer

- Usage

```javascript
  <Consumer>
    {([data, updateData, setData]) => {
      return (<input value={data.field1} onChange={(e) => updateData('field1')(e.target.text)} />)
    }}
  </Consumer>
````

  - data 
    
    `data` from `context`
    
  - updateData 
  
    - Usage
    
    ```javascript
    updateData(fieldName)(updateValue)
    ```
    
    Method changes certain field of `data`
    
  - setData
  
    - Usage
    
    ```javascript
    setData(newDat)
    ```
    
    Method changes `data`
    
### useFormContext


- Usage

```javascript
const Component = () => {
   const [data, updateData, setData] = useFormContext();
   return (<input value={data.field1} onChange={(e) => updateData('field1')(e.target.text)} />)
}
````

- This code is same with `Comsumer` example.
