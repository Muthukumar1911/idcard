import React, { useState, useRef } from 'react';
import './App.css';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver'; // Change from 'downloadjs' to 'file-saver'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    photo: null,
    rollNo: ''
  });
  const idCardRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePhotoChange = (e) => {
    setFormData({
      ...formData,
      photo: URL.createObjectURL(e.target.files[0])
    });
  };

  const downloadCard = () => {
    html2canvas(idCardRef.current).then(canvas => {
      canvas.toBlob(blob => {
        saveAs(blob, 'id_card.png');
      });
    });
  };

  return (
    <div className="App flex justify-center items-center">
      <div className="max-w-xl border p-8 rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">ID Card Generator</h1>
        <form className="space-y-4 flex flex-col">
          <input className='p-3 rounded-lg bg-slate-100' placeholder="Name" type="text" name="name" value={formData.name} onChange={handleInputChange} />
          <input className='p-3 rounded-lg bg-slate-100' placeholder="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} />
          <input className='p-3 rounded-lg bg-slate-100' placeholder="Mobile" type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
          <input className='p-3 rounded-lg bg-slate-100' placeholder="Address" type="text" name="address" value={formData.address} onChange={handleInputChange} />
          <input className='p-3 rounded-lg bg-slate-100' placeholder="RollNo" type="text" name="rollNo" value={formData.rollNo} onChange={handleInputChange} />
          <input className='p-3 rounded-lg bg-slate-100' type="file" accept="image/*" onChange={handlePhotoChange} />
        </form>
        <div className="id-card mt-6" ref={idCardRef}>
  <div className="bg-gradient-to-b from-blue-400 to-blue-600 p-3 rounded-t-md">
    <h2 className="text-white text-2xl pb-6 font-bold text-center">ABC Technologies</h2>
  </div>
  <div className="bg-slate-50 p-4 flex items-center justify-between">
    <div className="flex flex-col">
      {formData.photo && <img className="rounded-full mx-6 w-24 h-24 object-cover" src={formData.photo} alt="Photo" />}
      <p><strong>Name:</strong> {formData.name}</p>
      <p><strong>Email:</strong> {formData.email}</p>
      <p><strong>Phone:</strong> {formData.phone}</p>
      <p><strong>Address:</strong> {formData.address}</p>
      <p><strong>Roll No:</strong> {formData.rollNo}</p>
    </div>
    <div className="mx-3">
      <QRCode value={JSON.stringify(formData)} />
    </div>
  </div>
  {/* Adding a stripe line */}
  <div className="bg-gradient-to-b from-blue-400 to-blue-600 h-1"></div>
</div>

        <button onClick={downloadCard} className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
          Download ID Card
        </button>
      </div>
    </div>
  );
}

export default App;

