import React, { useEffect } from "react";
import {
  Modal,
  Input,
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { MdOutlineDiscount } from "react-icons/md";
import { LiaPercentageSolid } from "react-icons/lia";
import AssignProductDiscountViewModel from "./ViewModel/AssignProductDiscountViewModel.ts";
import { TbDiscountOff } from "react-icons/tb";

interface DetailAssignProductDiscountProps {
  discountId: string;
  onClose: () => void;
  isOpenDetailAssignProductDiscount: boolean;
  size?: "5xl";
}

const DetailAssignProductDiscountView: React.FC<
  DetailAssignProductDiscountProps
> = ({
  onClose,
  isOpenDetailAssignProductDiscount,
  discountId,
  size = "5xl",
}) => {
  const { getdiscountDetail, getDiscountByID } =
    AssignProductDiscountViewModel();

  useEffect(() => {
    if (discountId && discountId.trim() !== "") {
      getDiscountByID(discountId);
    } else {
      console.error("Invalid discountId:", discountId);
    }
  }, [discountId]);

  return (
    <Modal
      size={size}
      isOpen={isOpenDetailAssignProductDiscount}
      placement="top-center"
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Detail Assign Discount for {getdiscountDetail?.product_discount_name}
        </ModalHeader>
        <ModalBody>
          <div className="flex-1">
            <div style={{ marginBottom: "30px" }}>
              <p style={{ marginBottom: "10px" }}>Discount Detail</p>

              <Input
                autoFocus
                endContent={
                  <MdOutlineDiscount className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Discount Name"
                placeholder="Discount Name"
                variant="bordered"
                type="text"
                value={getdiscountDetail?.product_discount_name || ""}
                isReadOnly
                disabled={true}
              />
              <Input
                autoFocus
                endContent={
                  <LiaPercentageSolid className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Discount Percent"
                placeholder="Discount Percent..."
                variant="bordered"
                type="text"
                value={`${getdiscountDetail?.product_discount_percent || ""} %`}
                isReadOnly
                disabled={true}
              />
              <Input
                autoFocus
                endContent={
                  <TbDiscountOff className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Discount Active"
                placeholder="Discount Active..."
                variant="bordered"
                type="text"
                value={
                  getdiscountDetail?.product_discount_active === true
                    ? "Active"
                    : "Not Active"
                }
                style={{
                  color:
                    getdiscountDetail?.product_discount_active === true
                      ? "green"
                      : "red",
                }}
                isReadOnly
                disabled={true}
              />
            </div>
            <div>
              <p style={{ marginBottom: "10px" }}>Product Assign</p>
              <Table removeWrapper aria-label="Product Details Table">
                <TableHeader>
                  <TableColumn>Nama Product</TableColumn>
                  <TableColumn>Price Original</TableColumn>
                  <TableColumn>Price Discount</TableColumn>
                </TableHeader>
                <TableBody>
                  {getdiscountDetail?.products &&
                  getdiscountDetail.products.length > 0 ? (
                    getdiscountDetail.products.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell>{product.product_name}</TableCell>
                        <TableCell>{product.product_price_original}</TableCell>
                        <TableCell>{product.product_price_discount}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={1}>No products found.</TableCell>
                      <TableCell colSpan={1}>No products found.</TableCell>
                      <TableCell colSpan={1}>No products found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
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

export default DetailAssignProductDiscountView;
