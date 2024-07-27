import React, { useEffect } from "react";
import {
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
} from "@nextui-org/react";
import AssignProductDiscountCreateViewModel from "./ViewModel/AssignProductDiscountCreateViewModel.ts";
import AssignProductDiscountViewModel from "./ViewModel/AssignProductDiscountViewModel.ts";

interface AssignProductDiscountViewProps {
  isOpenAssignProductDiscount: boolean;
  onClose: () => void;
  discountId: string; 
}

const AddAssignProductDiscountView: React.FC<
  AssignProductDiscountViewProps
> = ({ isOpenAssignProductDiscount, onClose, discountId }) => {
  const {
    getAllProductforAssignProduct,
    handleProductSelection,
    handleSubmit,
    formData,
  } = AssignProductDiscountCreateViewModel({ onClose, discountId });

  const { getDiscountByID } = AssignProductDiscountViewModel();

  useEffect(() => {
    if (discountId) {
      getDiscountByID(discountId);
    } else {
      console.error("Invalid discountId:", discountId);
    }
  }, [discountId]);

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
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Select products
                </label>
                {getAllProductforAssignProduct.length === 0 ? (
                  <p className="text-gray-500">
                    Not yet product for assignment
                  </p>
                ) : (
                  getAllProductforAssignProduct.map((product) => (
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
                        {product === null
                          ? "Not yet product for assignment"
                          : product.product_name}
                      </label>
                    </div>
                  ))
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

export default AddAssignProductDiscountView;
