import strings from "./strings";
import { BoolBacks, Channel, Message } from "./types";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

/// Type Guards.
export function isChannel(object: any): object is Channel {
  return object && object.label && object.variant && object.users;
}

export function isMessage(object: any): object is Message {
  return (
    object && object.text && object.variant && object.from && object.createdAt
  );
}

/// Parsers.
export function parseDocsInto<T>(
  docs: QuerySnapshot<DocumentData>,
  typeGuard: (_: any) => boolean,
  onSuccess: (_: T) => unknown,
  onFailure: Function
) {
  const parsedDocs: unknown[] = [];

  // Extract the documents' data
  docs.forEach((doc) => parsedDocs.push({ ...doc.data(), id: doc.id }));

  // No results found
  if (parsedDocs.length === 0) {
    onSuccess(parsedDocs as T);
    return;
  }

  // Type guard
  if (typeGuard(parsedDocs[0])) {
    onSuccess(parsedDocs as T);
    return;
  }

  // Type error
  console.error("TypeScriptError: doc isn't of the associated type");
  onFailure(strings.DEFAULT_ERROR);
}

/**
 * Parses documents into messages.
 */
export function parseMessagesFromDocs({
  docs,
  onSuccess,
  onFailure,
}: {
  docs: QuerySnapshot<DocumentData>;
  onSuccess: BoolBacks<Message[]>["onSuccess"];
  onFailure: BoolBacks<Message[]>["onFailure"];
}) {
  parseDocsInto<Message[]>(docs, isMessage, onSuccess, onFailure);
}

/**
 * Parses documents into messages.
 */
export function parseChannelsFromDocs({
  docs,
  onSuccess,
  onFailure,
}: {
  docs: QuerySnapshot<DocumentData>;
  onSuccess: BoolBacks<Channel[]>["onSuccess"];
  onFailure: BoolBacks<Channel[]>["onFailure"];
}) {
  parseDocsInto<Channel[]>(docs, isChannel, onSuccess, onFailure);
}
