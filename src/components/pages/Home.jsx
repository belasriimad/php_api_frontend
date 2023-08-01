import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchEvents();
  }, [selectedCategory])

  const fetchEvents = async () => {
    try {
      if(selectedCategory) {
        const response = await axios.get(`http://localhost:8000/events/category/${selectedCategory}`);
        setEvents(response.data.events);
      }else {
        const response = await axios.get('http://localhost:8000/');
        setEvents(response.data.events);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="row my-5">
        <ul className="nav justify-content-center my-4">
          <li className="nav-item">
            <a className={`nav-link fw-bold ${selectedCategory === '' ? 'active' : 'text-dark'}`} 
              onClick={() => setSelectedCategory('')}
              href="#">
              All
            </a>
          </li>
          {
            categories?.map(category => (
              <li className="nav-item" key={category.id}>
                <a className={`nav-link fw-bold ${selectedCategory !== '' && selectedCategory === category.id ? 'active' : 'text-dark'}`} 
                  onClick={() => setSelectedCategory(category.id)}
                  href="#">
                  {category.name}
                </a>
              </li>
            ))
          }
        </ul>
        {
          events?.map(event => (
            <div className="col-md-4" key={event.id}>
              <div className="card" style={{border: 'dashed'}}>
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">{event.description}</p>
                  <span className="badge bg-dark">tickets: {event.tickets_availlable}</span>
                </div>
                <div className="card-footer bg-white d-flex justify-content-between">
                  <span className="badge bg-primary">{event.event_address}</span>
                  <span className="badge bg-danger">{event.event_date}</span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Home;
