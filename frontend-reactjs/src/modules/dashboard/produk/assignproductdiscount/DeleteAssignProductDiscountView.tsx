import React, { useEffect, useState } from "react";
import {
  Modal,
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
import AssignProductDiscountDeleteViewModel from "./ViewModel/AssingProductDiscountDeleteViewModel.ts";

interface DeleteAssignProductDiscountViewProps {
  discountId: string;
  onClose: () => void;
  isOpenDeleteAssignProductDiscount: boolean;
  size?: "5xl";
}

const DeleteAssignProductDiscountView: React.FC<
  DeleteAssignProductDiscountViewProps
> = ({
  onClose,
  isOpenDeleteAssignProductDiscount,
  discountId,
  size = "5xl",
}) => {
  const {
    getdiscountDetail,
    getDiscountByID,
    removeProductDiscountIdFromProduct,
  } = AssignProductDiscountDeleteViewModel({ onClose });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (discountId && discountId.trim() !== "") {
      console.log("Fetching details for discountId:", discountId);
      getDiscountByID(discountId);
    } else {
      console.error("Invalid discountId:", discountId);
    }
  }, [discountId]);

  useEffect(() => {}, [getdiscountDetail]);

  const handleDelete = (productId: string) => {
    setProductToDelete(productId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      await removeProductDiscountIdFromProduct(productToDelete);
      setProductToDelete(null);
      setShowConfirmModal(false);
    }
  };

  const handleCancelDelete = () => {
    setProductToDelete(null);
    setShowConfirmModal(false);
  };

  return (
    <>
      <Modal
        size={size}
        isOpen={isOpenDeleteAssignProductDiscount}
        placement="top-center"
        onClose={onClose}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Delete Assign Discount for{" "}
            {getdiscountDetail?.product_discount_name}
          </ModalHeader>
          <ModalBody>
            <div className="flex-1">
              <div>
                <p style={{ marginBottom: "10px" }}>
                  Select Product to Delete Assign
                </p>
                <Table removeWrapper aria-label="Product Details Table">
                  <TableHeader>
                    <TableColumn>Nama Product</TableColumn>
                    <TableColumn>Delete</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {getdiscountDetail?.products &&
                    getdiscountDetail.products.length > 0 ? (
                      getdiscountDetail.products.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell>{product.product_name}</TableCell>
                          <TableCell>
                            <Button
                              color="danger"
                              onClick={() => handleDelete(product.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
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
            <Button color="danger" variant="flat" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
        {showConfirmModal && (
          <div
            id="popup-modal"
            className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
          >
            <div className="bg-white p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Konfirmasi Hapus</h3>
              <p className="mb-6">
                Apakah Anda yakin ingin menghapus item ini?
              </p>
              <div className="flex justify-end">
                <button
                  className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md mr-2"
                  onClick={handleConfirmDelete}
                >
                  Ya, saya yakin
                </button>
                <button
                  className="text-gray-800 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
                  onClick={handleCancelDelete}
                >
                  Tidak, batalkan
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default DeleteAssignProductDiscountView;
