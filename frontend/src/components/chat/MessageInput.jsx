"use client";

import { useState } from "react";
import Button from "../ui/Button";

export default function MessageInput({ onSend }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

<<<<<<< HEAD
    if (!content.trim()) return;

    onSend(content);
=======
    const cleaned = content.trim();
    if (!cleaned) return;

    onSend(cleaned);
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
    setContent("");
  };

  return (
    <form className="messageInput" onSubmit={handleSubmit}>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
<<<<<<< HEAD
        placeholder="اكتب رسالتك..."
      />

      <Button type="submit">إرسال</Button>
    </form>
  );
}
=======
        placeholder="اكتب رسالتك"
      />

      <Button type="submit" disabled={!content.trim()}>
        إرسال
      </Button>
    </form>
  );
}
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
