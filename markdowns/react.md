# React

## react란?

- React is a popular JavaScript library used for building user interfaces. It was developed by Facebook and is now maintained by Facebook and a community of individual developers and companies.
- There are several reasons why React is widely used:
  1. **Reusable Components**: React allows developers to create reusable UI components, which makes it easier to build complex user interfaces.
  2. **Virtual DOM**: React uses a virtual DOM, which increases the app's performance by making updates faster. The virtual DOM can update the real DOM more efficiently than a direct update.
  3. **Unidirectional Data Flow**: React follows a unidirectional data flow, which means that the parent components pass data to child components through props. This helps in maintaining the consistency of the app and debugging it is easier.
  4. **Server-side rendering**: React can be used for server-side rendering, which means that the initial HTML can be rendered on the server and then sent to the client, rather than being generated completely on the client-side. **cau.) 기본적으로 CSR이지만, NextJS 등 라이브러리를 통해 SSR 구현이 쉽게 가능합니다.**
  5. **Popularity**: React is one of the most popular front-end libraries and has a large community, which means that there are many resources available for learning and support.
- Overall, React makes it easier to build scalable, fast, and dynamic user interfaces, which is why it has become so popular.

### onClick, onChange, setState

- **onClick** is a prop that you can add to a React component to make it trigger a function when the component is clicked. It's commonly used with buttons and other interactive elements.

- **onChange** is a prop that's used with form inputs such as text fields and select elements. It allows you to run a function when the value of the input changes.

- **setState** is a method in React that allows you to change the state of a component. State is an object that holds data specific to a component, and can be updated in response to user interactions or other events. When the state changes, the component will re-render to reflect the updated state. The setState method takes an object that describes the changes to the state and merges it with the current state, triggering a re-render if necessary.
  - Note: setState should be used judiciously, as too many updates to the state can impact performance. In some cases, it's more efficient to **use the useState hook or the useReducer hook instead**.

```javascript
import React, { useState } from "react";

const Example = () => {
  const [value, setValue] = useState("");

  const handleClick = () => {
    console.log("Button was clicked!");
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};
```

### useRef

- useRef is a hook in React that allows you to access the value of a DOM element or a component instance. It returns a mutable object with a single property, current, which you can use to store a reference to a DOM node or a component instance.

- One common use case for useRef is to access the value of an input field or other form element. For example, you can use useRef to store a reference to a text input, and then pass that reference to a function that retrieves the input value.

- Another use case for useRef is to keep a value that persists across renders. For example, you can use useRef to store a value that you want to keep track of, even if the component re-renders.

```javascript
import React, { useRef } from "react";

const InputExample = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    console.log(inputRef.current.value);
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Get value</button>
    </div>
  );
};
```

### useEffect

- useEffect is a hook in React that allows you to perform **side effects** in your component, such as making API calls, updating the DOM, or tracking analytics. useEffect runs after **every render of your component**, which means **it can react to changes in the component's state or props**.

- What does useEffect do? By using this Hook, you tell React that your component needs to do something after render. React will remember the function you passed (we’ll refer to it as our “effect”), and call it later after performing the DOM updates. In this effect, we set the document title, but we could also perform data fetching or call some other imperative API.
- Why is useEffect called inside a component? Placing useEffect inside the component lets us access the count state variable (or any props) right from the effect. We don’t need a special API to read it — it’s already in the function scope. Hooks embrace JavaScript closures and avoid introducing React-specific APIs where JavaScript already provides a solution.
- Does useEffect run after every render? Yes! By default, it runs both after the first render and after every update. (We will later talk about how to customize this.) Instead of thinking in terms of “mounting” and “updating”, you might find it easier to think that effects happen “after render”. React guarantees the DOM has been updated by the time it runs the effects.
- Unlike componentDidMount or componentDidUpdate, effects scheduled with useEffect don’t block the browser from updating the screen. This makes your app feel more responsive. The majority of effects don’t need to happen synchronously. In the uncommon cases where they do (such as measuring the layout), there is a separate useLayoutEffect Hook with an API identical to useEffect.

```javascript
import React, { useState, useEffect } from "react";

const Example = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.example.com/data")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};
```

- clean-up function:

  - useEffect can also include a cleanup function, which is a function that is called before the effect is re-run or before the component is unmounted. The cleanup function is used to undo the changes made by the effect, or to cancel any ongoing operations, such as an ongoing network request.

  - useEffect 훅의 콜백 함수가 반환한 componentWillUnmount 함수가 useEffect 훅의 클린-업 함수입니다. 반환하는 함수의 이름은 중요하지 않기 때문에 화살표 함수(() => {})를 반환해도 상관 없습니다. 일반적으로 다음 기능들은 클린-업 기능이 필요하지 않습니다.
    1. API 요청을 통한 데이터 가져오기
    2. 수동으로 React 컴포넌트 DOM 조작하기
    3. 로깅(logging)
  - 반면, 이벤트를 등록한 경우에는 메모리 누수가 발생하지 않도록 이를 정리하는 것이 중요합니다. useEffect 클린-업 함수에 등록한 이벤트를 해제하기 위한 작업을 작성해줍니다.
  - useEffect 클린-업 함수 실행 순서
    - useEffect 훅의 두번째 파라미터로 빈 배열이 들어갔기 때문에 리액트 컴포넌트가 제거되는 시점에 클린-업 함수가 실행됩니다. 명확하게 componentWillUnmount 메소드가 호출되는 동일한 시점에 클린-업 함수가 실행됩니다.
      반면에 useEffect 훅의 두번째 파라미터에 아무 값도 넣어주지 않으면 다음과 같은 순서로 실행됩니다.
      1. props/state 업데이트
      2. 컴포넌트 리-렌더링
      3. 이전 이펙트의 클린-업 함수
      4. 새로운 이펙트 실행

```javascript
import React, { useState, useEffect } from "react";

const Example = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div>Seconds: {seconds}</div>;
};
```

### useMemo, useCallback, React.memo

- **useMemo** is a hook in React that allows you to optimize the performance of your component by memoizing a computed value. Memoizing a value means caching the result of a computation so that it can be reused without having to be recomputed, as long as its dependencies have not changed. useMemo takes two arguments: a function that returns the memoized value, and an array of dependencies. The memoized value is computed only when one of its dependencies changes.

```javascript
import React, { useState, useMemo } from "react";

const Example = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");

  const computedValue = useMemo(() => {
    let result = 0;
    for (let i = 0; i < count; i++) {
      result += i;
    }
    return result;
  }, [count]);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <div>Computed value: {computedValue}</div>
    </div>
  );
};
```

- **useCallback** is a hook in React that allows you to optimize the performance of your component by memoizing a function. Memoizing a function means caching the result of the function so that it can be reused without having to be re-created, as long as its dependencies have not changed. useCallback takes two arguments: a function to be memoized, and an array of dependencies. The memoized function is created only when one of its dependencies changes.

```javascript
import React, { useState, useCallback } from "react";

const Example = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button onClick={handleClick}>Count: {count}</button>
    </div>
  );
};
```

- React.memo is a higher-order component in React that allows you to optimize the performance of your component by memoizing its render result. Memoizing the render result means caching the output of the component so that it does not re-render unnecessarily.

- React.memo works by comparing the previous and current props of the component and only re-rendering it if the props have changed. This is useful when you have a component that does not need to update frequently and you want to avoid the overhead of re-rendering it unnecessarily.
  - Note that React.memo is similar to the useMemo hook, but it is used for optimizing the performance of components rather than individual values. While useMemo is used to memoize a computed value, React.memo is used to memoize the render result of a component.

```javascript
import React from "react";

const MyComponent = React.memo(({ name, age }) => {
  console.log("Rendering MyComponent");
  return (
    <div>
      <div>Name: {name}</div>
      <div>Age: {age}</div>
    </div>
  );
});

const Example = () => {
  const [person, setPerson] = useState({ name: "John", age: 30 });

  return (
    <div>
      <MyComponent name={person.name} age={person.age} />
      <button onClick={() => setPerson({ ...person, age: person.age + 1 })}>
        Increment Age
      </button>
    </div>
  );
};
```

### useReducer

- useReducer is a hook in React that allows you to manage state updates and complex logic in your components in a centralized and structured way. The hook provides a way to manage state that depends on the previous state and is used as an alternative to setState in some cases.

- useReducer takes two arguments: a reducer function and an initial state. The reducer function is a pure function that receives the current state and an action and returns the next state. The initial state is used to initialize the state of the component.
  - Note that useReducer is often used in complex components that need to manage complex state updates and/or perform complex calculations. It is an alternative to the setState method, which can be difficult to manage in complex components. The useReducer hook allows you to manage state updates and complex logic in a centralized and structured way, which can make your components easier to understand and maintain.

```javascript
import React, { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
    </div>
  );
}
```

#### useState vs useReducer

- The decision to use useReducer or useState in React depends on the complexity of the state management in your component.
- useState is a simple and easy-to-use hook that can handle simple state updates in your components. It's good for managing small amounts of state that don't require a lot of logic or computation. For example, if you need to store a single value like a form input, a toggle switch, or a small piece of data, useState is a good choice.
- useReducer, on the other hand, is a more powerful hook that is better suited for complex state management in your components. It's good for managing state updates that require a lot of logic or computation, or state updates that depend on the previous state. For example, if you need to manage state updates that involve multiple values, or if you need to perform complex calculations or logic to determine the next state, useReducer is a good choice.
- In general, if your state updates are simple and straightforward, useState is a good choice. If your state updates are more complex, useReducer is a better choice. However, keep in mind that you can always refactor your code from useState to useReducer if you find that your state management is becoming too complex for useState to handle effectively.

### React.createContext

- React.createContext is a method in React that creates a Context object. A Context provides a way to share values between components without having to pass props down manually through every level of the component tree.

- The React.createContext method creates a Context object that can be used to provide values to components. The method takes an optional default value as its argument, which will be used as the value of the context if no value is provided by the nearest Provider.
  - Note that the useContext hook allows you to access the value of the context in a convenient and efficient way, without having to pass the context value down through multiple levels of the component tree as props. This makes it easy to share values between components, even when they are far apart in the component tree.

```javascript
import React, { createContext, useState } from "react";

const ThemeContext = createContext("light");

function ThemeToggler() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={theme}>
      <button
        onClick={() =>
          setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
        }
      >
        Toggle Theme
      </button>
      <ThemeDisplay />
    </ThemeContext.Provider>
  );
}

function ThemeDisplay() {
  const theme = useContext(ThemeContext);
  return <div>The theme is {theme}</div>;
}
```

### 변수의 불변성을 지키기 위하여 - immer library

- 참조 : https://react.vlpt.us/basic/23-immer.html

### 클래스형 컴포넌트의 라이프사이클

![lifecycle](https://i.imgur.com/cNfpEph.png)

1. Render: Constructor, getDerivedStateFromProps, shouldComponentUpdate, Render
2. Pre-commit: getSnapshotBeforeUpdate
3. Commit: react Dom & refs update, componentDidMount, componentDidUpdate, componentWillUnmount

- Mounting: This phase starts when a component is added to the DOM, and it includes the following methods:
- constructor: This method is called when the component is created. It's a good place to initialize state and bind event handlers.
- render: This method returns a description of what the component should look like. It should be a pure function that doesn't modify the component's state.
- componentDidMount: This method is called after the component has been added to the DOM. It's a good place to make API requests, start timers, and interact with other DOM elements.
- Updating: This phase starts when the component's state or props change, and it includes the following methods:
- render: As mentioned before, this method is called whenever the component needs to re-render.
- shouldComponentUpdate: This method is called before the render method, and it allows you to avoid unnecessary re-renders.
- componentDidUpdate: This method is called after the component has been updated. It's a good place to make API requests or other updates that depend on the component's state or props.
- Unmounting: This phase starts when a component is removed from the DOM, and it includes the following method:
- componentWillUnmount: This method is called just before the component is removed from the DOM. It's a good place to clean up any timers, event listeners, or other resources that the component has created.

```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    console.log("Component mounted");
  }

  componentDidUpdate() {
    console.log("Component updated");
  }

  componentWillUnmount() {
    console.log("Component will unmount");
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increase count
        </button>
      </div>
    );
  }
}
```

### componentDidCatch

===

## React Router

- React Router is a popular third-party library for routing in React applications. It provides a declarative way to manage the routing of your application.

- The Router component takes in a few key props:

- history: an object that provides the methods for managing navigation, such as push, replace, and goBack.
- children: one or more components that will be rendered when the route is active.
- basename: the base URL for all the routes in the application.

- There are several types of components that React Router provides for defining and managing routes:
  1. BrowserRouter: a Router that uses the HTML5 history API to update the URL in response to navigation events.
  2. HashRouter: a Router that uses the URL hash to update the URL in response to navigation events.
  3. Route: a component that matches the current URL to a set of predefined paths and renders the corresponding component when a match is found.
  4. Link: a component that allows the user to navigate to a new URL without reloading the entire page.
  5. Switch: a component that allows you to specify a fallback route that will be rendered if none of the Route components match the current URL.

```javascript
import { BrowserRouter, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </BrowserRouter>
  );
}
```

#### 질문거리

inputs: {
...inputs,
[action.name] : action.value
}
에서의 action.name과,
users: users.map(user => user.id === action.id ? {...user, active: !user.active} : user)
에서의 active: !user.active의 차이??
