import ItemList from './ItemList';

const Content = ({items,handleCheck,handleDelete}) => {

  //empty HTML tags are called fragments in React
  return ( 
    <> 
    {items.length ? (
        <ItemList 
            items={items}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
        />
    ) : (
        <p style={{ marginTop: '2rem' }}>Your list is empty.</p>
    )}
</>
  )
}

export default Content; 