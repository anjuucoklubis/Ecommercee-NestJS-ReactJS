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
// import { LockIcon } from "../../../../components/icons/LockIcon.tsx";
import RoleViewModelCreate from "./ViewModel/RoleViewModelCreate.ts";

interface AddRoleViewProps {
  onClose: () => void;
  isOpen: boolean;
}

const AddRoleView: React.FC<AddRoleViewProps> = ({ onClose, isOpen }) => {
  const {
    handleSubmitCreateRole,
    handleInputChange,
    formData,
  } = RoleViewModelCreate({ onClose });

  return (
    <div>
      <Modal isOpen={isOpen} placement="top-center" onClose={onClose}>
        <form className="p-4 md:p-5" onSubmit={handleSubmitCreateRole}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Add Role</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Role Name"
                placeholder="Enter Role Name..."
                variant="bordered"
                type="text"
                name="role_name"
                value={formData.role_name}
                onChange={handleInputChange}
              />
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Role Description"
                placeholder="Enter Role Description..."
                variant="bordered"
                type="text"
                name="role_description"
                value={formData.role_description}
                onChange={handleInputChange}
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

export default AddRoleView;
