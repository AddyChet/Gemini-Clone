**React** is an open-source **JavaScript library** for building **user interfaces**, primarily for single-page applications. Developed and maintained by Meta (formerly Facebook) and a community of developers, React focuses on being **declarative, component-based, and efficient**. Here’s a breakdown of its key aspects:

### Core Concepts:
1. **Components**:
   - UIs are built using reusable, self-contained **components** (e.g., `Button`, `Header`, `Card`).
   - Components are written as **JavaScript functions** (modern) or **ES6 classes**.
   - Example of a functional component:
     ```jsx
     function Greeting() {
       return <h1>Hello, React!</h1>;
     }
     ```

2. **JSX (JavaScript XML)**:
   - Syntax extension for JavaScript that resembles HTML.
   - Allows mixing JavaScript logic with UI markup:
     ```jsx
     const element = <h1>Hello, {userName}!</h1>;
     ```

3. **Virtual DOM**:
   - React creates a lightweight copy of the actual DOM ("Virtual DOM").
   - When data changes, React compares the Virtual DOM with the updated state and **efficiently re-renders only what changed** (via "diffing"), boosting performance.

4. **Props and State**:
   - **Props**: Immutable data passed to components (like function parameters).
   - **State**: Mutable data managed within a component (`useState` hook).
   ```jsx
   function Counter() {
     const [count, setCount] = useState(0); // State
     return <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>;
   }
   ```

5. **Hooks** (since React 16.8):
   - Functions that let you "hook into" React state/lifecycle from functional components.
   - Common hooks: `useState`, `useEffect`, `useContext`.
   - Replace class-based component logic.

6. **Unidirectional Data Flow**:
   - Data flows from parent to child components via **props**.
   - State changes are local to components, ensuring predictable behavior.

### Why Use React?
- **Reusability**: Component architecture reduces redundancy.
- **Performance**: Virtual DOM minimizes expensive DOM updates.
- **Flexibility**: Integrates with other libraries (e.g., Redux for state management).
- **Strong Ecosystem**: Rich tooling (Create React App, Next.js), extensive community support, and React Native for mobile apps.

### Sample Workflow:
1. Split UI into components.
2. Design state/props for each component.
3. Write JSX for rendering.
4. Handle user events (e.g., `onClick`).
5. Update state -> triggers re-render -> UI updates.

### Companies Using React:
Meta, Instagram, WhatsApp, Netflix, Airbnb, and Uber.

---

**In short**:  
React is the **V in MVC (Model-View-Controller)** — a powerful library that lets you build dynamic interfaces out of reusable, state-driven components while managing complexity via **declarative code**. 🚀