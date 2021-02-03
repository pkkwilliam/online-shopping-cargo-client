import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import LineBreak from "online-shopping-cargo-parent/dist/lineBreak";
import ChevronRight from "react-bootstrap-icons/dist/icons/chevron-right";
import { Link } from "react-router-dom";

export default function ListMenu(props) {
  const {
    backgroundColor = "#F9F9F9",
    hideArrowIcon,
    items,
    lineBreakColor = "#FFFFFF",
    style,
    textColor = "black",
  } = props;
  const menuItems = items.map((item, index) => {
    return (
      <>
        <Item hideArrowIcon={hideArrowIcon} item={item} textColor={textColor} />
        {index === items.length - 1 ? null : (
          <LineBreak color={lineBreakColor} />
        )}
      </>
    );
  });
  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        borderRadius: 15,
        flexDirection: "column",
        ...style,
      }}
    >
      {menuItems}
    </View>
  );
}

function Item({ item, hideArrowIcon, textColor }) {
  const { content, icon, label, onClick, url = "" } = item;
  return (
    <ItemClickWrapper url={url}>
      <View
        style={{
          flexDirection: "column",

          padding: 15,
          color: textColor,
        }}
        onClick={onClick}
      >
        <View style={{ alignItems: "center", justifyContent: "space-between" }}>
          <View>
            {icon}
            <div style={{ marginLeft: 8 }}>{label}</div>
          </View>
          {hideArrowIcon ? null : <ChevronRight />}
        </View>
        <ItemContent content={content} />
      </View>
    </ItemClickWrapper>
  );
}

function ItemClickWrapper({ children, url }) {
  if (!url) {
    return <>{children}</>;
  } else {
    return <Link to={url}>{children}</Link>;
  }
}

function ItemContent({ content }) {
  return content ? <View style={{ padding: 15 }}>{content}</View> : null;
}
