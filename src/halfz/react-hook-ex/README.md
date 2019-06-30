Check React Hook - [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect) - first

## Quick Tutorial

```javascript
import {useComponentDidMount, useComponentDidUnmount} from 'halfz/react-hook-ex';

const Component = () => {
  
  useComponentDidMount(() => {
    // something for component did mount.
  });
  useComponentDidUnmount(() => {
    // something for component did unmount.
  });
  return <SomeComponent />;
}

```

## APIs

```javascript
useComponentDidMount(() => {/*something*/});
```
```javascript
useComponentDidUnmount(() => {/*something*/});
```
