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

import VMCreateUserProfile from "./ViewModel/VMCreateUserProfile.ts";
import { MailIcon } from "../../../../../components/icons/MailIcon.tsx";
import { LockIcon } from "../../../../../components/icons/LockIcon.tsx";

interface AddUserProfileViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileCreateView: React.FC<AddUserProfileViewProps> = ({
  isOpen,
  onClose,
}) => {
  const { handleSubmitCreateUserProfile, handleInputChange, formData } =
    VMCreateUserProfile({ onClose });

  return (
    <div>
      <Modal isOpen={isOpen} placement="top-center" onClose={onClose}>
        <form className="p-4 md:p-5" onSubmit={handleSubmitCreateUserProfile}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Add User Profile
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
                value={formData.firstname}
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
                value={formData.lastname}
                onChange={handleInputChange}
              />
              <Input
                endContent={
                  <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Telephone" 
                placeholder="Enter Number"
                type="string"
                variant="bordered"
                name="telephone"
                value={formData.telephone}
                onChange={handleInputChange}
                min={1}
                max={13}
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

export default UserProfileCreateView;
