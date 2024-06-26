import * as React from "react";
import { render, screen, waitFor, act } from "@testing-library/react-native";
import Collections from "@/components/tabs/Collections/Collections";
import { mockUtils } from "@/__mocks__/utils/supabaseMocks";
jest.useFakeTimers();

beforeEach(() => {
  const getSessionSpy = mockUtils();
});

it(`Collections page renders correctly`, async () => {
  const { getByTestId } = render(
    <Collections collectionsProp={{ "Liked Items": [] }} />
  );
  await waitFor(() => {
    const collectionsContainer = getByTestId("collections-container");
    expect(collectionsContainer).toBeTruthy();
  });
});

it(`Collections page renders collection items`, async () => {
  const { getByText } = render(
    <Collections
      collectionsProp={{
        "Liked Items": [],
        "Test Collection 1": [],
        "Test Collection 2": [],
      }}
    />
  );
  await waitFor(() => {
    const likedItems = getByText("Liked Items");
    const testCollection1 = getByText("Test Collection 1");
    const testCollection2 = getByText("Test Collection 2");

    expect(likedItems).toBeTruthy();
    expect(testCollection1).toBeTruthy();
    expect(testCollection2).toBeTruthy();
  });
});
