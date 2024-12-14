import logo from "../assets/nest_marketing.svg";
function Header() {
  return (
    <header className="modern-header">
      <div className="header-content">
        <img
          src={logo}
          alt="Nest Marketing logo"
          className="logo"
        />
        <nav className="main-nav">
          <ul>
            <li>
              <a href="/" className="nav-link">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="nav-link">
                About Us
              </a>
            </li>
            <li>
              <a href="/my-products" className="nav-link">
                My Products
              </a>
            </li>
            <li>
              <a href="/board" className="nav-link">
                Orders Board
              </a>
            </li>
            <li>
              <a href="/add-product" className="add-product-btn">
                add product
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
