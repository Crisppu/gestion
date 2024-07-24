// app/page.js (Next.js 13)
'use client';

import Form from '@/components/borrarForm/Form';
import { useState } from 'react';

const HomePage = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {showForm ? 'Hide Form' : 'Show Form'}
      </button>
      {showForm && <Form closeForm={closeForm} />}
    </div>
  );
};

export default HomePage;
