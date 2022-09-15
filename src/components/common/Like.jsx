import React from "react";
const Like = ({ liked, onClick }) => {
  let classes = "clickable fa fa-heart";
  if (!liked) classes += "-o";
  return <i className={classes} onClick={onClick} aria-hidden="true"></i>;
};

export default Like;
