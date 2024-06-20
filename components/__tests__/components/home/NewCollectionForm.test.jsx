import * as React from "react";
import {
  render,
  screen,
  waitFor,
  act,
  userEvent,
} from "@testing-library/react-native";
import NewCollectionForm from "@/components/tabs/Home/NewCollectionForm";
import { mockUtils } from "@/__mocks__/utils/supabaseMocks";
jest.useFakeTimers();

beforeEach(() => {
  const getSessionSpy = mockUtils();
});

it(`NewCollectionForm renders correctly`, async () => {
  const { getByTestId } = render(
    <NewCollectionForm
      visible={true}
      onClose={() => null}
      onSubmit={(item) => null}
    />
  );
  const newCollectionForm = getByTestId("new-collection-form");
  expect(newCollectionForm).toBeTruthy();
});

it(`Creates new collection correctly`, async () => {
  const createFn = jest.fn((collectionName) =>
    console.log(`${collectionName} being created`)
  );
  const { getByTestId } = render(
    <NewCollectionForm
      visible={true}
      onClose={() => null}
      onSubmit={createFn}
    />
  );
  const newCollectionInput = getByTestId("new-collection-form-name-input");

  const user = userEvent.setup();
  await user.type(newCollectionInput, "New Collection 1");

  const submitButton = getByTestId("new-collection-form-submit-button");
  await user.press(submitButton);

  expect(createFn).toHaveBeenCalled();
  expect(createFn).toHaveBeenCalledWith("New Collection 1");
});
