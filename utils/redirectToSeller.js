import { Linking } from "react-native";

function redirectToSeller(isUser, telegramId, itemName, altSite) {
  //If the seller is not a user,
  //redirect them to the brand site
  if (!isUser) {
    Linking.openURL(altSite);
  }

  //If the seller is a user,
  //open up Telegram with the message informing the user
  //about buying the item
  const telegramUsername = telegramId; // Replace with the target user's Telegram username
  const message = `Hello! I'm interested in ${itemName} you posted on StyleSwipe :)`; // Replace with your message
  const telegramUrl = `https://t.me/${telegramUsername}?text=${encodeURIComponent(
    message
  )}`;

  //Check if the user has Telegram installed on their phone
  //If the user has Telegram, open it up with the pre-written message
  Linking.canOpenURL(telegramUrl)
    .then((supported) => {
      if (supported) {
        Linking.openURL(telegramUrl);
      } else {
        const appStoreUrl =
          Platform.OS === "ios"
            ? "https://apps.apple.com/app/telegram-messenger/id686449807"
            : "https://play.google.com/store/apps/details?id=org.telegram.messenger";
        Linking.openURL(appStoreUrl);
      }
    })
    .catch((err) => console.error("An error occurred", err));
}
