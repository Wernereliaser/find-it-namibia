import { deleteObject, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../db/config";

export const uploadBlobToStorage = (file: File, path: string) => {
  const storageRef = ref(storage, `${path}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  return uploadTask;
};

export const deleteFileFromStorage = async (imageUrl: string) => {
  const imageRef = ref(storage, imageUrl);
  await deleteObject(imageRef);
};
