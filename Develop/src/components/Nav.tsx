import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  const selectedPage = useLocation().pathname;
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className={selectedPage === "/" ? "active" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/SavedCandidates" className={selectedPage === "/SavedCandidates" ? "active" : ""}>
            Saved Candidate
          </Link>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;
