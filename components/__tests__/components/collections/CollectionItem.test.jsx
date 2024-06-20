import * as React from "react";
import {
  render,
  screen,
  waitFor,
  act,
  userEvent,
} from "@testing-library/react-native";
import CollectionItem from "@/components/tabs/Collections/CollectionItem";
import { mockUtils } from "@/__mocks__/utils/supabaseMocks";
jest.useFakeTimers();

beforeEach(() => {
  const getSessionSpy = mockUtils();
});

it(`CollectionItem renders correctly`, async () => {
  const { getByTestId } = render(
    <CollectionItem name="Collection 1" onPressFn={() => null} />
  );
  await waitFor(() => {
    const collectionItem = getByTestId("collection-item");
    expect(collectionItem).toBeTruthy();
  });
});

it(`CollectionItem functions correctly on press`, async () => {
  let collectionItemName = "Collection 1";

  const itemFn = jest.fn(() => {
    console.log(`Redirecting to ${collectionItemName} page`);
    return collectionItemName;
  });

  const { getByTestId } = render(
    <CollectionItem name={collectionItemName} onPressFn={itemFn} />
  );

  const user = userEvent.setup();

  const collectionItem = getByTestId("collection-item");
  await user.press(collectionItem);

  expect(itemFn).toHaveBeenCalled();
  expect(itemFn).toHaveReturnedWith(collectionItemName);
});
