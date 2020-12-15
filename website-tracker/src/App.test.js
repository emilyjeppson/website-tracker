import { shallow } from "enzyme";

import App from "./App";

describe("IP Address tracker", () => {
  const setup = () => {
    return shallow(<App />).instance();
  };

  it("doesnt fail without data", () => {
    const app = setup();
    expect(app.top100()).toEqual([]);
  });

  it("tracks 1 address correctly", () => {
    const app = setup();
    const ipAddress = "1.1.1.1";
    app.requestHandled(ipAddress);
    expect(app.top100()).toEqual([{ ipAddress: ipAddress, count: 1 }]);
  });

  it("tracks 1 address 3 times correctly", () => {
    const app = setup();
    const ipAddress = "1.1.1.1";
    app.requestHandled(ipAddress);
    app.requestHandled(ipAddress);
    app.requestHandled(ipAddress);
    expect(app.top100()).toEqual([{ ipAddress: ipAddress, count: 3 }]);
  });

  it("tracks multiple addresses correctly, sorting by largest first", () => {
    const app = setup();
    const ip1 = "1.1.1.1";
    const ip2 = "2.2.2.2";
    const ip3 = "3.3.3.3";
    app.requestHandled(ip1);
    app.requestHandled(ip2);
    app.requestHandled(ip3);
    app.requestHandled(ip3);
    app.requestHandled(ip2);
    app.requestHandled(ip3);
    expect(app.top100()).toEqual([
      { ipAddress: ip3, count: 3 },
      { ipAddress: ip2, count: 2 },
      { ipAddress: ip1, count: 1 },
    ]);
  });

  it("returns a maximum of 100 ip addresses", () => {
    const app = setup();
    for (let i = 0; i < 201; i++) {
      app.requestHandled(`${i}.${i}.${i}.${i}`);
    }
    expect(app.top100()).toHaveLength(100);
  });

  it("handles adding a million ip addresses in a timely manner", () => {
    const app = setup();
    const start = performance.now();
    for (let i = 0; i < 500000; i++) {
      app.requestHandled(`${i}.${i}.${i}.${i}`);
      app.requestHandled(`${i}.${i}.${i}.${i}`);
    }
    const end = performance.now();
    expect(end - start).toBeLessThan(1200);
  });

  it("clears the data correctly", () => {
    const app = setup();
    const ipAddress = "1.1.1.1";
    app.requestHandled(ipAddress);
    app.requestHandled(ipAddress);
    app.requestHandled(ipAddress);
    expect(app.top100()).toEqual([{ ipAddress: ipAddress, count: 3 }]);
    app.clear();
    expect(app.top100()).toEqual([]);
  });
});
