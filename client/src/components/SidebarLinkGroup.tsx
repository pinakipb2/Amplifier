import React, { useState } from "react";

const SidebarLinkGroup = ({ children, activeCondition }: any) => {
  const [open, setOpen] = useState(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return <div>{children(handleClick, open)}</div>;
};

export default SidebarLinkGroup;
