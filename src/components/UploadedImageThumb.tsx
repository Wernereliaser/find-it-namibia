import { toast } from 'react-toastify';
import { ReactComponent as DeleteIcon } from '../assets/svg/delete.svg';

interface IProps {
  previewImages: string[];
  setPreviewImages: React.Dispatch<React.SetStateAction<string[]>>;
  isUploading: boolean;
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
  deleteImage: (index: number) => Promise<void>
}

const UploadedImageThumb = (props: IProps) => {
  const { isUploading, setSelectedImages, previewImages, setPreviewImages, deleteImage } = props;

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files;
    if (!files) {
      toast.error(`Failed!`, { autoClose: 500 });
      return;
    }

    const selectedFiles: File[] = Array.from(files);
    setSelectedImages(selectedFiles);

    const readerPromises: Promise<string>[] = selectedFiles.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const imageSrc = reader.result?.toString() || "";
          resolve(imageSrc);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readerPromises).then((results) => {
      setPreviewImages(results);
    });

    e.target.value = "";
  };

  return (
    <div>
      <div className="thumbnails">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
          {previewImages.map((src, index) => (
            <div key={index}>
              <button onClick={() => deleteImage(1)} type="button" aria-label="Delete image" className="delete-btn">
                <DeleteIcon className="h-3 w-3" />
              </button>
              <img className="w-full h-full border border-gray-200 rounded object-cover" src={src} alt=''/>
            </div>
          ))}
        </div>
      </div>
      <label className="thumbnail">
        <label htmlFor="images" className="thumbnail-label">
          {isUploading ? "Uploading..." : ""}
        </label><br/>
        <input
          className='input input-bordered'
          type="file"
          accept="image/*"
          onChange={onFileChange}
          multiple />
      </label>
    </div>
  );
};

export default UploadedImageThumb;