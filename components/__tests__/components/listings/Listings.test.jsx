import * as React from "react";
import { render, screen, waitFor, act } from "@testing-library/react-native";
import Listings from "@/components/tabs/Listings/Listings";
import { mockUtils } from "@/__mocks__/utils/supabaseMocks";
jest.useFakeTimers();

beforeEach(() => {
  const getSessionSpy = mockUtils();
});

it(`Listings page renders correctly`, async () => {
  const { getByTestId } = render(<Listings />);
  const listings = getByTestId("listings-container");
  expect(listings).toBeTruthy();
});

it(`Listings page renders all options correctly`, async () => {
  const { getByText } = render(<Listings />);
  await waitFor(() => {
    const viewListings = getByText("View my listings");
    const createListing = getByText("Create new listing");

    expect(viewListings).toBeTruthy();
    expect(createListing).toBeTruthy();
  });
});
