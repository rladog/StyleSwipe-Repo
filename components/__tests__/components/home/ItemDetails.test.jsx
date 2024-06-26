import * as React from "react";
import { render, screen } from "@testing-library/react-native";
import ItemDetailsPage from "@/components/tabs/Home/ItemDetailsPage";
import { mockUtils } from "@/__mocks__/utils/supabaseMocks";

jest.useFakeTimers();

beforeEach(() => {
  const getSessionSpy = mockUtils();
  // jest.spyOn(supabase.auth, "getSession").mockResolvedValueOnce({
  //   data: {
  //     session: {
  //       user: {
  //         id: "e0db7a14-ac7f-436f-b2cf-bbe81e7b8c95",
  //       },
  //     },
  //   },
  // });
});

it(`ItemDetails renders correctly`, async () => {
  const { getByTestId } = render(
    <ItemDetailsPage
      itemObj={{ ProductId: 13434, ProductTitle: "Product Title 1" }}
      closeFn={() => null}
    />
  );
  const itemDetailsPage = getByTestId("item-details-page-container");
  expect(itemDetailsPage).toBeTruthy();
});

it(`ItemDetails renders item information correctly `, () => {
  const { getByText } = render(
    <ItemDetailsPage
      itemObj={{ ProductId: 1, ProductTitle: "Product Title 1" }}
      closeFn={() => null}
    />
  );
  const product1 = getByText("Product Title 1");
  expect(product1).toBeTruthy();
});
