import React, { useState } from 'react';
import { createOutcome } from '../utils/api'; // Ensure this function is defined in your API utility

const AddOutcome = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createOutcome({ title, description });
      alert('Outcome added successfully!');
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding outcome:', error);
      alert('Failed to add outcome.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <button type="submit">Add Outcome</button>
    </form>
  );
};

export default AddOutcome;