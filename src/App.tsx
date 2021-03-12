import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

export default App;
