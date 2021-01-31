import React from "react";
import MenuView from "./menu.view";

export default function Menu(props) {
  const { menuItems, onClickMenuItem, userToken } = props;
  return (
    <MenuView
      menuItems={generateMenuItemsData(menuItems, userToken)}
      onClick={onClickMenuItem}
      userToken={userToken}
    />
  );
}

function generateMenuItemsData(menuItems, userToken) {
  return menuItems.map((item) => {
    if (item.disabledWhenUserTokenPresent && userToken) {
      item = { ...item, disabled: true };
    }
    return item;
  });
}
