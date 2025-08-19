import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
    setMenuOpen(false); // close menu after search
  };

  return (
    <div className="nav">
      {/* Left Logo */}
      <div className="left">
        <Link to="/" className="link">
          <h2>React Recipe App</h2>
        </Link>
      </div>

      {/* Hamburger Button */}
      <button
        className="menu-btn"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        ☰
      </button>

      {/* Right Links */}
      <div className={`right ${menuOpen ? "open" : ""}`}>
        <Link to={`/category/indian`} className="link" onClick={() => setMenuOpen(false)}>
          <div>Indian</div>
        </Link>
        <Link to={`/category/american`} className="link" onClick={() => setMenuOpen(false)}>
          <div>American</div>
        </Link>
        <Link to={`/category/british`} className="link" onClick={() => setMenuOpen(false)}>
          <div>British</div>
        </Link>
        <Link to={`/category/chinese`} className="link" onClick={() => setMenuOpen(false)}>
          <div>Chinese</div>
        </Link>
        <Link to={`/category/thai`} className="link" onClick={() => setMenuOpen(false)}>
          <div>Thai</div>
        </Link>
      </div>

      {/* Search */}
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default Navbar;
