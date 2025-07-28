import React, { forwardRef, useState, useEffect } from 'react'

const ToolColor = ({ selectedColor }) => {


  return (
    <div style={{ backgroundColor: selectedColor }} className={`h-[1.3rem] w-[1.3rem] border-1 border-white rounded-full  `}></div>
  )
}

export default ToolColor