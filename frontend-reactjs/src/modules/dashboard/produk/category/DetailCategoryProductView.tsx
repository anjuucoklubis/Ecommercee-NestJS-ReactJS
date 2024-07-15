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
import CategoryProductViewModelGet from "./ViewModel/CategoryProductViewModelGet.ts";
import API_FRONTEND from "../../../../api/api.ts";
import DateComponenttt from "../../../../components/date/date.ts";

interface DetailCategoryProductViewProps {
  categoryId: string;
  isOpenDetailCategory: boolean;
  onClose: () => void;
}

const DetailCategoryProductView: React.FC<DetailCategoryProductViewProps> = ({
  isOpenDetailCategory,
  onClose,
  categoryId,
}) => {
  const { getCategoryByID, getcategoryDetail } = CategoryProductViewModelGet();

  const {API_URL_CATEGORYPRODUCT_IMAGE} = API_FRONTEND();
  const { formatDate } = DateComponenttt();

  useEffect(() => {
    if (categoryId) {
      getCategoryByID(parseInt(categoryId, 10));
    }
  }, [categoryId]);

  return (
    <div>
      <Modal
        isOpen={isOpenDetailCategory}
        placement="top-center"
        onClose={onClose}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Detail Category Product
          </ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              endContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Name Category"
              placeholder="Enter name..."
              variant="bordered"
              type="text"
              name="name"
              value={getcategoryDetail?.name}
              disabled={true}
            />
            <Input
              endContent={
                <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Description Category"
              placeholder="Enter description"
              type="text"
              variant="bordered"
              name="description"
              value={getcategoryDetail?.description}
              disabled={true}
            />
               <Input
              endContent={
                <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Created Category"
              placeholder="Enter Created"
              type="text"
              variant="bordered"
              name="createdAt"
              value={formatDate(getcategoryDetail?.createdAt)}
              disabled={true}
            />
               <Input
              endContent={
                <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Updated Category"
              placeholder="Enter Updated"
              type="text"
              variant="bordered"
              name="updatedAt"
              value={formatDate(getcategoryDetail?.updatedAt)}
              disabled={true}
            />
       
            {getcategoryDetail?.image && (
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Image Category Product
                </label>
                <img
                  src={(`${API_URL_CATEGORYPRODUCT_IMAGE}/${getcategoryDetail?.image}`)}
                  alt="Preview"
                  className="max-w-full h-auto max-h-24 rounded-lg"
                />
              </div>
            )}
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
      </Modal>
    </div>
  );
};

export default DetailCategoryProductView;
