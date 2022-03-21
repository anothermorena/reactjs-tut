//this file contains our app component. And it is also allowed to import resources
import Header from './Header'; 
import AddItem  from './AddItem';
import SearchItem from './SearchItem'
import Content from './Content';
import Footer from './Footer';
import { useState,useEffect } from 'react';

//the component is actually a function. Modern react uses functional components
//but you may see some legacy code with class components. 
//this function we use to create components could be an arrow function and nothing will be changed
function App() {
  //Source of our application data
  const API_URL = "http://localhost:3500/items";

  //default state that the app will open with. State basically means aplication data
  const [items, setItems] = useState([]);//inital state is an empty array
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  //this is the ideal way to load data into our apps esp when working with API'S
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if(!response.ok) throw Error("Did not receive expected data");
        const listItems = await response.json();

        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      //note that, fetchitems does not return a value.Therefore,this async IIFE(instantly
      //invoked function expression is not required. You can just make a call to fetchItems();
      (async () => fetchItems())(); 

      //make it wait 2 seconds before it makes the async call.
    },2000);
  
  },[]);

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);
  }

  const handleCheck = id => {
      const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
      setItems(listItems);
  }

  const handleDelete = id => {
      const listItems = items.filter((item) => item.id !== id);
      setItems(listItems);
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
      <main>  
        {isLoading && <p>Loading items...</p> /* && means if is loading is true show this paragraph */}
        {fetchError && <p style={{color:"red"}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content 
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))} 
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      <Footer length={items.length}/>
    </div>
  );
}

//this export statement has a default export for the component. 
//This means App is the only thing being exported in this file
export default App;
