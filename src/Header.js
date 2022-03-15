const Header = ({title}) => { //the props comes from the parent component. Here we are using destructuring to pass props
    return (
        <header>
            <h1>{title}</h1>
        </header>
    )
}

//default props
//the component expects a title property from the parent component.If it does not recieve it, it will use the
//the default propperty we set here.
Header.defaultProps = {
    title: "Default Title"
}
export default Header; //we need this exported to import it into the app component
