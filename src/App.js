//this file contains our app component. And it is also allowed to import resources
import Header from './Header'; 
import AddItem  from './AddItem';
import SearchItem from './SearchItem'
import Content from './Content';
import Footer from './Footer';
import { useState } from 'react';

//the component is actually a function. Modern react uses functional components
//but you may see some legacy code with class components. 
//this function we use to create components could be an arrow function and nothing will be changed
function App() {
  //default state that the app will open with. State basically means aplication data
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')));
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');


  const setAndSaveItems = newItems => {
    setItems(newItems); //update the state
    localStorage.setItem('shoppinglist', JSON.stringify(newItems)); //saves the items to our shopping list in our local storage
  }

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setAndSaveItems(listItems);
  }

  const handleCheck = id => {
      const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
      setAndSaveItems(listItems);
  }

  const handleDelete = id => {
      const listItems = items.filter((item) => item.id !== id);
      setAndSaveItems(listItems);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(!newItem) return;
    //addItem
    addItem(newItem);
    setNewItem('');
  }

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem 
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
      />
      <SearchItem 
        search = {search}
        setSearch = {setSearch}
      />
      <Content 
      items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))} 
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
