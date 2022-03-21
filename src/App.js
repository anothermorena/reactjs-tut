//this file contains our app component. And it is also allowed to import resources
import Header from './Header'; 
import AddItem  from './AddItem';
import SearchItem from './SearchItem'
import Content from './Content';
import Footer from './Footer';
import { useState,useEffect } from 'react';
import apiRequest from './apiRequest';

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
    //This is read as far as CRUD operations is concerned
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

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    //update our API options for a post request
    const postOptions = {
      method: "POST", //the HTTP Verb that the request will use
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(myNewItem) //the new item that we want to post to our api. 
    }

    //lets send the request
    const result = await apiRequest(API_URL,postOptions);
    if(result) setFetchError(result);  
  
  }

  const handleCheck = async (id) => {
      const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
      setItems(listItems);

   
    //get the item that is checked
    const myItem = listItems.filter((item) => item.id === id);
    //define update options
    const updateOptions = {
      method: "PATCH", //the HTTP Verb that the request will use
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({checked:myItem[0].checked}) 
    };

    //define the request URL: Its a little different than the URL used by GET & POST Verbs
    const reqURL = `${API_URL}/${id}`; // we are accessing a specific post and we are updating it with patch

    //lets send the request
    //the API request only returns an error
    const result = await apiRequest(reqURL,updateOptions);
    if(result) setFetchError(result);  

  }

  const handleDelete = async (id) => {
      const listItems = items.filter((item) => item.id !== id);
      setItems(listItems);

    //handle deleteing items from our API
    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }

    }

    const reqURL = `${API_URL}/${id}`;
    const result = await apiRequest(reqURL,deleteOptions);
    if(result) setFetchError(result);  
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
