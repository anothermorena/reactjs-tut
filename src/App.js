//this file contains our app component. And it is also allowed to import resources
import Header from './Header'; 
import Content from './Content';
import Footer from './Footer';
import { useState } from 'react';

//the component is actually a function. Modern react uses functional components
//but you may see some legacy code with class components. 
//this function we use to create components could be an arrow function and nothing will be changed
function App() {
  //default state that the app will open with
  const [items, setItems] = useState([
    {
        id: 1,
        checked: true,
        item: "One half pound bag of Cocoa Covered Almonds Unsalted"
    },
    {
        id: 2,
        checked: false,
        item: "Item 2"
    },
    {
        id: 3,
        checked: false,
        item: "Item 3"
    }
  ]);

    const handleCheck = (id) => {
      const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
      setItems(listItems); //update the state
      localStorage.setItem('shoppinglist', JSON.stringify(listItems)); //saves the items to our shopping list in our local storage
    }

  const handleDelete = (id) => {
      const listItems = items.filter((item) => item.id !== id);
      setItems(listItems);
      localStorage.setItem('shoppinglist', JSON.stringify(listItems));
  }

  return (
    <div className="App">
      <Header title="Grocery List" />
      <Content 
      items={items} 
      handleCheck={handleCheck}
      handleDelete={handleDelete}
      />
      <Footer length={items.length}/>
    </div>
  );
}

//this export statement has a default export for the component. 
//This means App is the only thing being exported in this file
export default App;
