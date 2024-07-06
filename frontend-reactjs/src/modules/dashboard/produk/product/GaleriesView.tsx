import React, { useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  Card,
  CardBody,
  Button,
  Checkbox,
} from "@nextui-org/react";
import GaleriesViewModelGet from "./ViewModel/GaleriesViewModelGet.ts";
import API_FRONTEND from "../../../../api/api.ts";
import GaleriesViewModelCreate from "./ViewModel/GaleriesViewModelCreate.ts";
import GaleriesViewModelDelete from "./ViewModel/GaleriesViewModelDelete.ts";
import { ToastContainer } from "react-toastify";

interface DetailProductViewProps {
  productId: string;
  onClose: () => void;
  isOpenGaleriesProduct: boolean;
  size?: "5xl";
}

const GaleriesView: React.FC<DetailProductViewProps> = ({
  onClose,
  isOpenGaleriesProduct,
  productId,
  size = "5xl",
}) => {
  const { getProductByIDForGaleries, productDetailForGaleries } =
    GaleriesViewModelGet();
  const {
    handleSubmitCreateGaleriesProduct,
    handleImageChange,
    formData,
    setFormData,
  } = GaleriesViewModelCreate({ onClose });

  const {
    handleConfirmDelete,
    handleCancelDelete,
    itemToDelete,
    setItemToDelete,
  } = GaleriesViewModelDelete();

  const { API_URL_IMAGESRC_PRODUCT } = API_FRONTEND();

  useEffect(() => {
    if (productId) {
      getProductByIDForGaleries(parseInt(productId, 10));
    }
  }, [productId]);

  useEffect(() => {
    if (productId) {
      getProductByIDForGaleries(parseInt(productId, 10));
      setFormData((prevData) => ({ ...prevData, productId: productId }));
    }
  }, [productId]);

  return (
    <Modal
      size={size}
      isOpen={isOpenGaleriesProduct}
      placement="top-center"
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Manage Galeries
        </ModalHeader>
        <ModalBody>
          <ToastContainer />

          <form
            className="p-4 md:p-5"
            onSubmit={handleSubmitCreateGaleriesProduct}
          >
            <div>
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tambah Gambar Product
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center mb-1">
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
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
              {formData.product_galeries_image && (
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Preview
                  </label>
                  <img
                    src={URL.createObjectURL(formData.product_galeries_image)}
                    alt="Preview"
                    className="max-w-full h-auto max-h-24 rounded-lg"
                  />
                </div>
              )}
              <Button type="submit" color="primary">
                Submit
              </Button>
            </div>
          </form>

          <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            {productDetailForGaleries?.productGalleries.length === 0 ? (
              <p>No record Galeries</p>
            ) : (
              productDetailForGaleries?.productGalleries.map(
                (gallery, index) => (
                  <Card
                    key={index}
                    shadow="sm"
                    isPressable
                    onPress={() => console.log("item pressed")}
                  >
                    <CardBody className="relative overflow-visible p-0">
                      <img
                        width="100%"
                        alt={`Gallery ${index}`}
                        className="w-full object-cover h-[140px]"
                        src={`${API_URL_IMAGESRC_PRODUCT}/${gallery.product_galeries_image}`}
                      />
                      <button
                        onClick={() => setItemToDelete(gallery.id)}
                        type="button"
                        className="absolute top-2 right-2 bg-white border border-yellow-600 rounded-full p-2"
                        style={{ fontSize: "3.5rem" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="currentColor"
                          className="bi bi-trash3-fill text-red-600"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                        </svg>
                      </button>
                      {!gallery?.product_galeries_thumbnail ? (
                        <Checkbox defaultSelected color="success">
                          No Thumbnail
                        </Checkbox>
                      ) : (
                        <Checkbox defaultSelected color="success">
                          Is Thumbnail
                        </Checkbox>
                      )}
                    </CardBody>
                  </Card>
                )
              )
            )}
          </div>
          {itemToDelete !== null && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Konfirmasi Hapus</h3>
                <p className="mb-6">
                  Apakah Anda yakin ingin menghapus galeri ini?
                </p>
                <div className="flex justify-end">
                  <button
                    className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md mr-2"
                    onClick={handleConfirmDelete}
                  >
                    Ya, Hapus
                  </button>
                  <button
                    className="text-gray-800 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
                    onClick={handleCancelDelete}
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GaleriesView;
