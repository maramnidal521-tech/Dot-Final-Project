<<<<<<< HEAD
import Link from "next/link";
import Badge from "../ui/Badge";

export default function ConversationCard({ conversation }) {
  const otherUser = conversation.participants?.[0];

  return (
    <Link
      href={`/messages/${conversation._id}`}
      className="conversationCard"
    >
=======
"use client";

import Link from "next/link";
import Badge from "../ui/Badge";

const getCurrentUserId = () => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub || payload.id || payload._id || null;
  } catch {
    return null;
  }
};

export default function ConversationCard({ conversation }) {
  const me = getCurrentUserId();
  const otherUser = conversation.participants?.find((user) => user?._id !== me);

  return (
    <Link href={`/messages/${conversation._id}`} className="conversationCard">
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
      <div>
        <h3>{otherUser?.name || "مستخدم"}</h3>
        <p>{conversation.lastMessageText || "لا توجد رسائل بعد"}</p>
      </div>

<<<<<<< HEAD
      {conversation.relatedPost && (
        <Badge variant="primary">
          {conversation.relatedPost.title}
        </Badge>
      )}
    </Link>
  );
}
=======
      {conversation.relatedPost?.title && <Badge variant="primary">{conversation.relatedPost.title}</Badge>}
    </Link>
  );
}
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
