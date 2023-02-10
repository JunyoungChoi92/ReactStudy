#### 알림

- 출처가 별도로 적혀있지 않은 경우, "벨로퍼트와 함께하는 모던 리액트"(https://react.vlpt.us/) 출처임을 밝힙니다.

===

# INDEX

1. [React](#react)
2. [Virtual DOM, reflecting a actual DOM.](#virtual-dom-reflecting-a-actual-dom)
3. [onClick, onChange, setState](#onclick-onchange-setstate)
4. [클래스형 컴포넌트의 라이프사이클](#클래스형-컴포넌트의-라이프사이클)
5. [useRef](#useref)
6. [useEffect](#useeffect)
7. [useMemo, useCallback, React.memo](#usememo-usecallback-reactmemo)
8. [useReducer](#usereducer)
9. [useState vs useReducer](#usestate-vs-usereducer)
10. [React.createContext](#reactcreatecontext)
11. [변수의 불변성을 지키기 위하여 - immer library](#변수의-불변성을-지키기-위하여---immer-library)
12. [componentDidCatch](#componentdidcatch)
13. [Meaning of &(Ampersand) in React](#meaning-of-ampersand-in-react)
14. [styled-components](#styled-components)
15. [React Router](#react-router)
16. [React API](#react-api)
17. [Redux](#redux)
18. [Redux Middleware](#redux-middleware)

===

## React

- React is a popular JavaScript library used for building user interfaces. It was developed by Facebook and is now maintained by Facebook and a community of individual developers and companies.

- There are several reasons why React is widely used:

  1. **Reusable Components**: React allows developers to create reusable UI components, which makes it easier to build complex user interfaces.
  2. **Virtual DOM**: React uses a virtual DOM, which increases the app's performance by making updates faster. The virtual DOM can update the real DOM more efficiently than a direct update.
     ![dirtyCheking](https://hyunyujin.github.io/img/dirty-check.png)
     [출처](https://hyunyujin.github.io/2021/03/14/React03.html)

  - but Why we use Virtual DOM? Javscripts performance is upgrading in every year and year?
  - Browser's workflow is here.
    ![browsing](https://velopert.com/wp-content/uploads/2017/03/wvbwscn7oadykroobdd3.png)
  - The real problem with DOM manipulation is that each manipulation causes layout changes, tree changes, and rendering. So, for example, if you modify 30 nodes one by one, that means 30 (potential) layouts recalculation and 30 (potential) re-rendering.

  - Virtual DOM isn't just very new, it's just double buffering at the DOM level. When a change occurs, we apply it to the offline DOM tree. This DOM tree **doesn't** even render, so the computational cost is low. After the calculation is finished, the final change is thrown into the actual DOM. we are only doing it **once**. bringing all the changes together Then, the scale of layout calculation and re-rendering will grow. That's how, by combining and applying it, we reduce the number of operations.

  - In fact, this process can be done without Virtual DOM. Just, when there is a change, we can tie the changes and apply it to the DOM fragment and throw it to the existing DOM.

  - So, what is Virtual DOM trying to solve? The process of managing the DOM fragment is automated and abstracted without having to manually work one by one. Not only that, but if we do this ourselves, we have to keep track of which of the existing values has changed and which hasn't changed, which is also what Virtual DOM does automatically. They figure out what's changed, what's not changed.

  - Finally, by allowing Virtual DOM to manage DOM, **we do not have to interact with other components when a component requests DOM manipulation**, and **we do not have to share information** about whether we want to manipulate a particular DOM or have already manipulated it. So we can bring all the work together without having to go through the synchronization of each change.

  - Virtual DOM is not just a DOM manipulator, it is introduced to implement a Declarative development that moves on a per-component basis. It was necessary to introduce a more efficient DOM manipulation method to implement component-level development.

  - One of the common misconceptions is that React is faster than the code writen by javascript. However, React is only fast enough in the normal case, and not fast enough for optimized javascript code as long as double buffers(virtual DOM) are used. As I mentioned earlier, React enables the development of component units, and it is characterized by the use of virtual DOM for this purpose. Therefore, React optimization is an essential option for fast processing.

  - [출처](https://medium.com/@RianCommunity/react%EC%9D%98-%ED%83%84%EC%83%9D%EB%B0%B0%EA%B2%BD%EA%B3%BC-%ED%8A%B9%EC%A7%95-4190d47a28f)

  3. **Unidirectional Data Flow**: React follows a unidirectional data flow, which means that the parent components pass data to child components through props. This helps in maintaining the consistency of the app and debugging it is easier.
  4. **Server-side rendering**: React can be used for server-side rendering, which means that the initial HTML can be rendered on the server and then sent to the client, rather than being generated completely on the client-side. **cau.) 기본적으로 CSR이지만, NextJS 등 라이브러리를 통해 SSR 구현이 가능함.**
  5. **Popularity**: React is one of the most popular front-end libraries and has a large community, which means that there are many resources available for learning and support.

- Overall, React makes it easier to build scalable, fast, and dynamic user interfaces, which is why it has become so popular.

## Virtual DOM, reflecting a actual DOM.

![virtual Dom](https://blog.kakaocdn.net/dn/pIbeG/btrqVvNGLLc/cCZ6KqfEm1uGwoC9whPdZk/img.png)

- React is used to build user interfaces because of its efficient and effective handling of changes to the data, also known as **"state"**. When the state of a component changes, React needs to update the corresponding parts of the user interface to reflect that change.

- React uses a concept called **"dirty checking"** to optimize this process. Dirty checking refers to the process of checking **whether the state of a component has changed** and, **if it has, updating the corresponding parts of the user interface**. With traditional dirty checking, the entire component tree is re-rendered on every state change, which can be slow and resource-intensive, especially for complex applications.

- React solves this problem with **the virtual DOM**. The virtual DOM is a lightweight, in-memory representation of the real DOM, the tree structure of HTML elements that a browser uses to render a page. **When the state of a component changes, React updates the virtual DOM representation of the component.** React then calculates the difference between **the virtual DOM before and after** the change and updates the real DOM only with the necessary changes, making the updates as efficient as possible.

- In this way, React's use of the virtual DOM and its efficient dirty checking process allow it to update the user interface quickly and efficiently, making it a popular choice for building dynamic and interactive user interfaces.

## onClick, onChange, setState

- **onClick** is a prop that you can add to a React component to make it trigger a function when the component is clicked. It's commonly used with buttons and other interactive elements.

- **onChange** is a prop that's used with form inputs such as text fields and select elements. It allows you to run a function when the value of the input changes.

- **setState** is a method in React that allows you to change the state of a component. **State** is an object that holds data specific to a component, and can be updated in response to user interactions or other events. **When the state changes, the component will re-render to reflect the updated state**. The setState method takes an object that describes the changes to the state and merges it with the current state, triggering a re-render if necessary.

  - Note: setState should be used judiciously, as too many updates to the state can impact performance. In some cases, it's more efficient to **use the useState hook or the useReducer hook instead**.

- In React, **setState is a method used to update the state of a component**. The state is an object that holds data and represents the components' dynamic data, which can change during the lifetime of a component. When the state changes, React updates the component by re-rendering it, making sure that the user interface stays up-to-date.

- The concept of the virtual DOM is closely related to how React updates components. \***\*The virtual DOM** is a virtual representation of the actual DOM** (the Document Object Model), which is the tree structure of HTML elements that a browser uses to render a page. The virtual DOM is a lightweight, in-memory representation of the real DOM that React uses to keep track of changes and update the real DOM **efficiently\*\*.

- **When the state of a component changes, React updates the virtual DOM representation of the component**. React then calculates **the difference between the virtual DOM **before and after\***\* the change and updates the real DOM only with **the necessary changes\*\*, making the updates as efficient as possible. This process is much faster than updating the real DOM directly, which can be slow and resource-intensive, especially for complex applications.

- In summary, setState is used to update the state of a component in React, which triggers a re-render of the component and updates the virtual DOM representation. The virtual DOM is then used to update the real DOM efficiently, making sure that the user interface stays up-to-date and responsive.

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

## 클래스형 컴포넌트의 라이프사이클

![lifecycle](https://i.imgur.com/cNfpEph.png)

- In React, a component has several lifecycle methods that give you the ability to control the behavior of a component during its lifetime. These lifecycle methods are called at different stages of the component's existence, from initial render to destruction. The lifecycle methods can be used to perform specific tasks such as setting up a component's initial state, performing data fetching, or cleaning up after a component is no longer needed.

- Here are the main lifecycle methods in React:

  - **constructor**: This method is called before the component is mounted and is used to initialize the component's state and bind event handlers.
  - **componentDidMount**: This method is called after the component has been rendered and is used to perform side effects, such as data fetching, or setting up subscriptions.
  - **shouldComponentUpdate**: This method is called before a re-render and can be used to optimize performance by avoiding unnecessary renderings.
  - **componentDidUpdate**: This method is called after a component has been updated and is used to perform side effects, such as updating the scroll position after a re-render.
  - **componentWillUnmount**: This method is called before a component is destroyed and is used to perform cleanup tasks, such as canceling timers or removing event listeners.

- It's important to note that the lifecycle methods are used differently in **class components**, which are components that are defined using a class, and **functional components**, which are components that are defined using a function. The use of lifecycle methods is also changing in React as the library continues to evolve, with some methods becoming deprecated and new methods being introduced. Nevertheless, understanding the lifecycle methods is crucial for building performant and well-structured React applications.

- **Mounting**: This phase starts when a component is added to the DOM, and it includes the following methods:
- **constructor**: This method is called when the component is created. It's a good place to initialize state and bind event handlers.
- **render**: This method returns a description of what the component should look like. It should be a pure function that doesn't modify the component's state.
- **componentDidMount**: This method is called after the component has been added to the DOM. It's a good place to make API requests, start timers, and interact with other DOM elements.
- **Updating**: This phase starts when the component's state or props change, and it includes the following methods:
- **render**: As mentioned before, this method is called whenever the component needs to re-render.
- **shouldComponentUpdate**: This method is called before the render method, and it allows you to avoid unnecessary re-renders.
- **componentDidUpdate**: This method is called after the component has been updated. It's a good place to make API requests or other updates that depend on the component's state or props.
- **Unmounting**: This phase starts when a component is removed from the DOM, and it includes the following method:
- **componentWillUnmount**: This method is called just before the component is removed from the DOM. It's a good place to clean up any timers, event listeners, or other resources that the component has created.

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

## useRef

- useRef is a hook in React that allows you to access the value of a DOM element or a component instance. **It returns a mutable object with a single property, current, which you can use to store a reference to a DOM node or a component instance**.

- One common use case for useRef is to access the value of an input field or other form element. For example, you can use useRef to store a reference to a text input, and then pass that reference to a function that retrieves the input value.

- Another use case for useRef is to **keep a value that persists across renders**. For example, you can use useRef to store a value that you want to keep track of, even if the component re-renders.

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

## useEffect

- useEffect is a hook in React that allows you to perform **side effects** in your component, such as making API calls, updating the DOM, or tracking analytics. useEffect runs after **every render of your component**, which means **it can react to changes in the component's state or props**.

- **What does useEffect do?** By using this Hook, you tell React that your component needs to do something after render. React will remember the function you passed (we’ll refer to it as our “effect”), and call it later after performing the DOM updates. In this effect, we set the document title, but we could also perform data fetching or call some other imperative API.
- **Why is useEffect called inside a component?** Placing useEffect inside the component lets us access the count state variable (or any props) right from the effect. We don’t need a special API to read it — it’s already in the function scope. Hooks embrace JavaScript closures and avoid introducing React-specific APIs where JavaScript already provides a solution.
- **Does useEffect run after every render?** Yes! By default, it runs both after the first render and after every update. (We will later talk about how to customize this.) Instead of thinking in terms of “mounting” and “updating”, you might find it easier to think that effects happen “after render”. React guarantees the DOM has been updated by the time it runs the effects.
- **Unlike** componentDidMount or componentDidUpdate, **effects scheduled with useEffect don’t block the browser from updating the screen**. This makes your app feel more responsive. **The majority of effects **don’t** need to happen synchronously**. In the uncommon cases where they do (such as measuring the layout), there is a separate useLayoutEffect Hook with an API identical to useEffect.

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

- **clean-up function**:

  - useEffect can also include a cleanup function, which is a function **that is called before the effect is re-run or before the component is unmounted**. The cleanup function is used to undo the changes made by the effect, or to cancel any ongoing operations, such as an ongoing network request.

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

## useMemo, useCallback, React.memo

- **useMemo** is a hook in React that allows you to optimize the performance of your component by **memoizing a computed value**. Memoizing a value means caching the result of a computation so that it can be **reused without having to be recomputed**, as long as its dependencies have not changed. useMemo takes two arguments: a function that returns the memoized value, and an array of dependencies. The memoized value is computed only when one of its dependencies changes.

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

- **useCallback** is a hook in React that allows you to optimize the performance of your component by memoizing a **function**. Memoizing a function means **caching the result of the function** so that it can be reused without having to be re-created, as long as its dependencies have not changed. **useCallback takes two arguments: a function to be memoized, and an array of dependencies**. The memoized function is created only when one of its dependencies changes.

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

- **React.memo** is a higher-order component in React that allows you to optimize the performance of your component by **memoizing its render result**. Memoizing the render result means **caching the output of the component** so that it does not re-render unnecessarily.

- **React.memo works by comparing** the previous and current props of the component **and only re-rendering it if the props have changed**. This is useful when you have a component that does not need to update frequently and you want to avoid the overhead of re-rendering it unnecessarily.
  - Note that React.memo is similar to the useMemo hook, but it is used for **optimizing the performance of components rather than individual values**. While useMemo is used to memoize a computed value, React.memo is used to memoize the render result of a component.

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

## useReducer

- useReducer is a hook in React that allows you to **manage state updates and complex logic in your components in a centralized and structured way**. The hook provides a way to manage state that depends on the previous state and is used as an alternative to setState in some cases.

- useReducer takes two arguments: **a reducer function** and **an initial state**. The reducer function is a pure function that receives the **current state** and **an action** and returns the next state. The initial state is used to initialize the state of the component.
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

## useState vs useReducer

- The decision to use useReducer or useState in React depends on the complexity of the state management in your component.
- useState is a simple and easy-to-use hook that can handle simple state updates in your components. It's good for managing small amounts of state that don't require a lot of logic or computation. For example, if you need to store a single value like a form input, a toggle switch, or a small piece of data, useState is a good choice.
- useReducer, on the other hand, is a more powerful hook that is better suited for complex state management in your components. It's good for managing state updates that require a lot of logic or computation, or state updates that depend on the previous state. For example, if you need to manage state updates that involve multiple values, or if you need to perform complex calculations or logic to determine the next state, useReducer is a good choice.
- In general, if your state updates are simple and straightforward, useState is a good choice. If your state updates are more complex, useReducer is a better choice. However, keep in mind that you can always refactor your code from useState to useReducer if you find that your state management is becoming too complex for useState to handle effectively.

## React.createContext

- React.createContext is a method in React that creates a Context object. A Context provides a way to **share values between components without having to pass props down** manually through every level of the component tree.

- The React.createContext method creates a Context object that can be used to provide values to components. The method takes an optional default value as its argument, which will be used as the value of the context if no value is provided by the nearest Provider.
  - Note that the useContext hook allows you to access the value of the context in a convenient and efficient way, without having to pass the context value down through multiple levels of the component tree as props. This makes it easy to share values between components, **even when they are far apart in the component tree**.

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

## 변수의 불변성을 지키기 위하여 - immer library

```javascript
import React, { useReducer, useMemo } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import produce from "immer";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는중...");
  return users.filter((user) => user.active).length;
}

const initialState = {
  users: [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_USER":
      return produce(state, (draft) => {
        draft.users.push(action.user);
      });
    case "TOGGLE_USER":
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);
        user.active = !user.active;
      });
    case "REMOVE_USER":
      return produce(state, (draft) => {
        const index = draft.users.findIndex((user) => user.id === action.id);
        draft.users.splice(index, 1);
      });
    default:
      return state;
  }
}

// UserDispatch 라는 이름으로 내보내줍니다.
export const UserDispatch = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users} />
      <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
```

- 참조 : https://react.vlpt.us/basic/23-immer.html

## componentDidCatch

- componentDidCatch is a lifecycle method in React that is called when an error is thrown in the render method of a component. This method receives two arguments: the error and an error info object.

It allows developers to catch and handle errors within a component, preventing them from propagating and causing the whole application to break. By using this method, developers can provide fallback UI or log the error to help with debugging.

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

---

## Meaning of &(Ampersand) in React

- The & symbol in React is used as a reference to the class instance. When you declare a class component in React, you can use the this keyword inside the component to access its properties and methods. The & symbol is used to bind the class instance to the method so that it can be used inside the method without having to use this explicitly.

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import styled from "styled-components";

const Thing = styled.div.attrs((/* props */) => ({ tabIndex: 0 }))`
  color: blue;

  // Thing 컴포넌트 위에 마우스가 올라갈때
  &:hover {
    color: red; // <Thing> when hovered
  }

  // Thing의 바로 옆은 아니지만 형제요소일 때
  & ~ & {
    background: tomato; // <Thing> as a sibling of <Thing>, but maybe not directly next to it
  }

  // Thing이 바로 옆에 붙어있을 때
  & + & {
    background: lime; // <Thing> next to <Thing>
  }

  // Thing이 something이라는 클래스를 갖고있을 때
  &.something {
    background: orange; // <Thing> tagged with an additional CSS class ".something"
  }

  // something-else라는 클래스를 가진 친구안에 있을 때
  .something-else & {
    border: 1px solid; // <Thing> inside another element labeled ".something-else"
  }
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <React.Fragment>
      <Thing>Hello world!</Thing>
      <Thing>How ya doing?</Thing>
      <div></div>
      <Thing>How ya doing?</Thing>
      <Thing className="something">The sun is shining...</Thing>
      <div>Pretty nice day today.</div>
      <Thing>Don't you think?</Thing>
      <div className="something-else">
        <Thing>Splendid.</Thing>
      </div>
    </React.Fragment>
  </React.StrictMode>
);
```

![ampersand](https://velog.velcdn.com/images/nowod_it/post/45517639-feca-49f4-99da-9ff1c1fec318/image.png)

## styled-components

- Styled-components is a CSS-in-JS library for React that allows you to write actual CSS code to style your components. It enhances the maintainability and modularity of your styles and eliminates the need for separate CSS files.

- In this case, styled-components do nothing in here with CSS code that developer wrote. background declaration is not added to DOM. the styles for the StyledMyComponent will only be injected when the component is actually rendered in the DOM, and will not be included in the initial payload delivered to the client.

1. Reusing styles: You can create a single styled-component and use it in multiple places throughout your application, making it easy to ensure consistency in your design.
2. Dynamic CSS rules: You can pass props to your styled-components to make the styles dynamic. For example:

```javascript
// example 1 : conditional styling
// Button.js
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export const Button = ({ children, primary }) => (
  <StyledButton primary={primary}>{children}</StyledButton>
);
```

```javascript
// example2 : extension styling
import React from "react";
import styled from "styled-components";
const Container = styled.div`
  max-width: 600px;
  width: 100%;
  height: 100px;
`;

const BlackContainer = styled(Container)`
  background-color: black;
`;

const RedContainer = styled(Container)`
  background-color: red;
`;

return (
  <>
    <BlackContainer />
    <RedContainer />
  </>
);
```

```javascript
// example3 : Interpolated Scope
const StyledDiv = styled.div`
  background-color: black;
  width: 100px;
  height: 100px;
  p {
    color: white;
  }
`;

return (
  <>
    <StyledDiv>
      <p>Title</p>
    </StyledDiv>
    <p>content</p>
  </>
);
```

```javascript
// ex4.) using { css } for dynamic style control
import styled, { css } from "styled-components";

// theme을 변경하는 btn의 스타일링
const ThemeSwitchBtn = styled.button`
  ${({ theme }) => {
    //props로 전달받은 theme 속성을 사용한다.
    // App의 theme state가 변경되면 컴포넌트가 재 렌더링되며 다른 색상 값들을 갖게 된다.
    return css`
      background-color: ${theme.colors.primary};
      color: ${theme.colors.secondary};
      font-size: ${theme.fonts.size.base};
      border-radius: 2px;
    `;
  }}
`;

const CustomHeader = styled.div`
  ${({ theme }) => {
    return css`
      padding: 1rem;
      display: flex;
      justify-content: center;
      background-color: ${theme.colors.secondary};
    `;
  }}
`;

const styledComponents = { ThemeSwitchBtn, CustomHeader };

export default styledComponents;
```

3. Lazy CSS Injection(= Lazy loading): Lazy CSS injection in styled-components is a feature that allows for efficient and optimized stylesheet management in React applications. It works by only injecting the styles for a specific component when it is actually rendered in the DOM.

- This approach helps to reduce the size of the CSS payload delivered to the client, improving the initial load time of the application. Additionally, it also helps with ensuring that only the styles required for the specific components are processed, reducing the runtime overhead.

```javascript
import styled from "styled-components";

export default function App() {
  return <ItemList items={[]} />;
}

function ItemList({ items }) {
  if (items.length === 0) {
    return "No items";
  }

  return <Wrapper>{/* Stuff omitted */}</Wrapper>;
}

const Wrapper = styled.ul`
  background: goldenrod;
`;
```

- In the code above, styled is a factory function from styled-components that takes a HTML tag or a component as an argument and returns a new component with the styles specified in the template literal.

- You can then use the StyledButton component just like any other React component in your application. The styles defined in the template literal will be applied to the StyledButton component.

---

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
  4. Link: a component that allows the user to navigate to a new URL **without** reloading the entire page. Additionally, the Link component provides additional features and functionalities that are specifically designed for use in React applications, such as the ability to programmatically navigate to different routes, the ability to pass data to components that are rendered for a given route, and the ability to control the active state of a link based on the current URL.
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

      <Route exact path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
    </BrowserRouter>
  );
}
```

- Parameter & Query : In the context of React and React Router, a query string and a parameter are **both ways to pass data between routes** in your application.
  - A query string is a string of key-value pairs that is appended to the end of a URL, after a ? symbol. Query strings are used to pass data that is not part of the URL's path structure, but is instead used to provide additional information to the server. For example, the query string **?sort=descending** might be used to specify that data should be sorted in descending order.
  - A parameter, on the other hand, is a placeholder in the URL's path structure that is replaced with a specific value when the URL is used. Parameters are used to pass data that is part of the URL's path structure, and can be used to represent dynamic values, such as a user's ID or a product's name. For example, the URL /user/:123 might contain a parameter named id with the value 123.

```javascript
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
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

      <Route exact path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/user/:id" component={User} />
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function User({ match }) {
  return <h2>User {match.params.id}</h2>;
}
// the :id in the /user/:id path defines a parameter in the URL.
// The value of this parameter is passed to the User component as a property in the match object.
```

```javascript
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link
              to={{
                pathname: "/about",
                search: "?name=john&age=30",
              }}
            >
              About John
            </Link>
          </li>
        </ul>
      </nav>

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

// The URLSearchParams API is used to parse the query string and extract the values of the name and age parameters.
// for instance, ?param1=value1&param2=value2" to param1 = "value1", param2 = "value2", and so on..
function About({ location }) {
  const query = new URLSearchParams(location.search);
  const name = query.get("name");
  const age = query.get("age");
  return (
    <h2>
      About {name} ({age})
    </h2>
  );
}
```

## React API

- These are some examples for calling React API.

```javascript
import { useReducer, useEffect } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useAsync(callback, deps = []) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: false,
  });

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    try {
      const data = await callback();
      dispatch({ type: "SUCCESS", data });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint 설정을 다음 줄에서만 비활성화
    // eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}

export default useAsync;
```

```javascript
import { useAsync } from "react-async";

const loadCustomer = async ({ customerId }, { signal }) => {
  const res = await fetch(`/api/customers/${customerId}`, { signal });
  if (!res.ok) throw new Error(res);
  return res.json();
};

const MyComponent = () => {
  const { data, error, isLoading } = useAsync({
    promiseFn: loadCustomer,
    customerId: 1,
    watch: customerId,
  });
  if (isLoading) return "Loading...";
  if (error) return `Something went wrong: ${error.message}`;
  if (data)
    return (
      <div>
        <strong>Loaded some data:</strong>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  return null;
};
```

## Redux

- Redux is a state management library that was originally designed to work with React, but it can be used with any JavaScript framework or library. It provides a centralized store for holding the application's state, and the store can be updated through actions and reducers.

- **Actions** in Redux are plain JavaScript objects that represent an event that has taken place in the application. They are dispatched using the store's **dispatch** function, and they contain information about the event, such as the type of the event and any data associated with it.

- **Reducers** in Redux are pure functions that take in the current state and an action, and return a new state. They are responsible for updating the application's **state** in response to actions. The new state is returned by the reducer and is stored in the Redux store. Reducer must be a pure function. reducer function has the arguments, State and action object. **the (prior)state must do not be changed, only new State object that occured changing have to be returned**. the reducer function have to return a same result value when reducer function called by exactly same parameters. However, some of the logic may show different results each time you run it(new Date(), or generating random number, etc for example). Such operations are not "pure", so must be handled outside the reducer function. To do that, we use the react **Middlewares**.

- Redux also provides a mechanism for **middleware**, which is code that sits between the dispatch of an action and the update of the store. Middleware can be used to perform additional tasks, such as logging, error handling, and async actions.

- The Redux **store** is a single source for the application's state, and it can be accessed from any point in the application. Usually a one application has one store.

```javascript
// ./index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구

const store = createStore(rootReducer, composeWithDevTools()); // 스토어를 만듭니다.
// composeWithDevTools 를 사용하여 리덕스 개발자 도구 활성화

// If we put the store in the Provider component from react-redux lib and wrap the Counter component around it, any component we render will be able to access the React's store.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();

// ./App.js
import React from 'react';
import CounterContainer from './containers/CounterContainer';
import TodosContainer from './containers/TodosContainer';

function App() {
  return (
    <div>
      <CounterContainer />
      <hr />
      <TodosContainer />
    </div>
  );
}

export default App;

// modules/counter.js
const SET_DIFF = 'counter/SET_DIFF';
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const setDiff = diff => ({ type: SET_DIFF, diff });
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

/* 초기 상태 선언 */
const initialState = {
  number: 0,
  diff: 1
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function counter(state = initialState, action) {
  switch (action.type) {
    case SET_DIFF:
      return {
        ...state,
        diff: action.diff
      };
    case INCREASE:
      return {
        ...state,
        number: state.number + state.diff
      };
    case DECREASE:
      return {
        ...state,
        number: state.number - state.diff
      };
    default:
      return state;
  }
}

//if reducers are not alone in a one application, you can combine them into the one with combineReducer().
// modules/index.js
import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers({
  counter,
  todos
});

export default rootReducer;

// Presentational component is the component using needed values and functions getting from props, not directly interact with reduct store.
// component/Counter.js
import React from 'react';

function Counter({ number, diff, onIncrease, onDecrease, onSetDiff }) {
  const onChange = e => {
    // e.target.value 의 타입은 문자열이기 때문에 숫자로 변환해주어야 합니다.
    onSetDiff(parseInt(e.target.value, 10));
  };
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <input type="number" value={diff} min="1" onChange={onChange} />
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
      </div>
    </div>
  );
}

export default Counter;

// Container component is the component that can dispatch actions or inquire states in redux store. its not using HTML tags and load & use other presentational components.
// CounterContainer.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease, setDiff } from '../modules/counter';

function CounterContainer() {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook입니다.
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다.
  const { number, diff } = useSelector(state => ({
    number: state.counter.number,
    diff: state.counter.diff
  }));

  // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook 입니다.
  const dispatch = useDispatch();
  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = diff => dispatch(setDiff(diff));

  return (
    <Counter
      // 상태와
      number={number}
      diff={diff}
      // 액션을 디스패치 하는 함수들을 props로 넣어줍니다.
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  );
}

export default CounterContainer;

```

## Redux middleware

-
