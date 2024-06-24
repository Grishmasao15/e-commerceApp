export const Select = ({ children, label, error,validation }) => {
  return (
    <div>
      <label htmlFor="" className="form-label">
        {label}
      </label> 
    
    {children}
    
    {error && <small className="error text-red-600">{error.message}</small>}
    </div>
  );
};


// export const Option=()=>{
//   return
// }