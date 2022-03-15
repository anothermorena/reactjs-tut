const Footer = () => {
    const today = new Date();
  return (
    <footer>
        All the copy rights things here  {today.getFullYear()}
    </footer>
  )
}

export default Footer;