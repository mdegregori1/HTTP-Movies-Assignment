import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
  title: '', 
  director: '',
  metascore: '',
  actors: ''
};


const UpdateForm = props => {
  const [editedMovie, setEditedMovie] = useState(initialMovie);

  useEffect(()=> {
      axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(response => {
          setEditedMovie(response.data)
      })
      .catch(err => console.log(err.response));
  },[props.match.params.id])
 

  const handleChanges = e => {
     setEditedMovie({...editedMovie, [e.target.name]: [e.target.value]})
    }


  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, editedMovie)
      .then(response => {
        props.history.push(`/movies/${props.match.params.id}`);
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="title"
          name="title"
          onChange={handleChanges}
          placeholder="title"
          value={editedMovie.title}
        />
     

        <input
          type="director"
          name="director"
          onChange={handleChanges}
          placeholder="director"
          value={editedMovie.director}
        />
     

        <input
          type="metascore"
          name="metascore"
          onChange={handleChanges}
          placeholder="metascore"
          value={editedMovie.metascore}
        />
 

        <input
          type="actors"
          name="actors"
          onChange={handleChanges}
          placeholder= "actors" 
          value={editedMovie.actors}
        />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
