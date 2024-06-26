import * as React from "react";
import {
  render,
  screen,
  waitFor,
  act,
  userEvent,
} from "@testing-library/react-native";
import EditableSingleCollection from "@/components/tabs/Collections/EditableSingleCollection";
import { mockUtils } from "@/__mocks__/utils/supabaseMocks";
jest.useFakeTimers();

beforeEach(() => {
  const getSessionSpy = mockUtils();
});

it(`EditableSingleCollection renders correctly`, async () => {
  const { getByTestId } = render(
    <EditableSingleCollection
      collectionName={"Collection 1"}
      collectionData={[{ ProductTitle: "Item 1" }, { ProductTitle: "Item 2" }]}
      deleteFn={(itemName, collectionName) => null}
    />
  );
  await waitFor(() => {
    const editableSingleCollectionContainer = getByTestId(
      "editable-single-collection-container"
    );
    expect(editableSingleCollectionContainer).toBeTruthy();
  });
});

it(`EditableSingleCollection functions correctly on delete`, async () => {
  // let collectionItemName = "Collection 1";

  const deleteFn = jest.fn((itemId, collectionName) =>
    console.log(`Deleting ${itemId} from ${collectionName} in the database`)
  );

  // const itemFn = jest.fn(() => {
  //   console.log(`Redirecting to ${collectionItemName} page`);
  //   return collectionItemName;
  // });

  const { getByText } = render(
    <EditableSingleCollection
      collectionName={"Collection 1"}
      collectionData={[
        { ProductTitle: "Item 1", ProductId: 1 },
        { ProductTitle: "Item 2", ProductId: 2 },
      ]}
      deleteFn={deleteFn}
    />
  );

  const user = userEvent.setup();

  const editButton = getByText("Edit");
  await user.press(editButton);

  const item1 = getByText("Item 1");
  await user.press(item1);

  const confirmButton = getByText("Confirm");
  await user.press(confirmButton);

  expect(deleteFn).toHaveBeenCalled();
  expect(deleteFn).toHaveBeenCalledWith(1, "Collection 1");
  await waitFor(() => expect(screen.queryByText("Item 1")).toBeNull());
});
