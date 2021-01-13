import React from "react";
import ClientApplicationComponent from "../clientApplicationComponent";
import P from "online-shopping-cargo-parent/dist/text/paragraph";

const Collapse = React.lazy(() => import("react-bootstrap/Collapse"));

const SHOP_LIST = [
  {
    areaName: "澳門",
    shops: [
      {
        shopNumber: 1130,
        shopName: "PickTB自營取件站",
        shopAddress: "澳門漁翁街166號永好工業大廈7樓F-G座",
        shopPhoneNumber: "28719871",
        openingHour: "週一至週五 9:00AM - 7:00PM",
      },
    ],
  },
  { areaName: "氹仔", shops: [] },
  { areaName: "路環", shops: [] },
];

export default class ShopListView extends ClientApplicationComponent {
  state = {
    showArea: "",
  };

  render() {
    return <this.Area />;
  }

  Area = () => {
    const areaDetails = SHOP_LIST.map((area) => <this.AreaDetail {...area} />);
    return <>{areaDetails}</>;
  };

  AreaDetail = ({ areaName, shops }) => {
    const shopsDetail = this.generateAreaShops(shops);
    return (
      <div onClick={() => this.onClickArea(areaName)}>
        <div>{areaName}</div>
        <Collapse in={this.state.areaName === areaName}>
          <p>{shopsDetail}</p>
        </Collapse>
      </div>
    );
  };

  generateAreaShops(shops) {
    return shops.map((shop) => {
      const {
        shopNumber,
        shopName,
        shopAddress,
        shopPhoneNumber,
        openingHour,
      } = shop;
      return (
        <div>
          <strong>{`店號: ${shopNumber}`}</strong>
          <P>{shopName}</P>
          <P>{shopAddress}</P>
          <P>{shopPhoneNumber}</P>
          <P>{openingHour}</P>
        </div>
      );
    });
  }

  onClickArea = (expandArea) => {
    this.setState((state) => ({
      areaName: state.areaName === expandArea ? "" : expandArea,
    }));
  };
}
