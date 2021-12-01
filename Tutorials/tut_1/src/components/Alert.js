import React from "react";

export default function Alert(props) {
  return (
    <div style={{height:'60px'}}>
      {props.alrt && <div className={`alert alert-${props.alrt.type.toLowerCase()} alert-dismissible fade show`} role="alert">
        <strong>{props.alrt.type}</strong>: {props.alrt.msg}
      </div>}
    </div>
  );
}
