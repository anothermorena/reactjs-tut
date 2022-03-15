//this file contains our app component. And it is also allowed to import resources
import Header from './Header'; 
import Content from './Content';
import Footer from './Footer';

//the component is actually a function. Modern react uses functional components
//but you may see some legacy code with class components. 
//this function we use to create components could be an arrow function and nothing will be changed
function App() {
  //the return statement in a component returns JSX
  //inside any component function we create, we can add more javascript e.g.:
  const name = "Morena"; //this is just fine. nd can be used later inside the JSX

  return (
    <div className="App">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

//this export statement has a default export for the component. 
//This means App is the only thing being exported in this file
export default App;
