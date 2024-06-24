import { router } from "expo-router";
export default function redirect(url) {
  router.replace(url);
}
