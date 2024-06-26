import * as React from "react";
import { render, screen, waitFor, act } from "@testing-library/react-native";
// import CollectionMenu from "@/components/tabs/_common/CollectionMenu";
import Home from "@/components/tabs/Home/Home";
import { mockUtils } from "@/__mocks__/utils/supabaseMocks";
jest.useFakeTimers();

beforeEach(() => {
  const getSessionSpy = mockUtils();
});

it(`Home renders correctly`, async () => {
  const { getByTestId } = render(
    <Home
      cardProp={[{ ProductTitle: "Product Title 1" }]}
      swipeRightFn={() => null}
      swipeLeftFn={() => null}
      swipeUpFn={() => null}
    />
  );
  const home = getByTestId("home-container");
  expect(home).toBeTruthy();
});

it(`Home renders card correctly`, async () => {
  const { getByText } = render(
    <Home
      cardProp={[{ ProductTitle: "Product Title 1" }]}
      swipeRightFn={() => null}
      swipeLeftFn={() => null}
      swipeUpFn={() => null}
    />
  );
  await waitFor(() => {
    const product1 = getByText("Product Title 1");
    expect(product1).toBeTruthy();
  });
});
// it(`CollectionMenu renders correct collection items`, async () => {
//   const { getByText } = render(
//     <CollectionMenu
//       itemId={42419}
//       visible={true}
//       onClose={() => null}
//       addToCollectionFn={() => null}
//     />
//   );

//   await waitFor(() => {
//     const testCollection1 = getByText("Test Collection 1");
//     const testCollection2 = getByText("Test Collection 2");
//     expect(testCollection1).toBeTruthy();
//     expect(testCollection2).toBeTruthy();
//   });
// });
