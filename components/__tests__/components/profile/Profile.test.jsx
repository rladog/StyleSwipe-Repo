import * as React from "react";
import { render, screen, waitFor, act } from "@testing-library/react-native";
import Profile from "@/components/tabs/Profile/Profile";
import { mockUtils } from "@/__mocks__/utils/supabaseMocks";
jest.useFakeTimers();

beforeEach(() => {
  const getSessionSpy = mockUtils();
});

it(`Profile renders correctly`, async () => {
  const { getByTestId } = render(<Profile />);
  const profile = getByTestId("profile-container");
  expect(profile).toBeTruthy();
});

it(`Profile renders all options correctly`, async () => {
  const { getByText } = render(<Profile />);
  await waitFor(() => {
    const changeEmail = getByText("Change email address");
    const changePassword = getByText("Change password");
    const wipeAlgorithm = getByText("Wipe algorithm");
    const signOut = getByText("Sign out");

    expect(changeEmail).toBeTruthy();
    expect(changePassword).toBeTruthy();
    expect(wipeAlgorithm).toBeTruthy();
    expect(signOut).toBeTruthy();
  });
});
