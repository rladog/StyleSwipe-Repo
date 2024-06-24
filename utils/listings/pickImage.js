import * as ImagePicker from "expo-image-picker";

export default async function pickImage() {
  // Ask for permission
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (permissionResult.granted === false) {
    alert("You've refused to allow this app to access your photos!");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    // aspect: [9, 16],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }
}
