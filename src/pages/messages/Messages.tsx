import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where, orderBy, FieldValue } from 'firebase/firestore';
import MessageItemSkeleton from '../../skeletons/MessageItemSkeleton';
import MessageItem from '../../components/MessageItem';
import { db, auth } from '../../shared/db/config';

export interface IMessage {
  id: string
  sentBy: string,
  sentTo: string,
  listingRef: string,
  listingTitle: string,
  message: string,
  sentAt: FieldValue
}


function Messages() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const [snapshot, loading, error] = useCollection(
    query(collection(db, 'messages'), where('sentTo', '==', auth.currentUser?.uid), orderBy('sentAt', 'desc'))
  );

  useEffect(() => {
    document.title = 'Messages | Rent or Sell';
  }, []);

  useEffect(() => {
    if (snapshot) {
      const messagesData: IMessage[] = [];
      snapshot.forEach((doc) => {
        return messagesData.push({
          id: doc.id,
          ...doc.data()
        } as IMessage);
      });
      setMessages(messagesData);
    }
  }, [snapshot]);

  return (
    <main className="min-h-screen max-w-7xl px-3 mx-auto">
      <section className="lg:py-24 md:py-20 py-14">
        <div className="md:flex md:items-center md:justify-between">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">Messages</h1>
        </div>
        <div className="space-y-6">
          {loading && Array(2).fill(2).map(() => <MessageItemSkeleton key={Math.random()} />)}
          {error && <p>{error.message}</p>}
          {messages.length === 0 && !error ? <p>No messages to show.</p> : null}
          {messages.length > 0 && messages.map((item) => <MessageItem item={item} />)}
        </div>
      </section>
    </main>
  );
}

export default Messages;
