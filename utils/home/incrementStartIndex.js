import getStartIndex from "./getStartIndex";
import updateStartIndex from "@/utils/home/updateStartIndex";

export default async function incrementStartIndex(increVal) {
  const startIndex = await getStartIndex();
  await updateStartIndex(startIndex + increVal);
  return true;
}
