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
import { GiWeight } from "react-icons/gi";
import { AiOutlineMail } from "react-icons/ai";
import { BsCalendar2Date } from "react-icons/bs";
import { IoImagesOutline } from "react-icons/io5";
import { RiProductHuntLine } from "react-icons/ri";
import { MdOutlineDiscount } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdOutlineDescription } from "react-icons/md";
import ImageBase64 from "../../../../utils/imageBase64.ts";
import DateComponenttt from "../../../../components/date/date.ts";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import ProductViewModelGet from "./ViewModel/ProductViewModelGet.ts";
import { FormatRupiah } from "../../../../components/rupiah/rupiahFormat.ts";

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
  const { DisplayBase64 } = ImageBase64();
  const { formatDate } = DateComponenttt();

  useEffect(() => {
    if (productId) {
      getProductByID(productId);
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
        <ModalHeader className="flex flex-col gap-1">
          Detail Product
        </ModalHeader>
        <ModalBody>
          <form className="p-0 md:p-5 flex gap-3">
            <div className="flex-1">
              <div style={{ marginBottom: "10px" }}>
                <Input
                  autoFocus
                  endContent={
                    <RiProductHuntLine className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="SKU Product"
                  placeholder="Enter SKU..."
                  variant="bordered"
                  type="text"
                  name="product_sku"
                  value={getproductDetail?.product_sku || ""}
                  isReadOnly
                  disabled={true}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Input
                  autoFocus
                  endContent={
                    <RiProductHuntLine className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Name Product"
                  placeholder="Enter name..."
                  variant="bordered"
                  type="text"
                  name="product_name"
                  value={getproductDetail?.product_name || ""}
                  isReadOnly
                  disabled={true}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Input
                  autoFocus
                  endContent={
                    <MdOutlineDescription className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Description Product"
                  placeholder="Enter Description..."
                  variant="bordered"
                  type="text"
                  name="product_description"
                  value={getproductDetail?.product_description || ""}
                  isReadOnly
                  disabled={true}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Input
                  autoFocus
                  endContent={
                    <MdOutlineDescription className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Desc Short Product"
                  placeholder="Enter Desc Short..."
                  variant="bordered"
                  type="text"
                  name="product_short_description"
                  value={getproductDetail?.product_short_description || ""}
                  isReadOnly
                  disabled={true}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Input
                  autoFocus
                  endContent={
                    <IoPricetagsOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Price Origin Product"
                  placeholder="Enter Price Origin..."
                  variant="bordered"
                  type="text"
                  name="product_price_original"
                  value={FormatRupiah({
                    value: Number(
                      getproductDetail?.product_price_original || 0
                    ),
                  })}
                  isReadOnly
                  disabled={true}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Input
                  autoFocus
                  endContent={
                    <MdOutlineDiscount className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Discount Origin Product"
                  placeholder="Enter Price Discount..."
                  variant="bordered"
                  type="text"
                  name="product_price_discount"
                  value={getproductDetail?.product_price_discount || ""}
                  isReadOnly
                  disabled={true}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Input
                  autoFocus
                  endContent={
                    <MdOutlineProductionQuantityLimits className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Quantity Product"
                  placeholder="Enter Quantity..."
                  variant="bordered"
                  type="text"
                  name="product_quantity"
                  value={getproductDetail?.product_quantity || ""}
                  isReadOnly
                  disabled={true}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Input
                  endContent={
                    <GiWeight className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Weight Product"
                  placeholder="Enter Weight"
                  type="text"
                  variant="bordered"
                  name="product_weight"
                  value={getproductDetail?.product_weight || ""}
                  isReadOnly
                  disabled={true}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Input
                  endContent={
                    <MdOutlineCategory className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
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
            </div>
            <div className="flex-1">
              <div style={{ marginBottom: "10px" }}>
                <Input
                  endContent={
                    <BsCalendar2Date className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Created At"
                  placeholder="Enter Weight"
                  type="text"
                  variant="bordered"
                  name="product_weight"
                  value={formatDate(getproductDetail?.createdAt || "")}
                  isReadOnly
                  disabled={true}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Input
                  endContent={
                    <BsCalendar2Date className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Updated At"
                  placeholder="Enter Weight"
                  type="text"
                  variant="bordered"
                  name="product_weight"
                  value={
                    getproductDetail?.updatedAt
                      ? formatDate(getproductDetail?.updatedAt)
                      : "-"
                  }
                  isReadOnly
                  disabled={true}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Input
                  endContent={
                    <AiOutlineMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email User Author"
                  placeholder="Enter Weight"
                  type="text"
                  variant="bordered"
                  name="product_weight"
                  value={getproductDetail?.user?.email || ""}
                  isReadOnly
                  disabled={true}
                />
              </div>
              <div
                style={{
                  marginBottom: "10px",
                  border: "2px solid #ccc",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <div className="flex">
                  <p>Image Product</p>
                  <IoImagesOutline
                    size={23}
                    style={{ marginLeft: 310 }}
                    color="gray"
                  />
                </div>
                {getproductDetail?.productGalleries.length === 0 ? (
                  <div>
                    <Card
                      shadow="sm"
                      isPressable
                      className="flex flex-1"
                      onPress={() => console.log("item pressed")}
                    >
                      <CardBody className="relative overflow-visible p-0">
                        <img
                          width="100%"
                          alt="Default Gallery"
                          className="w-full object-cover h-[140px]"
                          src="https://media.istockphoto.com/id/1342760057/vector/man-cartoon-character-people-face-profiles-avatars-and-icons-close-up-image-of-asking-man.jpg?s=612x612&w=0&k=20&c=mbpOWVRayrOpyDWvMHkC5fw6vyCvPHMdeLh9EYx6ZJk="
                        />
                      </CardBody>
                      <CardBody className="relative overflow-visible p-0"></CardBody>
                    </Card>
                    <p style={{ fontSize: 13 }}>
                      This product does not have an image...
                    </p>
                  </div>
                ) : (
                  getproductDetail?.productGalleries.map((gallery, index) => (
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
                          src={DisplayBase64(gallery.product_galeries_image)}
                        />
                      </CardBody>
                    </Card>
                  ))
                )}
              </div>
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
