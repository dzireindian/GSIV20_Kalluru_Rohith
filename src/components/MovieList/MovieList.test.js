import React from "react";
import { shallow } from "enzyme";
import MovieList from "./MovieList";

describe("MovieList", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MovieList />);
    expect(wrapper).toMatchSnapshot();
  });
});
