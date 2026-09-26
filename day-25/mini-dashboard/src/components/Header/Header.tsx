import './Header.css'

function Header() {
  return (
    <div className="header-div">
      <img src="favicon.svg" alt="logo" className='logo' width={50} height={40} />
      <img src="images.jpeg" alt="avatar" className="avatar" />
    </div>
  )
}

export default Header