import * as React from "react";
import {
  render,
  screen,
  waitFor,
  act,
  userEvent,
} from "@testing-library/react-native";
import NewListingTab from "@/components/tabs/Profile/NewListingTab";
import { mockUtils } from "@/__mocks__/utils/supabaseMocks";
import * as pickImage from "@/utils/listings/pickImage";
import * as uploadImage from "@/utils/listings/uploadImage";
import * as createListing from "@/utils/listings/createListing";

jest.useFakeTimers();

beforeEach(() => {
  const getSessionSpy = mockUtils();
});

it(`NewListingTab renders correctly`, async () => {
  const { getByTestId } = render(<NewListingTab />);
  const newListingTab = getByTestId("new-listing-tab-container");
  expect(newListingTab).toBeTruthy();
});

const pickImageMock = jest.fn(async () => {
  return "sample-image.URI";
});

const uploadImageMock = jest.fn(async (itemImage) => {
  let data = {
    data: {
      link: "sample-image.link",
    },
  };
  return data;
});

const createListingMock = jest.fn(
  async (imageURL, itemName, itemGender, itemCategory) => {
    return true;
  }
);

jest.spyOn(pickImage, "default").mockImplementation(pickImageMock);

jest.spyOn(uploadImage, "default").mockImplementation(uploadImageMock);

jest.spyOn(createListing, "default").mockImplementation(createListingMock);

it(`NewListingTab functions correctly on creating new listing`, async () => {
  const { getByTestId } = render(<NewListingTab />);

  const user = userEvent.setup();
  let imageInput = getByTestId("new-listing-image-input");
  await user.press(imageInput);

  let nameInput = getByTestId("new-listing-name-input");
  await user.type(nameInput, "Item name 1");

  let genderInput = getByTestId("new-listing-gender-input");
  await user.type(genderInput, "Male");

  let categoryInput = getByTestId("new-listing-category-input");
  await user.type(categoryInput, "Category 1");

  const submitButton = getByTestId("new-listing-create-button");
  await user.press(submitButton);

  expect(pickImageMock).toHaveBeenCalled();
  expect(uploadImageMock).toHaveBeenCalledWith("sample-image.URI");
  expect(createListingMock).toHaveBeenCalledWith(
    "sample-image.link",
    "Item name 1",
    "Male",
    "Category 1"
  );
});
