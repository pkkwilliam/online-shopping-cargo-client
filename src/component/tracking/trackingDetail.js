import React from "react";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Badge from "react-bootstrap/esm/Badge";
import ParcelDisplayUtil, {
  BAD_PARCEL,
  STORE_PICKUP,
} from "online-shopping-cargo-parent/dist/parcelDisplayUtil";
import CaretDownFill from "react-bootstrap-icons/dist/icons/caret-down-fill";
import CaretUpFill from "react-bootstrap-icons/dist/icons/caret-up-fill";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import ExclamationTriangleFill from "react-bootstrap-icons/dist/icons/exclamation-triangle-fill";
import View from "online-shopping-cargo-parent/dist/view";
import { MatchBadParcel } from "../matchBadParcel/matchBadParcel";
import { ShopList } from "../matchBadParcel/matchBadParcel.view";
import ApplicationButton from "online-shopping-cargo-parent/dist/applicationButton";
import { CONFIRM_BAD_PARCEL_SHOP_NUMBER } from "online-shopping-cargo-parent/dist/service";
import { getDisplayTime } from "../../util/dateUtil";

const ApplicationConfirmModal = React.lazy(() =>
  import("online-shopping-cargo-parent/dist/applicationConfirmModal")
);
const Collapse = React.lazy(() => import("react-bootstrap/Collapse"));
const LineBreak = React.lazy(() =>
  import("online-shopping-cargo-parent/dist/lineBreak")
);
export default class TrackingDetail extends MatchBadParcel {
  render() {
    const { onClickShowDetail, showDetaiDisplayId, parcel } = this.props;
    const { displayId, originalTrackingNumber } = parcel;
    const arrowColor = styleSchema.color.primaryMedium;
    const { confirmModal } = this.state;
    return (
      <>
        <ApplicationConfirmModal
          onClickConfirm={confirmModal.onClickConfirm}
          onClose={this.onCloseConfirmModal}
          {...confirmModal}
        />
        <tr
          className="text-center"
          onClick={() => onClickShowDetail(displayId)}
        >
          <td style={styles.defaultText}>
            <ParcelStatusBadge {...parcel} />
          </td>
          <td style={styles.defaultText}>{originalTrackingNumber}</td>
          <td>
            {showDetaiDisplayId === displayId ? (
              <CaretUpFill style={{ color: arrowColor }} />
            ) : (
              <CaretDownFill style={{ color: arrowColor }} />
            )}
          </td>
        </tr>
        <ExpandItem
          onClickConfirmBadParcelShop={this.onClickConfirmBadParcelShop}
          onSelectedShop={this.onSelectedShop}
          parcel={parcel}
          shops={this.appState.shop.shops}
          showDetaiDisplayId={showDetaiDisplayId}
          {...this.state}
        />
      </>
    );
  }

  onClickConfirmBadParcelShop = () => {
    const { id } = this.props.parcel;
    const { shopSelected } = this.state;
    const onClickConfirm = () => {
      this.serviceExecutor
        .execute(CONFIRM_BAD_PARCEL_SHOP_NUMBER(id, shopSelected.shopNumber))
        .then(() => {
          this.appStateService.getParcels(true);
        });
    };
    this.setState({
      confirmModal: {
        body: `是否把該包裹送往${shopSelected.shopNumber}${shopSelected.areaShopName}`,
        header: "確認店號",
        onClickConfirm: onClickConfirm,
        show: true,
      },
    });
  };
}

function BadParcelShopList({
  onClickConfirmBadParcelShop,
  onSelectedShop,
  parcelType,
  shops,
  shopSelected,
}) {
  if (parcelType !== BAD_PARCEL.key) {
    return null;
  }
  return (
    <View style={{ flexDirection: "column", marginBottom: 15 }}>
      <View style={{ alignItems: "center" }}>
        <ExclamationTriangleFill style={{ color: styleSchema.color.danger }} />
        <P style={{ marginLeft: 8 }}>此包裹原快递單上缺少收件店號</P>
      </View>
      <ShopList
        headerLabel={""}
        onSelectedShop={onSelectedShop}
        shops={shops}
        shopSelected={shopSelected}
      />
      <ApplicationButton onClick={onClickConfirmBadParcelShop}>
        確認店號
      </ApplicationButton>
    </View>
  );
}

function CostSection({ cost, dayStored, storageCost }) {
  return (
    <SectionContainer header="費用">
      <Row>
        <Col>
          <P>{`存放: ${dayStored}日`}</P>
        </Col>
        <Col>
          <P>{`倉儲費: ${storageCost ? storageCost : 0}`}</P>
        </Col>
        <Col>
          <P>{`運費: ${cost}`}</P>
        </Col>
      </Row>
    </SectionContainer>
  );
}

function ExpandItem({
  onClickConfirmBadParcelShop,
  onSelectedShop,
  parcel,
  shops,
  shopSelected,
  showDetaiDisplayId,
}) {
  const { displayId, parcelType } = parcel;
  return (
    <tr>
      <td colSpan={100} style={{ padding: 0 }}>
        <Collapse in={displayId === showDetaiDisplayId}>
          <Container style={styles.collpaseContainer}>
            <BadParcelShopList
              onClickConfirmBadParcelShop={onClickConfirmBadParcelShop}
              onSelectedShop={onSelectedShop}
              parcelType={parcelType}
              shops={shops}
              shopSelected={shopSelected}
            />
            <TimeSection {...parcel} />
            <ParcelDetailSection {...parcel} />
            <ShopDetailSection {...parcel} />
            <CostSection {...parcel} />
          </Container>
        </Collapse>
      </td>
    </tr>
  );
}

function ParcelDetailSection({
  height,
  length,
  originalTrackingNumber,
  weight,
  width,
}) {
  return (
    <SectionContainer header="包裹詳細">
      <Row>
        <Col>
          <P>{`原單號: ${originalTrackingNumber}`}</P>
        </Col>
      </Row>
      <Row>
        <Col>
          <P>{`長寛高總和: ${length + width + height}cm`}</P>
        </Col>
        <Col>
          <P>{`重量: ${weight}kg`}</P>
        </Col>
      </Row>
    </SectionContainer>
  );
}

function ParcelStatusBadge({ parcelStatus, parcelType }) {
  let variant, label;
  if (parcelType === STORE_PICKUP.key) {
    const parcelDisplayUtil = new ParcelDisplayUtil();
    // const location = parcelDisplayUtil.getParcelLocation(parcelLocation);
    const parcelStatusBadgeAndLabel =
      parcelDisplayUtil.getParcelStatusBageAndLabel(parcelStatus);
    variant = parcelStatusBadgeAndLabel.badge;
    label = parcelStatusBadgeAndLabel.label;
  } else {
    variant = "danger";
    label = "待處理";
  }

  return (
    <Badge pill variant={variant}>
      {label}
    </Badge>
  );
}

function SectionContainer({ header, children }) {
  return (
    <div style={{ marginTop: 5 }}>
      <P style={{ fontWeight: "bold" }}>{header}</P>
      <LineBreak />
      {children}
    </div>
  );
}

function ShopDetailSection({ shop }) {
  const {
    openingHour,
    shopAddress,
    areaShopName,
    shopNumber,
    shopPhoneNumber,
  } = shop;
  return (
    <SectionContainer header="門店資科">
      <Row>
        <Col>
          <P>{`店名: ${areaShopName} ${shopNumber}`}</P>
        </Col>
      </Row>
      <Row>
        <Col>
          <P>{`地址: ${shopAddress}`}</P>
        </Col>
      </Row>
      <Row>
        <Col>
          <P>{`電話: ${shopPhoneNumber}`}</P>
        </Col>
      </Row>
      <Row>
        <Col>
          <P>{`營業時間: ${openingHour}`}</P>
        </Col>
      </Row>
    </SectionContainer>
  );
}

function TimeSection({ createTime, readyToPickupDate, updateTime }) {
  const ReadyToPickUp = readyToPickupDate ? (
    <Row>
      <Col>
        <P>{`到達門店: ${
          readyToPickupDate ? getDisplayTime(readyToPickupDate) : "未到達"
        }`}</P>
      </Col>
    </Row>
  ) : null;
  return (
    <SectionContainer header="時間詳細">
      <Row>
        <Col>
          <P>{`入庫時間: ${getDisplayTime(createTime)}`}</P>
        </Col>
      </Row>
      {ReadyToPickUp}
    </SectionContainer>
  );
}

const styles = {
  collpaseContainer: {
    padding: 5,
  },
};
