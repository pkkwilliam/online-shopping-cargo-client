import React from "react";
import ApplicationComponent from "online-shopping-cargo-parent/dist/applicationComponent";
import { GET_PARCELS } from "online-shopping-cargo-parent/dist/service";
import Table from "react-bootstrap/esm/Table";

const TrackingDetail = React.lazy(() => import("./trackingDetail"));

export default class Tracking extends ApplicationComponent {
  state = {
    parcelResponses: {
      parcels: [],
    },
  };

  componentDidMount() {
    this.onTrack();
  }

  render() {
    return (
      <div style={styles.rootContainer}>
        <this.Table />
      </div>
    );
  }

  Table = () => {
    const parcelDetail = this.state.parcelResponses.parcels.map((parcel) => (
      <TrackingDetail {...parcel} />
    ));

    return (
      <>
        <Table>
          <thead>
            <tr>
              <th style={styles.defaultText}>狀態</th>
              <th style={styles.defaultText}>件號</th>
              <th style={styles.defaultText}>所在</th>
              <th style={styles.defaultText}></th>
            </tr>
          </thead>
          <tbody>{parcelDetail}</tbody>
        </Table>
      </>
    );
  };

  onTrack() {
    this.serviceExecutor.execute(GET_PARCELS()).then((parcelResponses) =>
      this.setState({
        display: "MY_PACKAGE",
        parcelResponses,
      })
    );
  }
}

const styles = {
  rootContainer: {},
};
