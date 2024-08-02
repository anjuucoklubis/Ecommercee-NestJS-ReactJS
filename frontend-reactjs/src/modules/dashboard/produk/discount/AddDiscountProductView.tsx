import React from "react";
import {
  Modal,
  Input,
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
} from "@nextui-org/react";
import DiscountProductViewModelCreate from "./ViewModel/DiscountProductViewModelCreate.ts";
import { MdOutlineDiscount } from "react-icons/md";
import { LiaPercentageSolid } from "react-icons/lia";

interface AddDiscountProductViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddDiscountProductView: React.FC<AddDiscountProductViewProps> = ({
  isOpen,
  onClose,
}) => {
  const { handleSubmitCreateDiscountProduct, handleInputChange, formData } =
    DiscountProductViewModelCreate({ onClose });

  return (
    <div>
      <Modal isOpen={isOpen} placement="top-center" onClose={onClose}>
        <form
          className="p-4 md:p-5"
          onSubmit={handleSubmitCreateDiscountProduct}
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Add Discount Product
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                endContent={
                  <MdOutlineDiscount className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Name Discount"
                placeholder="Enter name..."
                variant="bordered"
                type="text"
                name="product_discount_name"
                value={formData.product_discount_name}
                onChange={handleInputChange}
              />
              <Input
                endContent={
                  <MdOutlineDiscount className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Description Discount"
                placeholder="Enter description"
                type="text"
                variant="bordered"
                name="product_discount_description"
                value={formData.product_discount_description}
                onChange={handleInputChange}
              />
              <Input
                endContent={
                  <LiaPercentageSolid className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Percent Discount"
                placeholder="Enter Percent"
                type="number"
                variant="bordered"
                name="product_discount_percent"
                value={formData.product_discount_percent.toString()}
                onChange={handleInputChange}
                min={1}
                max={100}
              />
              <select
                name="product_discount_active"
                value={formData.product_discount_active}
                onChange={handleInputChange}
                style={{
                  border: "2px solid #ccc",
                  borderRadius: "10px",
                  padding: "13px",
                  color:
                    formData.product_discount_active === "1" ? "green" : "red",
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

export default AddDiscountProductView;
