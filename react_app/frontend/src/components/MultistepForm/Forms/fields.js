import React from "react";
 
export const Field = ({ children, label, error }) => {

  if(label==="Gender"){
    return(
      <div>
        <label htmlFor="" className="form-label">
          {label}
        </label>    
        {children[0]}
        <label htmlFor="" className="form-label">
          {children[0].props.id}
        </label>
        {children[1]}
        <label htmlFor="" className="form-label">
          {children[1].props.id}
        </label>
        {children[2]}
        <label htmlFor="" className="form-label">
          {children[2].props.id}
        </label>
        {error && <small className="error text-red-600">{error.message}</small>}        
      </div>
    )
  }

  else{

    const id = getChildId(children);
   
    return (
      <div className="col-sm-12 mb-3">
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        {children}<br></br>
        {error && <small className="error text-red-600">{error.message}</small>}
      </div>
    );
  }

};
 
// Get id prop from a child element
export const getChildId = (children) => {
  const child = React.Children.only(children);
 
  if ("id" in child?.props) {
    return child.props.id;
  }
};

export const getChildren=(children,label,error)=>{
  alert("in getchildren")
  console.log(children,"childrenssssss");
  console.log(label,"lebelllllllll");

}
