import { Link } from 'react-router-dom';
import '../Styles/Sidebar.css';


function Sidebar({ title, items = [] }) {

  return (
    <aside className="dash-sidebar">

      <div className="dash-sidebar__title">
        {title}
      </div>


      <nav className="dash-sidebar__nav">

        {items.map((item) => (

          <Link
            key={item.label}
            to={item.href}
            className={`dash-sidebar__item ${
              item.active ? 'is-active' : ''
            }`}
          >

            {item.icon}

            <span>
              {item.label}
            </span>

          </Link>

        ))}

      </nav>

    </aside>
  );
}


export default Sidebar;