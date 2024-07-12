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
import VMUpdateUserProfile from "./ViewModel/VMUpdateUserProfile.ts";
import { MailIcon } from "../../../../../components/icons/MailIcon.tsx";
import { LockIcon } from "../../../../../components/icons/LockIcon.tsx";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

interface UpdateUserProfileViewProps {
  isOpenUpdateDiscount: boolean;
  onClose: () => void;
}

const UserProfileUpdateView: React.FC<UpdateUserProfileViewProps> = ({
  isOpenUpdateDiscount,
  onClose,
}) => {
  const {
    formDataUpdate,
    handleInputChange,
    handleSubmitUpdateUserProfile,
    loading,
    handlePhoneChange,
  } = VMUpdateUserProfile({ onClose });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Modal
        isOpen={isOpenUpdateDiscount}
        placement="top-center"
        onClose={onClose}
      >
        <form className="p-4 md:p-5" onSubmit={handleSubmitUpdateUserProfile}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Update User Profile
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="First Name"
                placeholder="Enter name..."
                variant="bordered"
                type="text"
                name="firstname"
                value={formDataUpdate.firstname}
                onChange={handleInputChange}
              />
              <Input
                endContent={
                  <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Last Name"
                placeholder="Enter Lastname"
                type="text"
                variant="bordered"
                name="lastname"
                value={formDataUpdate.lastname}
                onChange={handleInputChange}
              />
              <PhoneInput
                international={false}
                defaultCountry="ID"
                placeholder="Enter phone number"
                value={formDataUpdate.telephone}
                onChange={handlePhoneChange}
                className="custom-phone-input"
                variant="bordered"
                style={{
                  border: "2px solid #ccc",
                  borderRadius: "10px",
                  padding: "13px",
                }}
                limitMaxLength={true}
                maxLength={15}
              />
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

export default UserProfileUpdateView;
