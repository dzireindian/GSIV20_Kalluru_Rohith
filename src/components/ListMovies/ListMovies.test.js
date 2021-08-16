import React from "react";
import { shallow } from "enzyme";
import ListMovies from "./ListMovies";

describe("ListMovies", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ListMovies />);
    expect(wrapper).toMatchSnapshot();
  });
});
