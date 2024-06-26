import * as getCollections from "@/utils/collections/getCollections";
import * as createCollection from "@/utils/collections/createCollection";
import * as expoRouter from "expo-router";
import * as getUserId from "@/utils/common/getUserId";

export function mockUtils() {
  //Hide error messages regarding asynchronus state updates
  jest.spyOn(global.console, "error").mockImplementationOnce((message) => {
    if (
      !message.includes(
        "When testing, code that causes React state updates should be wrapped into act(...):"
      )
    ) {
      global.console.error(message);
    }
  });

  /*
  Mock getCollections() function to avoid making a backend call
  and instead return a sample collections object
  */
  jest.spyOn(getCollections, "default").mockResolvedValueOnce({
    "Liked Items": [],
    "Test Collection 1": [],
    "Test Collection 2": [],
  });

  /*
  Mock getUserId() function to avoid making a backend call
  and instead return an id of a test account
  */
  jest.spyOn(getUserId, "default").mockImplementation(
    jest.fn(async () => {
      return "36ca95ab-f190-4b49-ac31-f27c4ac82425";
    })
  );

  /*
  Mock createCollection() function to avoid making a backend call
  and assume that backend calls end in a success for sake of testing
  */
  jest.spyOn(createCollection, "default").mockResolvedValueOnce(true);

  /*
  Mock useNavigation() hook calls to avoid errors during unit testing
  */
  jest.spyOn(expoRouter, "useNavigation").mockImplementation(() => ({
    reset: jest.fn(),
  }));
}
