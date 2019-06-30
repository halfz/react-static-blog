import React, {
  createContext,
  useContext,
  useState,
} from 'react';
import Form from './Form';
import FormField from './FormField';

const FormProviderBuilder = (context, form) => (props) => {
  const { Provider } = context;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [dummy, setDummy] = useState(0);
  form.setRefresher(() => setDummy(!dummy));
  return (
    <Provider
      {...props}
      value={[form, dummy]}
    />
  );
};

const FormConsumerBuilder = (context) => (props) => {
  const { Consumer } = context;
  return (
    <Consumer
      {...props}
    >
      {/* eslint-disable-next-line react/destructuring-assignment,react/prop-types */}
      {([form]) => props.children([form.value, form.update, form])}
    </Consumer>
  );
};

export default (form) => {
  const context = createContext();
  const useFormContext = () => {
    const [contextForm] = useContext(context);
    /* halfz/development-only */
    if (contextForm === undefined) {
      console.error('Form Provider Missing!!');
    }
    /* halfz/development-only-end */
    return [contextForm.value, contextForm.update, contextForm];
  };
  return {
    Provider: FormProviderBuilder(context, form),
    Consumer: FormConsumerBuilder(context),
    useFormContext,
    context,
  };
};


export {
  Form,
  FormField,
};
