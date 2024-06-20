import * as changeEmail from "@/utils/changeEmail";
import NewEmailTab from "@/components/tabs/Profile/NewEmailTab";
import {
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";

const newEmailMockFn = jest.fn(async (newEmail, onFail, onSuccess) => {
  onSuccess("Email changed successfully!");
  return true;
});
jest.useFakeTimers();

jest.spyOn(changeEmail, "default").mockImplementationOnce(newEmailMockFn);

it("NewEmailTab renders correctly", async () => {
  const { getByTestId } = render(<NewEmailTab />);

  const newEmailTab = getByTestId("new-email-tab-container");
  expect(newEmailTab).toBeTruthy();
});

it("NewEmailTab functions correctly on email change", async () => {
  const { getByTestId } = render(<NewEmailTab />);
  const newEmailInput = getByTestId("new-email-input");
  const newEmailSubmit = getByTestId("new-email-change-button");

  const user = userEvent.setup();
  await user.type(newEmailInput, "test@email.com");
  await user.press(newEmailSubmit);

  expect(newEmailMockFn).toHaveBeenCalled();
  expect(newEmailMockFn).toHaveBeenCalledWith(
    "test@email.com",
    expect.anything(),
    expect.anything()
  );

  await waitFor(() => {
    expect(screen.queryByText("Email changed successfully!")).toBeTruthy();
  });
});
