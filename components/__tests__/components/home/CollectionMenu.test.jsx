import * as React from "react";
import { render, screen, waitFor, act } from "@testing-library/react-native";
import CollectionMenu from "@/components/tabs/Home/CollectionMenu";
import { mockUtils } from "@/__mocks__/utils/supabaseMocks";
jest.useFakeTimers();

beforeEach(() => {
  const getSessionSpy = mockUtils();
});

it(`CollectionMenu renders correctly`, async () => {
  const { getByTestId } = render(
    <CollectionMenu
      itemId={42419}
      visible={true}
      onClose={() => null}
      addToCollectionFn={() => null}
    />
  );
  const menuContainer = getByTestId("collection-menu-container");
  expect(menuContainer).toBeTruthy();
});

it(`CollectionMenu renders correct collection items`, async () => {
  const { getByText } = render(
    <CollectionMenu
      itemId={42419}
      visible={true}
      onClose={() => null}
      addToCollectionFn={() => null}
    />
  );

  await waitFor(() => {
    const testCollection1 = getByText("Test Collection 1");
    const testCollection2 = getByText("Test Collection 2");
    expect(testCollection1).toBeTruthy();
    expect(testCollection2).toBeTruthy();
  });
});
