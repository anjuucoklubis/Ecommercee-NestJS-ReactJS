import React, { useEffect } from "react";
import {
  Modal,
  Input,
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  Card,
  CardBody,
} from "@nextui-org/react";
import { MailIcon } from "../../../../components/icons/MailIcon.tsx";
import { LockIcon } from "../../../../components/icons/LockIcon.tsx";
import ProductViewModelGet from "./ViewModel/ProductViewModelGet.ts";
import API_FRONTEND from "../../../../api/api.ts";

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
  const { API_URL_IMAGESRC_PRODUCT } = API_FRONTEND();

  useEffect(() => {
    if (productId) {
      getProductByID(parseInt(productId, 10));
    }
  }, [productId]);

  return (
    <Modal
      size={size}
      isOpen={isOpenDetailProduct}
      placement="top-center"
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Detail Product</ModalHeader>
        <ModalBody>
          <form className="p-4 md:p-5 flex gap-5">
            <div className="flex-1">
              <Input
                autoFocus
                endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                label="SKU Product"
                placeholder="Enter SKU..."
                variant="bordered"
                type="text"
                name="product_sku"
                value={getproductDetail?.product_sku || ""}
                isReadOnly
                disabled={true}
              />
              <Input
                autoFocus
                endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                label="Name Product"
                placeholder="Enter name..."
                variant="bordered"
                type="text"
                name="product_name"
                value={getproductDetail?.product_name || ""}
                isReadOnly
                disabled={true}
              />
              <Input
                autoFocus
                endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                label="Description Product"
                placeholder="Enter Description..."
                variant="bordered"
                type="text"
                name="product_description"
                value={getproductDetail?.product_description || ""}
                isReadOnly
                disabled={true}
              />
              <Input
                autoFocus
                endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                label="Desc Short Product"
                placeholder="Enter Desc Short..."
                variant="bordered"
                type="text"
                name="product_short_description"
                value={getproductDetail?.product_short_description || ""}
                isReadOnly
                disabled={true}
              />
              <Input
                autoFocus
                endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                label="Price Origin Product"
                placeholder="Enter Price Origin..."
                variant="bordered"
                type="text"
                name="product_price_original"
                value={getproductDetail?.product_price_original || ""}
                isReadOnly
                disabled={true}
              />
              <Input
                autoFocus
                endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                label="Discount Origin Product"
                placeholder="Enter Price Discount..."
                variant="bordered"
                type="text"
                name="product_price_discount"
                value={getproductDetail?.product_price_discount || ""}
                isReadOnly
                disabled={true}
              />
              <Input
                autoFocus
                endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                label="Quantity Product"
                placeholder="Enter Quantity..."
                variant="bordered"
                type="text"
                name="product_quantity"
                value={getproductDetail?.product_quantity || ""}
                isReadOnly
                disabled={true}
              />
              <Input
                endContent={<LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                label="Weight Product"
                placeholder="Enter Weight"
                type="text"
                variant="bordered"
                name="product_weight"
                value={getproductDetail?.product_weight || ""}
                isReadOnly
                disabled={true}
              />
              <Input
                endContent={<LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                label="Category Product"
                placeholder="Enter Weight"
                type="text"
                variant="bordered"
                name="product_weight"
                value={getproductDetail?.CategoryProduct?.name || ""}
                isReadOnly
                disabled={true}
              />
            </div>
            <div className="flex-1">
              {getproductDetail?.productGalleries.map((gallery, index) => (
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
                  </CardBody>
                </Card>
              ))}
            </div>
          </form>
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

export default DetailProductView;
