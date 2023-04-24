// useReducer

// useReducer is a hook that is used for state management. It is an alternative to useState. The useReducer hook is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. useReducer also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.

// When to Use useReducer:

// When the state logic of a component is complex and difficult to manage with useState.
// When multiple state values are closely related or have similar update logic.
// When the state updates depend on previous state values.
// When you need to pass state and actions down to deeply nested components.

// Why Use useReducer:

// Provides a more structured approach to managing state in a component.
// Makes it easier to manage complex state logic and update functions.
// Allows for better separation of concerns by keeping state and state update logic in one place.
// Can improve performance in some cases by reducing unnecessary re-renders.

// Side note on switch - its a javascript statement rather than a REACT hook
// When to use switch:

// When you need to execute different code blocks based on different values of a variable or expression.
// When you have multiple conditions to check that are all based on the same value or expression.
// Why use switch:

// Makes code more organized and easier to read than using multiple if statements.
// Can be faster than using multiple if statements, especially when there are many conditions to check.

// example

import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}

export default Counter;

// In this example, the useReducer hook is used to manage the state of a counter component. The reducer function specifies how the state should be updated based on different actions. The dispatch function is used to trigger state updates by passing an action object to it. The initialState object defines the initial state of the component. The state is then rendered in the component's JSX, and the dispatch function is used to update the state when the user clicks the plus or minus buttons.



// useEffect

// useEffect is a hook that is used to perform side effects in a React component. It is a combination of componentDidMount, componentDidUpdate, and componentWillUnmount. useEffect is used to fetch data, set up event listeners, and perform other side effects. It can also be used to clean up after a component unmounts. useEffect is a great way to separate concerns in your component code. It can help keep your component code organized and make it easier to reason about what's happening in your component.

// When to use useEffect:

// When you need to perform a side effect in a React component (e.g. fetching data, updating the DOM, setting up event listeners, etc.).
// When you need to clean up after a side effect when the component unmounts (e.g. removing event listeners, canceling API requests, etc.).
// When you need to update the component in response to changes in state or props.

// Why use useEffect:

// Allows you to perform side effects in a declarative way, making it easier to reason about what's happening in your component.
// Can help prevent memory leaks and improve performance by cleaning up after side effects when the component unmounts.
// Helps keep your component code organized by separating concerns.


import { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://example.com/data');
      const data = await response.json();
      setData(data);
    }

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
}

export default Example;

// In this example, the useEffect hook is used to fetch data from an API endpoint when the component mounts. The fetchData function is an async function that makes a GET request to the specified URL and parses the response as JSON. Once the data is fetched, it is set to the data state variable using the setData function.
// The useEffect hook has an empty dependency array ([]) to ensure that the data is only fetched once when the component mounts. If you want to fetch data whenever a specific prop or state variable changes, you can include that variable in the dependency array.


// useState

// When to use useState:

// When you need to store and update state in a React component.
// When you need to re-render a component in response to changes in state.

// Why use useState:

// Allows you to manage state in a functional component.
// Makes it easier to manage and update state in response to user interactions or other events.
// Helps keep your component code organized by separating concerns.

import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}

export default Counter;

// In this example, the useState hook is used to manage the state of a counter component. The count variable represents the current count, and the setCount function is used to update the count in response to the user clicking the plus or minus buttons. The useState hook is called with an initial value of 0 to set the initial state of the component. The state is then rendered in the component's JSX, and the setCount function is used to update the state when the user clicks the plus or minus buttons.

