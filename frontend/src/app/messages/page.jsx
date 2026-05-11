"use client";

import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import ConversationCard from "../../components/chat/ConversationCard";
import { getMyConversations } from "../../services/chatService";

export default function MessagesPage() {
  const [conversations, setConversations] = useState([]);
<<<<<<< HEAD
  const [error, setError] = useState("");

  useEffect(() => {
    const loadConversations = async () => {
      try {
        const data = await getMyConversations();
        setConversations(data.conversations || []);
      } catch (err) {
        setError(err.message);
      }
    };

    loadConversations();
=======
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadConversations = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getMyConversations();
        if (!active) return;
        setConversations(data?.conversations || []);
      } catch (err) {
        if (!active) return;
        setError(err.message || "تعذر تحميل المحادثات");
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadConversations();

    return () => {
      active = false;
    };
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
  }, []);

  return (
    <MainLayout>
<<<<<<< HEAD
      <div className="messagesPage">
        <h1>الرسائل</h1>
        <p>جميع محادثاتك في مكان واحد</p>

        {error && <p style={{ color: "var(--danger)" }}>{error}</p>}

        <div className="conversationsList">
          {conversations.length === 0 ? (
            <p>لا توجد محادثات بعد</p>
          ) : (
            conversations.map((conversation) => (
              <ConversationCard
                key={conversation._id}
                conversation={conversation}
              />
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
}
=======
      <section className="pageHeader">
        <h1>الرسائل</h1>
        <p>قائمة المحادثات الحالية.</p>
      </section>

      {error && <div className="stateError">{error}</div>}

      <div className="conversationList">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="skeletonCard" />
          ))
        ) : conversations.length === 0 ? (
          <div className="stateEmpty">لا توجد محادثات بعد</div>
        ) : (
          conversations.map((conversation) => (
            <ConversationCard key={conversation._id} conversation={conversation} />
          ))
        )}
      </div>
    </MainLayout>
  );
}
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
