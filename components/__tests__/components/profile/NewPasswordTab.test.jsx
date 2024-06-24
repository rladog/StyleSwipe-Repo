import * as changePassword from "@/utils/profile/changePassword";
import NewPasswordTab from "@/components/tabs/Profile/NewPasswordTab";
import {
  screen,
  render,
  userEvent,
  waitFor,
} from "@testing-library/react-native";

const newPasswordMockFn = jest.fn(
  async (password, confirmPassword, onFail, onSuccess) => {
    onSuccess("Password changed successfully!");
    return true;
  }
);
jest.useFakeTimers();

jest.spyOn(changePassword, "default").mockImplementationOnce(newPasswordMockFn);

it("NewPasswordTab renders correctly", async () => {
  const { getByTestId } = render(<NewPasswordTab />);

  const newPasswordTab = getByTestId("new-password-tab-container");
  expect(newPasswordTab).toBeTruthy();
});

it("NewPasswordTab functions correctly on password change", async () => {
  const { getByTestId } = render(<NewPasswordTab />);

  const newPasswordInput = getByTestId("new-password-input");
  const newPasswordConfirmInput = getByTestId("new-password-confirm-input");
  const newPasswordSubmit = getByTestId("new-password-change-button");

  const user = userEvent.setup();
  await user.type(newPasswordInput, "abcdefg1234567");
  await user.type(newPasswordConfirmInput, "abcdefg1234567");
  await user.press(newPasswordSubmit);

  expect(newPasswordMockFn).toHaveBeenCalled();
  expect(newPasswordMockFn).toHaveBeenCalledWith(
    "abcdefg1234567",
    "abcdefg1234567",
    expect.anything(),
    expect.anything()
  );

  await waitFor(() => {
    expect(screen.queryByText("Password changed successfully!")).toBeTruthy();
  });
});
