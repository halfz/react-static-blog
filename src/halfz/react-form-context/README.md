[English Version](./README-EN.md)

# React Form Context

[React Context](https://reactjs.org/docs/context.html)를 이용해 특정 Container 아래에서만 사용되는 데이터 관리는 쉽게 해준다.


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
  
     해당 Container에서 사용되는 데이터를 들고있는 [React Context Provider](https://reactjs.org/docs/context.html#contextprovider)
     
  - `Consumer`
     
     해당 Container에서 들고있는 데이터를 사용할 수 있는 [React Context Consumer](https://reactjs.org/docs/context.html#contextconsumer)
     
  - `useFormContext`
  
     React Hook Helper. Functional React Component에서만 사용 가능
      
      [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext)  참고
     
### Provider

- Usage

```javascript
  <Provider>
    <Compoment>
  </Provider>
```

- Child Component 들이 해당 data를 사용함을 명시함


### Consumer

- Usage

```javascript
  <Consumer>
    {([data, updateData, setData]) => {
      return (<input value={data.field1} onChange={(e) => updateData('field1')(e.target.text)} />)
    }}
  </Consumer>
````

- React Context와 사용방식이 비슷함. 

  - data 
    
    context가 들고 있는 data
    
  - updateData 
  
    - Usage
    
    ```javascript
    updateData(fieldName)(updateValue)
    ```
    
    data의 특정 필드를 수정할 수 있는 함수
    
  - setData
  
    - Usage
    
    ```javascript
    setData(newDat)
    ```
    
    data를 전부다 바꿔치기함
    
### useFormContext


- Usage

```javascript
const Component = () => {
   const [data, updateData, setData] = useFormContext();
   return (<input value={data.field1} onChange={(e) => updateData('field1')(e.target.text)} />)
}
````

- 위의 Consumer example과 동일한 역할을 하는 코드
