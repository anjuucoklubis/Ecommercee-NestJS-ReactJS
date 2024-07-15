import React, { useEffect } from "react";
import {
  Modal,
  Input,
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
} from "@nextui-org/react";
import { MailIcon } from "../../../../components/icons/MailIcon.tsx";
import { LockIcon } from "../../../../components/icons/LockIcon.tsx";
import ProductViewModelUpdate from "./ViewModel/ProductViewModelUpdate.ts";
import { FormatRupiah } from "../../../../components/rupiah/rupiahFormat.ts";

interface UpdateProductViewProps {
  productId: string;
  onClose: () => void;
  isOpenUpdateProduct: boolean;
}

const UpdateProductView: React.FC<UpdateProductViewProps> = ({
  productId,
  onClose,
  isOpenUpdateProduct,
}) => {
  const {
    handleShowDetailProduct,
    productDetail,
    handleSubmitUpdateProduct,
    formDataUpdate,
    handleInputChange,
    handleCategoryChange,
    getAllCategoryforCreateProduct,
    selectedCategory,
  } = ProductViewModelUpdate({ onClose });

  useEffect(() => {
    if (productId) {
      handleShowDetailProduct(parseInt(productId, 10));
    }
  }, [productId]);

  return (
    <div>
      <Modal
        isOpen={isOpenUpdateProduct}
        placement="top-center"
        onClose={onClose}
      >
        <form className="p-4 md:p-5" onSubmit={handleSubmitUpdateProduct}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Edit Product
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="SKU Product"
                placeholder="Enter SKU..."
                variant="bordered"
                type="text"
                name="product_sku"
                value={formDataUpdate.product_sku}
                onChange={handleInputChange}
              />
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Name Product"
                placeholder="Enter name..."
                variant="bordered"
                type="text"
                name="product_name"
                value={formDataUpdate.product_name}
                onChange={handleInputChange}
              />
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Description Product"
                placeholder="Enter Description..."
                variant="bordered"
                type="text"
                name="product_description"
                value={formDataUpdate.product_description}
                onChange={handleInputChange}
              />
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Desc Short Product"
                placeholder="Enter Desc Short..."
                variant="bordered"
                type="text"
                name="product_short_description"
                value={formDataUpdate.product_short_description}
                onChange={handleInputChange}
              />
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Price Origin Product"
                placeholder="Enter Price Origin..."
                variant="bordered"
                type="text"
                name="product_price_original"
                value={FormatRupiah({
                  value: Number(
                    formDataUpdate?.product_price_original || 0
                  ),
                })}
                onChange={handleInputChange}
              />
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Quantity Product"
                placeholder="Enter Quantity..."
                variant="bordered"
                type="number"
                name="product_quantity"
                value={formDataUpdate.product_quantity}
                onChange={handleInputChange}
              />

              <Input
                endContent={
                  <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Weight Product"
                placeholder="Enter Weight"
                type="number"
                variant="bordered"
                name="product_weight"
                value={formDataUpdate.product_weight}
                onChange={handleInputChange}
              />

              <div className="col-span-2">
                <label
                  htmlFor="categoryId"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Kategori Produk sekarang :{" "}
                  {productDetail?.CategoryProduct?.name || "Loading..."}
                </label>
                <select
                  className="text-whit bg-gray-50 border border-gray-300 w-full p-2.5 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  {getAllCategoryforCreateProduct.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
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

export default UpdateProductView;
