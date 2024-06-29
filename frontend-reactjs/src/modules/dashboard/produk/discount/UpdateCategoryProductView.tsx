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
import { MailIcon } from "../../../../components/icons/MailIcon.tsx";
import { LockIcon } from "../../../../components/icons/LockIcon.tsx";
import DiscountProductViewModelUpdate from "./ViewModel/DiscountProductViewModelUpdate.ts";

interface UpdateDiscountProductViewProps {
  discountId: string;
  onClose: () => void;
  isOpenUpdateDiscount: boolean;
}

const UpdateDiscountProductView: React.FC<UpdateDiscountProductViewProps> = ({
  onClose,
  discountId,
  isOpenUpdateDiscount,
}) => {
  const {
    handleShowDetailDiscount,
    handleSubmitUpdateDiscountProduct,
    formDataUpdate,
    handleInputChangeUpdateDiscount,
  } = DiscountProductViewModelUpdate({ onClose });

 

  useEffect(() => {
    if (discountId) {
      handleShowDetailDiscount(parseInt(discountId, 10));
    }
  }, [discountId]);

  return (
    <div>
      <Modal
        isOpen={isOpenUpdateDiscount}
        placement="top-center"
        onClose={onClose}
      >
        <form
          className="p-4 md:p-5"
          onSubmit={handleSubmitUpdateDiscountProduct}
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Edit Discount Product
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Name Discount"
                placeholder="Enter name..."
                variant="bordered"
                type="text"
                name="product_discount_name"
                id="product_discount_name"
                value={formDataUpdate.product_discount_name}
                onChange={handleInputChangeUpdateDiscount}
              />
              <Input
                endContent={
                  <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Description Discount"
                placeholder="Enter description"
                type="text"
                variant="bordered"
                name="product_discount_description"
                value={formDataUpdate.product_discount_description}
                onChange={handleInputChangeUpdateDiscount}
              />
              <Input
                endContent={
                  <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Description Discount"
                placeholder="Enter Percent"
                type="number"
                variant="bordered"
                name="product_discount_percent"
                value={formDataUpdate.product_discount_percent.toString()}
                onChange={handleInputChangeUpdateDiscount}
                min={1}
                max={100}
              />
              <select
                name="product_discount_active"
                value={formDataUpdate.product_discount_active}
                onChange={handleInputChangeUpdateDiscount}
                style={{
                  border: "2px solid #ccc",
                  borderRadius: "10px",
                  padding: "13px",
                  color:
                    formDataUpdate.product_discount_active === "1"
                      ? "green"
                      : "red",
                }}
              >
                <option value="1" style={{ color: "black" }}>
                  Active
                </option>
                <option value="0" style={{ color: "black" }}>
                  Inactive
                </option>
              </select>
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

export default UpdateDiscountProductView;
