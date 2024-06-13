import { supabase } from "@/utils/supabase";

//Takes in new password, a confirmation (repeat) of the new password,
//a function to call on failing to change password
//a function to call on successfully changing password
export default async function changePassword(
  newPassword,
  newPasswordConfirm,
  onFail,
  onSuccess
) {
  //If new password isn't given
  //or the confirmation of the new password is incorrect
  //call the fail function with an error message
  //and return false

  if (!newPassword) {
    onFail("Please enter a valid new password");
    return false;
  }

  if (newPasswordConfirm !== newPassword) {
    onFail("Please confirm the new password");
    return false;
  }

  //If new password is given and it matches the confirmation
  //call the Supabase API to update the password

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  //If there was an error with the API callback, call the fail function with the rror
  if (error) {
    onFail("Error changing password: " + error.message);
    return false;
  } else {
    //If not, call the success function with the success message
    onSuccess("Password changed successfully!");
    return true;
  }
}
