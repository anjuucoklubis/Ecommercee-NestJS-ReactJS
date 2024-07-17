import React from "react";
import {
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
} from "@nextui-org/react";
import AssignProductDiscountCreateViewModel from "./ViewModel/AssignProductDiscountCreateViewModel.ts";

interface AssignProductDiscountViewProps {
  isOpenAssignProductDiscount: boolean;
  onClose: () => void;
}

const AddAssignProductDiscountView: React.FC<
  AssignProductDiscountViewProps
> = ({ isOpenAssignProductDiscount, onClose }) => {
  const {
    getAllDiscountforAssignProduct,
    selectedDiscount,
    handleDiscountChange,
    getAllProductforAssignProduct,
    handleSubmit,
    formData,
    handleProductSelection,
  } = AssignProductDiscountCreateViewModel({ onClose });

  return (
    <div>
      <Modal
        isOpen={isOpenAssignProductDiscount}
        placement="top-center"
        onClose={onClose}
      >
        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Assign Discount
            </ModalHeader>
            <ModalBody>
              <div className="col-span-2">
                <label
                  htmlFor="categoryId"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Discount Product
                </label>
                <select
                  className="text-whit bg-gray-50 border border-gray-300 w-full p-2.5 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  value={selectedDiscount}
                  onChange={handleDiscountChange}
                >
                  <option value="">Pilih Discount</option>
                  {getAllDiscountforAssignProduct.map((discount) => (
                    <option key={discount.id} value={discount.id}>
                      {discount.product_discount_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Select products
                </label>
                {getAllProductforAssignProduct.map((product) => (
                  <div className="form-check" key={product.id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={product.id}
                      id={`product-${product.id}`}
                      checked={formData.productIds.includes(product.id)}
                      onChange={() => handleProductSelection(product.id)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`product-${product.id}`}
                    >
                      {product.product_name}
                    </label>
                  </div>
                ))}
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

export default AddAssignProductDiscountView;
