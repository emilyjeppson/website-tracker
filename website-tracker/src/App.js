import React from "react";

const numberToReturn = 100;

class App extends React.PureComponent {
  // Handle a request for an IP address by
  // counting the number of times this method is
  // called for each unique address
  //
  // No validation on ip address for simplicity - we'll
  // just match on any string passed in
  requestHandled = (ipAddress) => {
    // Since we don't need any additional metadata about each request,
    // only record a count for each ip address
    const ipCount = (this.ipData[ipAddress] || 0) + 1;
    this.ipData[ipAddress] = ipCount;

    this.optionallyAddToTop100(ipAddress, ipCount);
  };

  clear = () => {
    this.ipData = {};
    this.topIpAddresses = [];
  };

  top100 = () => {
    return this.topIpAddresses;
  };

  // add the given ip & count to the cached top 100 ip
  // addresses if it is within the top 100 counts
  optionallyAddToTop100 = (ipAddress, ipCount) => {
    const topIpLength = this.topIpAddresses.length;
    // the last element is always the lowest count
    const smallestIpCount =
      topIpLength && this.topIpAddresses[topIpLength - 1].count;

    if (topIpLength < numberToReturn || ipCount > smallestIpCount) {
      // this ip is in the top 100, figure out where to add it so that it's sorted
      const itemToAdd = { ipAddress, count: ipCount };

      // remove it if it already exists (for sorting purposes)
      const existingIndex = this.topIpAddresses.findIndex(
        (item) => item.ipAddress === itemToAdd.ipAddress
      );
      if (existingIndex > -1) {
        this.topIpAddresses.splice(existingIndex, 1);
      }

      // add it to the appropriate place
      for (let i = 0; i < this.topIpAddresses.length; i++) {
        if (ipCount >= this.topIpAddresses[i].count) {
          this.topIpAddresses.splice(i, 0, itemToAdd);
          break;
        }
      }
      if (this.topIpAddresses.length === 0) {
        this.topIpAddresses.push(itemToAdd);
      }
      // if the list is full, remove the last item (because it should be the lowest count)
      if (this.topIpAddresses.length > numberToReturn) {
        this.topIpAddresses.splice(topIpLength, 1);
      }
    }
  };

  constructor(props) {
    super(props);
    this.clear();
  }

  // For testing - generate some random IP address data
  // Since we want some of these to be duplicates, they
  // will have the format 000.000
  generateRandomData = () => {
    for (let i = 0; i < 1000000; i++) {
      const randomIp = `${Math.floor(Math.random() * 1000)}.${Math.floor(
        Math.random() * 1000
      )}`;
      this.requestHandled(randomIp);
    }
    this.setState({ updated: new Date() });
  };

  // For testing - call the clear method & re-render
  clearData = () => {
    this.clear();
    this.setState({ updated: new Date() });
  };

  render() {
    return (
      <div>
        <input
          type="button"
          onClick={this.generateRandomData}
          value="Generate Random Data"
        />
        <br />
        <br />
        <input type="button" onClick={this.clearData} value="Clear Data" />
        <h3>Top 100 IP Addresses</h3>
        {this.top100().map((ipAddress) => (
          <div>
            {ipAddress.ipAddress}: {ipAddress.count}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
