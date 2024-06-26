import { supabase } from "@/utils/common/supabase";

//Takes in new email,
//a function to call on failing to change email
//a function to call on successfully changing email
export default async function changeEmail(newEmail, onFail, onSuccess) {
  //If new email isn't given
  //call the fail function with an error message
  //and return false
  if (!newEmail) {
    onFail("Please enter a valid new email");
    return false;
  }

  //If new email is given,
  //call the Supabase API to update the email
  const { data, error } = await supabase.auth.updateUser({
    email: newEmail,
  });

  //If there was an error with the API callback, call the fail function with the rror
  if (error) {
    onFail("Error changing email: " + error.message);
    return false;
  } else {
    //If not, call the success function with the success message
    onSuccess("Email changed successfully!");
    return true;
  }
}
