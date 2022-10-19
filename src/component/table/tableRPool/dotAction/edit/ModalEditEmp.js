import React, { useState } from 'react'

export default function ModalEditEmp() {
    
    const [isModalOpen, setIsModalOpen] = useState(false);


    const showModal = () => {
        // console.log(record.record.record.role)
        setIsModalOpen(true);
      };
  return (
    <div>
      <span onClick={showModal}>Edit</span>
    
    </div>
  )
}
