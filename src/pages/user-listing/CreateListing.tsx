import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultProperty, IProperty } from '../../shared/model/Property';
import TextInput from '../../components/TextInput';
import RadioInput from '../../components/RadioInput';
import TextAreaInput from '../../components/TextAreaInput';
import FormHeading from '../../components/FormHeading';
import UploadedImageThumb from '../../components/UploadedImageThumb';
import useUploadToStorage from '../../shared/hooks/useUploadToStorage';
import { useAppContext } from '../../shared/context/Context';
import { toast } from 'react-toastify';

function CreateListing() {

  const { store, api } = useAppContext()
  const [item, setItem] = useState<IProperty>({ ...defaultProperty });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = store.auth.meJson

  const { isUploading, uploadFile } = useUploadToStorage();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selecteImages, setSelectedImages] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      try {
        setLoading(true);
        const selected = store.property.selected;
        const imageUrls: string[] = [];
        for (const image of selecteImages) {
          const downloadURL = selecteImages ? await uploadFile(image, "/rental") : "";
          imageUrls.push(downloadURL);
        }

        item.images = [...item.images, ...imageUrls];
        item.uid = user.uid;

        if (selected) await update(item);
        else await create(item);
        setLoading(false);
        onCancel();
        toast.success(`Success!`, { autoClose: 500 });
        navigate("/listings");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const update = async (product: IProperty) => {
    try {
      await api.property.update(product);
    } catch (error) { }
  };

  const create = async (product: IProperty) => {
    try {
      await api.property.create(product);
    } catch (error) { }
  };

  const onCancel = () => {
    store.property.clearSelected();
    setItem({ ...defaultProperty });
    setPreviewImages([]);
  };

  const deleteImage = async (index: number) => {
    try {
      const updatedImages = [...previewImages];
      updatedImages.splice(index, 1);
      setPreviewImages(updatedImages);
      await api.property.update({ ...item, images: updatedImages })
      await api.property.deleteImage(previewImages[index])
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen max-w-7xl px-3 mx-auto">
      <section className="lg:py-24 md:py-20 py-14">
        <div className="card card-bordered border-gray-200 shadow-lg max-w-3xl mx-auto">
          <div className="px-3">
            <FormHeading>Create Listing</FormHeading>
            <div className="max-w-3xl mx-auto">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <div
                    role="group"
                    aria-labelledby="listing-type"
                    className="grid grid-cols-2 gap-9 max-w-md">
                    <RadioInput
                      id="forSale"
                      label="For sale"
                      name="type"
                      value="sale"
                      checked={item.type === 'sale'}
                      onChange={() =>
                        setItem({ ...item, type: "sale" })
                      }
                    />
                    <RadioInput
                      id="forRent"
                      label="For rent"
                      name="type"
                      value="rent"
                      checked={item.type === 'rent'}
                      onChange={() =>
                        setItem({ ...item, type: "rent" })
                      }
                    />
                  </div>
                </div>
                <div>
                  <TextInput
                    label="Title"
                    id="title"
                    name="title"
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      setItem({ ...item, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <TextAreaInput
                    label="Description"
                    id="description"
                    name="description"
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      setItem({ ...item, description: e.target.value })
                    } />
                </div>
                <div>
                  <TextAreaInput
                    label="Address"
                    id="address"
                    name="address"
                    type='text'
                    value={item.address}
                    onChange={(e) =>
                      setItem({ ...item, address: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
                  <div>
                    <TextInput
                      label="No. of bedrooms"
                      id="bedrooms"
                      name="bedrooms"
                      type="number"
                      min={1}
                      value={item.bedrooms}
                      onChange={(e) =>
                        setItem({ ...item, bedrooms: Number(e.target.value) })
                      }
                      required
                    />
                  </div>
                  <div>
                    <TextInput
                      label="No. of bathrooms"
                      id="bathrooms"
                      name="bathrooms"
                      type="number"
                      min={1}
                      value={item.bathrooms}
                      onChange={(e) =>
                        setItem({ ...item, bathrooms: Number(e.target.value) })
                      }
                      required
                    />
                  </div>
                  <div>
                    <TextInput
                      label="Car space"
                      id="carspace"
                      name="carspace"
                      type="number"
                      min={0}
                      value={item.carspace}
                      onChange={(e) =>
                        setItem({ ...item, carspace: Number(e.target.value) })
                      }
                      required
                    />
                  </div>
                  <div>
                    <TextInput
                      label="Area (in SQFT)"
                      id="listingSize"
                      name="listingSize"
                      type="number"
                      min={1}
                      value={item.listingSize}
                      onChange={(e) =>
                        setItem({ ...item, listingSize: Number(e.target.value) })
                      }
                    />
                  </div>
                </div>
                <div>
                  <TextInput
                    label="Price (in NAD)"
                    id="regularPrice"
                    name="regularPrice"
                    type="number"
                    value={item.regularPrice}
                    onChange={(e) =>
                      setItem({ ...item, regularPrice: Number(e.target.value) })
                    }
                    required
                  />
                </div>
                <div>
                  <UploadedImageThumb
                    previewImages={previewImages}
                    setPreviewImages={setPreviewImages}
                    setSelectedImages={setSelectedImages}
                    isUploading={isUploading}
                    deleteImage={deleteImage} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="btn btn-neutral btn-block mt-3 mx-0"
                    onClick={onCancel}>
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary md:mt-3 btn-block mx-0"
                    disabled={loading}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CreateListing;
