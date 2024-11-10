import React from 'react';

// Basic Component
function Welcome() {
  return <h1>Hello, React!</h1>;
}

// Component with Props
interface UserProps {
  name: string;
}

function User({ name }: UserProps) {
  return <p>Welcome, {name}!</p>;
}

// Component with State
function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// Usage Example
function App() {
  return (
    <div>
      <Welcome />
      <User name="John" />
      <Counter />
    </div>
  );
}

export default App;