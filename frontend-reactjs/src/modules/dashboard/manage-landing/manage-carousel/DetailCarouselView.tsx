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
import { BiCarousel } from "react-icons/bi";
import { BsCalendar2Date } from "react-icons/bs";
import { IoImagesOutline } from "react-icons/io5";
import API_FRONTEND from "../../../../api/api.ts";
import DateComponenttt from "../../../../components/date/date.ts";
import GetCarouselViewMode from "./ViewModel/GetCarouselViewMode.ts";

interface DetailCarouselViewProps {
  carouselId: string;
  isOpenDetailCarousel: boolean;
  onClose: () => void;
}

const DetailCarouselView: React.FC<DetailCarouselViewProps> = ({
  isOpenDetailCarousel,
  onClose,
  carouselId,
}) => {
  const { getCarouselByID, getCarouselDetail } = GetCarouselViewMode();

  const { API_URL_CAROUSEl_IMAGE } = API_FRONTEND();
  const { formatDate } = DateComponenttt();

  useEffect(() => {
    if (carouselId) {
      getCarouselByID(parseInt(carouselId, 10));
    }
  }, [carouselId, getCarouselByID]);

  return (
    <div>
      <Modal
        isOpen={isOpenDetailCarousel}
        placement="top-center"
        onClose={onClose}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Detail Carousel
          </ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              endContent={
                <BiCarousel className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Name Carousel"
              placeholder="Name Carousel..."
              variant="bordered"
              type="text"
              value={getCarouselDetail?.name || ""}
              disabled={true}
            />
            <Input
              autoFocus
              endContent={
                <BiCarousel className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Carousel Active"
              placeholder="Carousel Active..."
              variant="bordered"
              type="text"
              value={
                getCarouselDetail?.isActive === "true" ? "Active" : " Inactive"
              }
              style={{
                color: getCarouselDetail?.isActive === "true" ? "green" : "red",
              }}
              isReadOnly
              disabled={true}
            />
            <Input
              endContent={
                <BsCalendar2Date className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Created Carousel"
              placeholder="Created Carousel"
              type="text"
              variant="bordered"
              value={
                getCarouselDetail
                  ? formatDate(getCarouselDetail?.createdAt)
                  : ""
              }
              disabled={true}
            />
            <Input
              endContent={
                <BsCalendar2Date className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Updated Carousel"
              placeholder="Updated Carousel"
              type="text"
              variant="bordered"
              value={
                getCarouselDetail && getCarouselDetail.updateAt
                  ? formatDate(getCarouselDetail.updateAt)
                  : "-"
              }
              disabled={true}
            />

            {getCarouselDetail?.image && (
              <div
                className="col-span-2"
                style={{
                  border: "2px solid #ccc",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <div className="flex">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Image Carousel
                  </label>
                  <IoImagesOutline
                    size={23}
                    style={{ marginLeft: 235 }}
                    color="gray"
                  />
                </div>
                <img
                  src={`${API_URL_CAROUSEl_IMAGE}/${getCarouselDetail?.image}`}
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DetailCarouselView;
