import * as ImagePicker from "expo-image-picker";

export default async function uploadImage(img) {
  if (!img) {
    alert("No image selected");
    return;
  }

  console.log(img);
  let uriParts = img.split(".");
  let fileType = uriParts[uriParts.length - 1];

  const formData = new FormData();
  formData.append("image", {
    uri: img,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  try {
    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: "Client-ID 095603990631171",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    const data = await response.json();
    alert("Upload successful");
    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    alert("Upload failed");
    return null;
  }
}
