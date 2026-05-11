<<<<<<< HEAD
=======
const formatTime = (value) => {
  if (!value) return "";
  return new Date(value).toLocaleTimeString("ar-JO", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
export default function ChatBubble({ message, isMine }) {
  const senderName = message.sender?.name || "مستخدم";

  return (
    <div className={`chatBubbleRow ${isMine ? "mine" : "theirs"}`}>
      <div className={`chatBubble ${isMine ? "mineBubble" : "theirBubble"}`}>
        {!isMine && <span className="senderName">{senderName}</span>}
        <p>{message.content}</p>
<<<<<<< HEAD
      </div>
    </div>
  );
}
=======
        <small className="messageTime">{formatTime(message.createdAt)}</small>
      </div>
    </div>
  );
}
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
