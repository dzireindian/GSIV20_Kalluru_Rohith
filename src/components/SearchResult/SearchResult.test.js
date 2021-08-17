import React from "react";
import { shallow } from "enzyme";
import SearchResult from "./SearchResult";

describe("SearchResult", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SearchResult />);
    expect(wrapper).toMatchSnapshot();
  });
});
