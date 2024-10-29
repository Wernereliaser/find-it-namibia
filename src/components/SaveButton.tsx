import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as HeartOutLineIcon } from '../assets/svg/heart-outline.svg';
import { ReactComponent as HeartFilledIcon } from '../assets/svg/heart-filled.svg';
import useFavoritesProvider from '../shared/hooks/useFavoritesProvider';
import { useAppContext } from '../shared/context/Context';
import { observer } from 'mobx-react-lite';

interface IProps {
  docID: string;
  isFavorite: boolean
}

const SaveButton = observer(({ docID, isFavorite }: IProps) => {

  const { store } = useAppContext()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToFavorites, removeFromFavorites } = useFavoritesProvider();
  const navigate = useNavigate();

  const onClick = async () => {
    if (!store.auth.me) {
      navigate('/login');
      return;
    }
    setIsSubmitting(true);
    if (isFavorite) {
      await removeFromFavorites(docID);
    } else {
      await addToFavorites(docID);
    }
    setIsSubmitting(false);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className="btn btn-info"
      aria-label="Save this listing"
      disabled={isSubmitting}>
      {isFavorite ? (
        <HeartFilledIcon className="w-6 h-6 text-white" />
      ) : (
        <HeartOutLineIcon className="w-6 h-6 text-white" />
      )}
    </button>
  );
})

export default SaveButton;
