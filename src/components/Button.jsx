import React,{Children} from 'react';
// import "../app.css";

const btnTypes = {
    add:"add",
    delete:"delete"
}

function Button({type, children, ...rest}) {
  return (
    <button  type={type === 'submit' ? 'submit' : 'button'} className='btn-new' {...rest}>{children}</button>
  )
}



function SelectButton({children, ...rest}){
  return(
    <select className="bg-slate-400 text-gray-700 border rounded px-2 py-1" {...rest}>{children}</select>
  )
}



export default Button;

export {SelectButton};