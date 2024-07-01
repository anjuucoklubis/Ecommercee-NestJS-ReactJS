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
import ProductViewModelGet from "./ViewModel/ProductViewModelGet.ts";

interface DetailProductViewProps {
  productId: string;
  onClose: () => void;
  isOpenDetailProduct: boolean;
  size?: "5xl";
}

const DetailProductView: React.FC<DetailProductViewProps> = ({
  onClose,
  isOpenDetailProduct,
  productId,
  size = "5xl",
}) => {
  const { getProductByID, getproductDetail } = ProductViewModelGet();

  useEffect(() => {
    if (productId) {
      getProductByID(parseInt(productId, 10));
    }
  }, [productId]);

  return (
    <>
      <div>
        <Modal
          size={size}
          isOpen={isOpenDetailProduct}
          placement="top-center"
          onClose={onClose}
        >
          <form className="p-4 md:p-5">
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">
                Detail Product
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
                  value={getproductDetail?.product_sku || "null"}
                  isReadOnly
                  disabled={true}
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
                  value={getproductDetail?.product_name || "null"}
                  isReadOnly
                  disabled={true}
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
                  value={getproductDetail?.product_description || "null"}
                  isReadOnly
                  disabled={true}
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
                  value={getproductDetail?.product_short_description || "null"}
                  isReadOnly
                  disabled={true}
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
                  value={getproductDetail?.product_price_original || "null"}
                  isReadOnly
                  disabled={true}
                />
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Discount Origin Product"
                  placeholder="Enter Price Discount..."
                  variant="bordered"
                  type="text"
                  name="product_price_discount"
                  value={getproductDetail?.product_price_discount || "null"}
                  isReadOnly
                  disabled={true}
                />
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Quantity Product"
                  placeholder="Enter Quantity..."
                  variant="bordered"
                  type="text"
                  name="product_quantity"
                  value={getproductDetail?.product_quantity || "null"}
                  isReadOnly
                  disabled={true}
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Weight Product"
                  placeholder="Enter Weight"
                  type="text"
                  variant="bordered"
                  name="product_weight"
                  value={getproductDetail?.product_weight || "null"}
                  isReadOnly
                  disabled={true}
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Category Product"
                  placeholder="Enter Weight"
                  type="text"
                  variant="bordered"
                  name="product_weight"
                  value={getproductDetail?.CategoryProduct?.name || "null"}
                  isReadOnly
                  disabled={true}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default DetailProductView;
