import React from "react";
import { shallow } from "enzyme";
import MovieDetails from "./MovieDetails";

describe("MovieDetails", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MovieDetails />);
    expect(wrapper).toMatchSnapshot();
  });
});
