// components/Form.js
import React from 'react';

const Form = ({ closeForm }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 z-50">
                <button className="text-red-500 float-right" onClick={closeForm}>
                Close
                </button>
                <form>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name:</label>
                    <input type="text" id="name" name="name" required className="w-full p-2 border border-gray-300 bg-white rounded mt-1 text-black" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email:</label>
                    <input type="email" id="email" name="email" required className="w-full p-2 border border-gray-300 bg-white rounded mt-1 text-black" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                </form>
            </div>
            <div className="fixed inset-0 backdrop-blur-[1px] z-40"></div>
        </div>
    );
};

export default Form;
