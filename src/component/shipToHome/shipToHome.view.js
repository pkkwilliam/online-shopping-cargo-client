import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/functionalApplicationComponent.view";
import BackgroundCard from "../common/backgroundCard";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import {
  ChevronRight,
  Check,
  Circle,
  GeoAltFill,
  Truck,
} from "react-bootstrap-icons";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import ApplicationButton from "online-shopping-cargo-parent/dist/applicationButton";
import Badge from "react-bootstrap/esm/Badge";
import ParcelDisplayUtil from "online-shopping-cargo-parent/dist/parcelDisplayUtil";
import LineBreak from "online-shopping-cargo-parent/dist/lineBreak";
import Info from "../text/info";
import InfoBlack from "../text/infoBlack";
import ApplicationModalLoading from "online-shopping-cargo-parent/dist/applicationModalLoading";
import { GITHUB_CONTENT_URL } from "online-shopping-cargo-parent/dist/service";
import Image from "react-bootstrap/esm/Image";

export const PAYMENT_ALI_PAY = {
  description: "推薦支付寶中國內地實名用戶使用\n本服務由澳門通提供",
  enabled: true,
  iconUrl: `${GITHUB_CONTENT_URL}/mpay/alipay_logo.png`,
  key: "ALIPAY",
  header: "支付寶",
};

export const PAYMENT_M_PAY = {
  description: "推薦 MPay 用戶使用",
  enabled: true,
  iconUrl: `${GITHUB_CONTENT_URL}/mpay/mpay_logo.png`,
  key: "M_PAY",
  header: "M-Pay (澳門錢包)",
};

export const PAYMENT_CASH = {
  description: "只限現金",
  enabled: true,
  iconUrl: `${GITHUB_CONTENT_URL}/mpay/cash_logo.png`,
  key: "CASH",
  header: "送貨時支付",
};

export const PAYMENT_WECHAT_PAY = {
  description: "推薦微信中國內地實名用戶使用\n本服務由澳門通提供",
  enabled: false,
  iconUrl: `${GITHUB_CONTENT_URL}/mpay/wechat_logo.png`,
  key: "WECHAT_PAY",
  header: "微信支付",
};

export const PAYMENT_TYPES = [PAYMENT_M_PAY, PAYMENT_ALI_PAY, PAYMENT_CASH];

export default function ShipToHomeView(props) {
  const { isElectronicPaymentChannel, loading, onClickSubmit, orderValid } =
    props;
  return (
    <ApplicationComponentView {...props}>
      <ApplicationModalLoading {...props.modalLoading} />
      <View
        style={{
          flexDirection: "column",
          height: "inherit",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <AddressSection {...props} />
          <PaymentSection {...props} />
          <ParcelList {...props} />
        </View>
        <View style={{ bottom: 0, position: "sticky" }}>
          <BottomTab {...props}>
            <SubmitButton
              isElectronicPaymentChannel={isElectronicPaymentChannel}
              loading={loading}
              onClickSubmit={onClickSubmit}
              orderValid={orderValid}
            />
          </BottomTab>
        </View>
      </View>
    </ApplicationComponentView>
  );
}

export function AddressSection({
  onClickSelectAddressButton,
  selectable = true,
  selectedAddress,
}) {
  let Address;
  if (selectedAddress) {
    const { contactName, phoneNumber, street, unit } = selectedAddress;
    Address = (
      <View style={{ alignItems: "center" }}>
        <CircularBackgroundIcon>
          <GeoAltFill style={{ ...styles.iconFill, fontSize: 18 }} />
        </CircularBackgroundIcon>
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <P style={{ fontWeight: 600 }}>{`${contactName} ${phoneNumber}`}</P>
          <P>{`${street} ${unit}`}</P>
        </View>
      </View>
    );
  } else {
    Address = (
      <Chooseable onClick={onClickSelectAddressButton} text="請選擇收貨地址" />
    );
  }
  let ArrowRight = selectable ? (
    <View onClick={onClickSelectAddressButton}>
      <ChevronRight
        style={{ color: styleSchema.color.secondaryDark, fontSize: 18 }}
      />
    </View>
  ) : null;

  return (
    <BackgroundCard style={{ display: "flex", flexDirection: "column" }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {Address}
        {ArrowRight}
      </View>
    </BackgroundCard>
  );
}

function BottomTab({ children, shipToHomeCostEstimate }) {
  const { cost, discount, hasDiscount } = shipToHomeCostEstimate;
  const DiscountText = hasDiscount ? (
    <PriceText cost={`-${discount}`} label="合併折扣:" />
  ) : null;
  return (
    <BackgroundCard
      style={{
        alignItems: "center",
        borderRadius: 100,
        display: "flex",
        justifyContent: "space-between",
        marginTop: 15,
        padding: 10,
      }}
    >
      <View></View>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            alignItems: "flex-end",
            flexDirection: "column",
            height: "min-conent",
            marginRight: 8,
            justifyContent: "center",
          }}
        >
          {DiscountText}
          <View>
            <Info
              style={{
                alignSelf: "flex-end",
                marginRight: 5,
              }}
            >
              包含所有費用
            </Info>
            <PriceText cost={`${cost}`} label="合計:" />
          </View>
        </View>
        {children}
      </View>
    </BackgroundCard>
  );
}

function Chooseable({ onClick, text }) {
  return (
    <View
      onClick={onClick}
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <P style={styles.prompText}>{text}</P>
    </View>
  );
}

function CircularBackgroundIcon({ children }) {
  return (
    <View style={{ ...styles.iconFillBackground, padding: 8, marginRight: 8 }}>
      {children}
    </View>
  );
}

/**
 * we either use ParcelList or ParcelTable, it is different implementation with different look
 * @param {*} param0
 */
export function ParcelList({
  id,
  onClickParcel,
  parcels,
  shippingProviderOrderNumber,
  selectable = true,
}) {
  const parcelDisplayUtil = new ParcelDisplayUtil();

  const ParcelRows = parcels.map((parcel) => {
    const parcelStatusBageAndLabel =
      parcelDisplayUtil.getParcelStatusBageAndLabel(parcel.parcelStatus);
    return (
      <ParcelListRow
        onClickParcel={onClickParcel}
        parcel={parcel}
        parcelStatusBageAndLabel={parcelStatusBageAndLabel}
        selectable={selectable}
      />
    );
  });
  return (
    <BackgroundCard
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 15,
      }}
    >
      <View style={{ flexDirection: "column", width: "inherit" }}>
        {id && shippingProviderOrderNumber ? (
          <>
            <P>單號: {id}</P>
            <P>物流單號: {shippingProviderOrderNumber}</P>
          </>
        ) : null}

        {ParcelRows}
      </View>
    </BackgroundCard>
  );
}

function ParcelListRow({
  onClickParcel,
  parcel,
  parcelStatusBageAndLabel,
  selectable,
}) {
  const {
    createTime,
    cost,
    height,
    length,
    originalTrackingNumber,
    selected,
    volumeWeight,
    weight,
    width,
  } = parcel;
  let SelectCheckBox = (
    <View style={{ marginRight: 18 }}>
      {selected ? (
        <Check
          style={{
            ...styles.iconFill,
            backgroundColor: styleSchema.color.primaryDark,
            borderRadius: 30,
          }}
        />
      ) : (
        <Circle style={styles.icon} />
      )}
    </View>
  );
  if (!selectable) {
    SelectCheckBox = null;
  }
  return (
    <View
      onClick={() => onClickParcel(parcel)}
      style={{
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 8,
        marginTop: 8,
      }}
    >
      {SelectCheckBox}
      <View style={{ flexDirection: "column", width: "100%" }}>
        <View style={{ alignItems: "center" }}>
          <Info>{createTime}</Info>
        </View>
        <View style={{ alignItems: "center" }}>
          <Badge
            pill
            variant={parcelStatusBageAndLabel.badge}
            style={{ marginRight: 8 }}
          >
            {parcelStatusBageAndLabel.label}
          </Badge>
          <InfoBlack style={{ fontSize: 12 }}>
            {originalTrackingNumber}
          </InfoBlack>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <P>{`計費重量: ${
              weight > volumeWeight ? weight : volumeWeight
            } KG`}</P>
          </View>
          <View>
            <P
              style={{
                color: styleSchema.color.primaryDark,
                fontWeight: 300,
              }}
            >
              {`$${cost}`}
            </P>
          </View>
        </View>
      </View>
    </View>
  );
}

export function PaymentSection({
  onClickShowPaymentChannel,
  onClickSelectPaymentMethod,
  selectedPaymentChannel,
  showPaymentChannel,
}) {
  const Content = selectedPaymentChannel ? (
    <View style={{ alignItems: "center" }}>
      <PaymentDisplay type={selectedPaymentChannel} />
    </View>
  ) : (
    <Chooseable text="請選擇付款方式" />
  );
  return (
    <BackgroundCard
      style={{ display: "flex", flexDirection: "column", marginTop: 15 }}
    >
      <View
        onClick={onClickShowPaymentChannel}
        style={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {Content}
      </View>
      <PaymentSectionSelection
        onClickSelectPaymentMethod={onClickSelectPaymentMethod}
        showPaymentChannel={showPaymentChannel}
      />
    </BackgroundCard>
  );
}

function PaymentSectionSelection({
  onClickSelectPaymentMethod,
  showPaymentChannel,
}) {
  if (!showPaymentChannel) {
    return null;
  } else {
    const PaymentChannels = PAYMENT_TYPES.map((type) => {
      return (
        <div style={{ marginTop: 15 }}>
          <PaymentDisplay
            onClickSelectPaymentMethod={onClickSelectPaymentMethod}
            type={type}
          />
        </div>
      );
    });
    return (
      <>
        <LineBreak />
        {PaymentChannels}
      </>
    );
  }
}

export function PaymentDisplay({
  onClickSelectPaymentMethod = () => {},
  type,
}) {
  const { description, header, iconUrl } = type;
  return (
    <View onClick={() => onClickSelectPaymentMethod(type)}>
      <View>
        <Image
          src={iconUrl}
          style={{ borderRadius: 30, width: 50, height: 50 }}
        />
      </View>
      <View
        style={{
          marginLeft: 15,
          flexDirection: "column",
        }}
      >
        <P style={{ fontSize: 16, fontWeight: 400 }}>{header}</P>
        <Info>{description}</Info>
      </View>
    </View>
  );
}

export function PriceText({ cost, label }) {
  return (
    <View>
      <P>{label}</P>
      <P style={{ color: styleSchema.color.primaryDark, marginLeft: 3 }}>
        {`$${cost}`}
      </P>
    </View>
  );
}

export function SubmitButton({
  isElectronicPaymentChannel,
  loading,
  onClickSubmit,
  orderValid,
}) {
  return (
    <ApplicationButton
      disabled={!orderValid}
      loading={loading}
      onClick={onClickSubmit}
    >
      <Truck style={{ marginRight: 5 }} />
      送貨
    </ApplicationButton>
  );
}

export function getPaymentChannelObject(paymentChannel) {
  for (let index = 0; index < PAYMENT_TYPES.length; index++) {
    if (paymentChannel === PAYMENT_TYPES[index].key) {
      return PAYMENT_TYPES[index];
    }
  }
}

const styles = {
  icon: {
    color: styleSchema.color.secondaryDark,
  },
  iconFill: {
    color: styleSchema.color.white,
  },
  iconFillBackground: {
    background: styleSchema.color.primaryGradient,
    borderRadius: 30,
  },
  prompText: {
    color: styleSchema.color.secondaryDark,
    fontSize: 16,
  },
};
