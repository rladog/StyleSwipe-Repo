import Cart from "@/components/tabs/Cart/Cart";
import { render, screen, userEvent } from "@testing-library/react-native";
import { mockUtils } from "@/__mocks__/utils/supabaseMocks";

jest.useFakeTimers();

const deleteFn = jest.fn((item) =>
  console.log(`${item.ProductId} removed from cart`)
);

const purchaseFn = jest.fn((item) =>
  console.log(`${item.ProductId} purchased! from cart`)
);

let testItem1 = {
  ImageURL:
    "http://assets.myntassets.com/v1/images/style/properties/7c80fca789c5c1863a4080d7ed57acf0_images.jpg",
  Gender: "Gender 1",
  ProductId: 1,
  ProductType: "Category 1",
  ProductTitle: "Item name 1",
};

let testItem2 = {
  ImageURL:
    "http://assets.myntassets.com/v1/images/style/properties/7c80fca789c5c1863a4080d7ed57acf0_images.jpg",
  Gender: "Gender 2",
  ProductId: 2,
  ProductType: "Category 2",
  ProductTitle: "Item name 2",
};

it("Cart component renders correctly", () => {
  const { getByTestId } = render(
    <Cart
      cartData={[testItem1]}
      deleteFromCartFn={deleteFn}
      purchaseItemFn={purchaseFn}
    />
  );

  expect(getByTestId("cart-container")).toBeTruthy();
});

it("Cart component displays item correctly", () => {
  const { getByText } = render(
    <Cart
      cartData={[testItem1, testItem2]}
      deleteFromCartFn={deleteFn}
      purchaseItemFn={purchaseFn}
    />
  );

  expect(getByText("Item name 1")).toBeTruthy();
  expect(getByText("Item name 2")).toBeTruthy();
});

it("Cart component deletes item correctly", async () => {
  const { getByText } = render(
    <Cart
      cartData={[testItem1]}
      deleteFromCartFn={deleteFn}
      purchaseItemFn={purchaseFn}
    />
  );

  const user = userEvent.setup();
  await user.press(getByText("Remove"));

  expect(screen.queryByText("Item name 1")).toBeNull();
  expect(deleteFn).toHaveBeenCalledWith(testItem1);
});

it("Cart component purchases item correctly", async () => {
  const { getByText } = render(
    <Cart
      cartData={[testItem1]}
      deleteFromCartFn={deleteFn}
      purchaseItemFn={purchaseFn}
    />
  );

  const user = userEvent.setup();
  await user.press(getByText("Purchase"));

  expect(screen.queryByText("Item name 1")).toBeNull();
  expect(purchaseFn).toHaveBeenCalledWith(testItem1);
});
