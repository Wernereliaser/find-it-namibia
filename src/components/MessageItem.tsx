import { useState } from 'react'
import { IMessage } from '../pages/messages/Messages';
import { Timestamp } from 'firebase/firestore';

interface IProps {
  item: IMessage
}

function MessageItem({ item }: IProps) {

  const { sentAt, listingTitle, message } = item;
  const [isExpanded, setIsExpanded] = useState(false);

  const msgBtnLabel = isExpanded ? 'Close' : 'View message';

  return (
    <div className="card card-bordered border-gray-200 shadow">
      <div className="card-body p-6">
        <div className="sm:grid sm:grid-cols-[1fr_200px] sm:gap-4 sm:items-center">
          <div>
            <span className="block text-sm text-gray-500 mb-2">
              {sentAt instanceof Timestamp &&
                sentAt.toDate().toLocaleString()
              }
            </span>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">{listingTitle}</h2>
          </div>
          {isExpanded && <p className="pt-4">{message}</p>}
          <button
            type="button"
            className="btn btn-primary w-full max-w-[200px]"
            onClick={() => setIsExpanded(!isExpanded)}>
            {msgBtnLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageItem;
