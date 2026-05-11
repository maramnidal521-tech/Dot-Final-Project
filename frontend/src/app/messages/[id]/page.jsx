"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
<<<<<<< HEAD

=======
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
import MainLayout from "../../../components/layout/MainLayout";
import ChatHeader from "../../../components/chat/ChatHeader";
import ChatBubble from "../../../components/chat/ChatBubble";
import MessageInput from "../../../components/chat/MessageInput";
<<<<<<< HEAD

import { getMessages } from "../../../services/chatService";
import {
  connectSocket,
  getSocket,
  disconnectSocket,
} from "../../../services/socketService";

const getUserIdFromToken = () => {
  const token = localStorage.getItem("accessToken");

=======
import { getMessages } from "../../../services/chatService";
import { connectSocket, getSocket, disconnectSocket } from "../../../services/socketService";

const getUserIdFromToken = () => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("accessToken");
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
<<<<<<< HEAD
    return payload.sub || payload.id || payload._id;
=======
    return payload.sub || payload.id || payload._id || null;
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
  } catch {
    return null;
  }
};

export default function ChatRoomPage() {
  const params = useParams();
<<<<<<< HEAD
  const id = params.id;

  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [error, setError] = useState("");
=======
  const conversationId = params.id;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUserId] = useState(getUserIdFromToken);
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba

  const messagesEndRef = useRef(null);

  useEffect(() => {
<<<<<<< HEAD
    setCurrentUserId(getUserIdFromToken());
  }, []);

  const loadMessages = async () => {
    try {
      if (!id) return;

      const data = await getMessages(id);
      setMessages(data.messages || []);
    } catch (err) {
      setError(err.message || "تعذر تحميل الرسائل");
    }
  };

  useEffect(() => {
    loadMessages();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const socket = connectSocket();

    socket.emit("joinConversation", id);
=======
    if (!conversationId) return;

    let active = true;

    const loadMessages = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getMessages(conversationId);
        if (!active) return;
        setMessages(data?.messages || []);
      } catch (err) {
        if (!active) return;
        setError(err.message || "تعذر تحميل الرسائل");
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadMessages();

    return () => {
      active = false;
    };
  }, [conversationId]);

  useEffect(() => {
    if (!conversationId) return;

    const socket = connectSocket();
    socket.emit("joinConversation", conversationId);
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba

    socket.on("newMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("newMessage");
      disconnectSocket();
    };
<<<<<<< HEAD
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = (content) => {
    try {
      const socket = getSocket();

      if (!socket) {
        setError("الاتصال غير جاهز");
        return;
      }

      socket.emit("sendMessage", {
        conversationId: id,
        content,
      });
    } catch (err) {
      setError(err.message || "تعذر إرسال الرسالة");
    }
=======
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (content) => {
    const socket = getSocket();

    if (!socket) {
      setError("الاتصال غير جاهز");
      return;
    }

    socket.emit("sendMessage", {
      conversationId,
      content,
    });
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
  };

  return (
    <MainLayout>
      <ChatHeader title="المحادثة" />

<<<<<<< HEAD
      {error && <p style={{ color: "var(--danger)" }}>{error}</p>}

      <div className="chatMessages">
        {messages.length === 0 ? (
          <p>لا توجد رسائل بعد</p>
        ) : (
          messages.map((message) => (
            <ChatBubble
              key={message._id}
=======
      {error && <div className="stateError">{error}</div>}

      <div className="chatMessages">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => <div key={index} className="skeletonLine" />)
        ) : messages.length === 0 ? (
          <div className="stateEmpty">لا توجد رسائل بعد</div>
        ) : (
          messages.map((message) => (
            <ChatBubble
              key={message._id || `${message.sender?._id}-${message.createdAt}`}
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
              message={message}
              isMine={message.sender?._id === currentUserId}
            />
          ))
        )}
<<<<<<< HEAD

=======
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSend={handleSend} />
    </MainLayout>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
