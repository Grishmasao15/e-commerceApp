// Forms/Section.js

import { Link } from "react-router-dom";

export const Section = ({ title, children, url }) => {
  return (
    <div className="container">
      <div className="">
        <h4>{title}</h4>
        <Link className={`btn btn-secondary`} to={url}>
          Edit
        </Link>
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export const SectionRow = ({ children }) => {
  return <div className="section-row">{children}</div>;
};
