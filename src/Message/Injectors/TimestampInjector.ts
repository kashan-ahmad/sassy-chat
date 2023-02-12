import { Message } from "~/types";
import { Timestamp } from "firebase/firestore";

/**
 * @author kashan-ahmad
 * @version 12-02-2023
 */
export default class TimestampInjector {
  /**
   * Injects a list of messages with a custom message variant, namely a
   * "timestamp". The timestamp represents the joining date of a user.
   *
   * @param timestamp The time when the user joined the channel
   * @param messages The list of messages to inject
   * @returns The injected list of messages
   */
  inject(timestamp: Timestamp, messages: Message[]) {
    /**
     * The index where the timestamp needs to be inserted.
     *
     * Mostly, this will be zero. We're still figuring out how will we
     * implement lazy loading of messages while keeping this intact.
     */
    const index = messages.findIndex(
      // The first message sent to the channel after the user joined it.
      // The passed timestamp represents the time when the user joined the
      // channel, thus comparing it to a message's creation time allows us to
      // find out the index where we can insert a custom timestamp.
      (message) => timestamp.seconds <= message.createdAt.seconds
    );

    // Perform the injection.
    messages.splice(index, 0, {
      id: "system",
      from: "system",
      variant: "timestamp",
      createdAt: timestamp,
      text: "You joined this channel",
    });

    return messages;
  }
}
