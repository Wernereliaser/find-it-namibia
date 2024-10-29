import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import { serverTimestamp } from 'firebase/firestore';
import TextAreaInput from './TextAreaInput';
import { ChangeEvent, Fragment, useState } from 'react';
import { auth } from '../shared/db/config';
import { useAppContext } from '../shared/context/Context';
import { IMessage } from '../pages/messages/Messages';

interface IProps {
  showModal: boolean;
  hideModal: () => void
  docID: string;
  userRef: string;
  listingTitle: string
}

function ContactOwnerModal({ showModal, hideModal, docID, userRef, listingTitle }: IProps) {

  const { api } = useAppContext()
  const [message, setMessage] = useState("");

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (auth.currentUser) {
      try {
        const data: IMessage = {
          sentBy: auth.currentUser.uid,
          sentTo: userRef,
          listingRef: docID,
          listingTitle: listingTitle,
          message: message,
          sentAt: serverTimestamp(),
          id: ''
        };
        await api.property.createMessage(data)
        toast.success('Message sent successfully');
        hideModal();
      } catch (error) {
        toast.error("error");
        hideModal();
      }
    }
  };

  if (!showModal) {
    return null;
  }

  return createPortal(
    <Fragment>
      <div className="fixed inset-0 z-[999] bg-black opacity-30"></div>
      <div className="card fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md z-[9999] bg-white w-full max-w-2xl">
        <div className="card-body">
          <h2 className="text-gray-900 font-extrabold text-3xl mb-4 text-center">Contact owner</h2>
          <form onSubmit={onSubmit}>
            <TextAreaInput
              label="Your message"
              id="message"
              name="message"
              type={''}
              value={message} onChange={(e) => {
                setMessage(e.target.value)
              }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <button type="button" className="btn btn-ghost" onClick={hideModal}>
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-block">
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>,
    document.getElementById('portal') as HTMLElement
  );
}

export default ContactOwnerModal;
