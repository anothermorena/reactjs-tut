import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa'; //imports fontawesome icons

const Content = () => {
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
    <main>
    {items.length ? (
        <ul>
            {items.map((item) => (
                <li className="item" key={item.id /* Each list item needs a key in react for react to keep track of changes*/}>
                    <input
                        type="checkbox"
                        onChange={() => handleCheck(item.id)}
                        checked={item.checked}
                    />
                    <label
                        style={(item.checked) ? { textDecoration: 'line-through' } : null}
                        onDoubleClick={() => handleCheck(item.id)}
                    >{item.item}</label>
                    <FaTrashAlt
                        onClick={() => handleDelete(item.id)}
                        role="button"
                        tabIndex="0" 
                    />
                </li>
            ))}
        </ul>
    ) : (
        <p style={{ marginTop: '2rem' }}>Your list is empty.</p>
    )}
</main>
  )
}

export default Content; 