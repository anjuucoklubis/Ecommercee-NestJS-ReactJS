import React, { useEffect } from "react";
import {
  Input,
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
} from "@nextui-org/react";
import { IoImagesOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import CategoryProductViewModelUpdate from "./ViewModel/CategoryProductViewModelUpdate.ts";
import ImageBase64 from "../../../../utils/imageBase64.ts";

interface UpdateCategoryProductViewProps {
  categoryId: string;
  onClose: () => void;
  isOpenUpdateCategory: boolean;
}

const UpdateCategoryProductView: React.FC<UpdateCategoryProductViewProps> = ({
  onClose,
  categoryId,
  isOpenUpdateCategory,
}) => {
  const {
    handleShowDetailCategory,
    handleSubmitUpdateCategoryProduct,
    formDataUpdate,

    handleInputChangeUpdateCategory,
    handleImageChangeUpdateCategoryProduct,
  } = CategoryProductViewModelUpdate({ onClose });

  const { DisplayBase64 } = ImageBase64();

  useEffect(() => {
    if (categoryId) {
      handleShowDetailCategory(parseInt(categoryId, 10));
    }
  }, [categoryId, handleShowDetailCategory]);

  return (
    <div>
      <Modal
        isOpen={isOpenUpdateCategory}
        placement="top-center"
        onClose={onClose}
      >
        <form
          className="p-4 md:p-5"
          onSubmit={handleSubmitUpdateCategoryProduct}
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Edit Category Product
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                endContent={
                  <MdOutlineCategory className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Name Category"
                placeholder="Enter name..."
                variant="bordered"
                type="text"
                name="name"
                value={formDataUpdate.name}
                onChange={handleInputChangeUpdateCategory}
              />
              <Input
                endContent={
                  <MdOutlineCategory className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Description Category"
                placeholder="Enter description"
                type="text"
                variant="bordered"
                name="description"
                value={formDataUpdate.description}
                onChange={handleInputChangeUpdateCategory}
              />

              <div
                className="col-span-2"
                style={{
                  border: "2px solid #ccc",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <div className="flex">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Gambar Kategori
                  </label>
                  <IoImagesOutline
                    size={23}
                    style={{ marginLeft: 227 }}
                    color="gray"
                  />
                </div>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center  mb-1">
                      <svg
                        className="w-8 h-8 mb-0 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-0 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">
                          Klik untuk mengunggah{" "}
                        </span>
                        atau seret dan lepas
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleImageChangeUpdateCategoryProduct}
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-row justify-between items-start w-full">
                <div className="flex flex-col items-start">
                  <label
                    htmlFor="currentImage"
                    className="block mb-2 text-sm font- medium text-gray-900 dark:text-white"
                  >
                    Gambar saat ini
                  </label>
                  <img
                    src={DisplayBase64(formDataUpdate.originalImage)}
                    alt="Current"
                    className="max-w-full h-auto max-h-20 rounded-lg"
                  />
                </div>
                {formDataUpdate.image && (
                  <div className="flex flex-col items-start ml-4">
                    <label
                      htmlFor="previewImage"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Preview
                    </label>
                    <img
                      src={URL.createObjectURL(formDataUpdate.image)}
                      alt="Preview"
                      className="max-w-full h-auto max-h-24 rounded-lg"
                    />
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};

export default UpdateCategoryProductView;
