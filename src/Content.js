import { useState } from 'react' //this is a react hook 

const Content = () => {
    //here we use array destrucring to get all these from the useState object or Hook
    //name provides the current state of this component at any given time
    //setName updates or set the state of the component as changes occur
    const [name,setName] = useState("Morena"); //we pass data to this object which acts as default data/state as the component loads
    const [count,setCount] = useState(0);

    //in js/react functions are typically started with handle. It is just a convention
    const handleNameChange = () => {
        const names = ['Bob','Kevin','Dave'];
        const int = Math.floor(Math.random() * 3); //generates a random number betwwen 0 and 2
        setName(names[int]);
    }

    //handling click events
    const handleClick = () => {
        setCount(count + 1);
        console.log(count); 
    }

    const handleClick2 = name => { 
        console.log(`${name} was clicked`);
    }

    const handleClick3 = e => {
        console.log(e.target);
    }


  return ( 
    <main>
           
    </main>
  )
}

export default Content; 