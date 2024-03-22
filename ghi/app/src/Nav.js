import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          CarCar
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            </li>
            <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Technicians</a>
          <ul className="dropdown-menu">
            <li><NavLink className="nav-link dropdown-item text-dark" to="/api/technicians">Technicians</NavLink></li>
            <li><NavLink className="nav-link dropdown-item text-dark" to="/api/technicians/new">Add Technician</NavLink></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Appointments</a>
          <ul className="dropdown-menu">
            <li><NavLink className="nav-link dropdown-item text-dark" to="/api/appointments/new">Create a new Appointment</NavLink></li>
            <li><NavLink className="nav-link dropdown-item text-dark" to="/api/appointments">Appointments</NavLink></li>
            <li><NavLink className="nav-link dropdown-item text-dark" to="/api/serviceHistory">Service History</NavLink></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Automobiles</a>
          <ul className="dropdown-menu">
            <li><NavLink className="nav-link dropdown-item text-dark" to="/automobiles">Automobiles</NavLink></li>
            <li><NavLink className="nav-link dropdown-item text-dark" to="/automobiles/new">Create an Automobile!</NavLink></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Manufacturers</a>
          <ul className="dropdown-menu">
            <li><NavLink className="nav-link dropdown-item text-dark" to="/manufacturers">Manufacturers</NavLink></li>
            <li><NavLink className="nav-link dropdown-item text-dark" to="/manufacturers/new">Create a Manufacturer!</NavLink></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Models</a>
          <ul className="dropdown-menu">
            <li><NavLink className="nav-link dropdown-item text-dark" to="/models">Models</NavLink></li>
            <li><NavLink className="nav-link dropdown-item text-dark"  to="/models/new">Create a Model!</NavLink></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Salespeople</a>
          <ul className="dropdown-menu">
            <li><NavLink className="nav-link dropdown-item text-dark" to="/salespeople">Salespeople</NavLink></li>
            <li><NavLink className="nav-link dropdown-item text-dark"  to="/salespeople/new">Create a Salesperson!</NavLink></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Customers</a>
          <ul className="dropdown-menu">
            <li><NavLink className="nav-link dropdown-item text-dark" to="/customers">Customers</NavLink></li>
            <li><NavLink className="nav-link dropdown-item text-dark"  to="/customers/new">Create a Customer!</NavLink></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Sales</a>
          <ul className="dropdown-menu">
            <li><NavLink className="nav-link dropdown-item text-dark" to="/sales">Sales</NavLink></li>
            <li><NavLink className="nav-link dropdown-item text-dark" to="/sales/new">Create a Sale!</NavLink></li>
            <li><NavLink className="nav-link dropdown-item text-dark" to="/SalesHistory">Sales History</NavLink></li>
          </ul>
        </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
