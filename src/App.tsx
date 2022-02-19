import AssemblyLineComponent from './components/AssemblyLineComponent';

function App() {
  return (
    <div className="container">
      <AssemblyLineComponent stages={[
        "Idea",
        "Development",
        "Testing",
        "Deployment",
      ]} />
    </div>
  );
}

export default App;
