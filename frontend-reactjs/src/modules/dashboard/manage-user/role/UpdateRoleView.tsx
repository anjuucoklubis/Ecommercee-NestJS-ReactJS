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
import { FiUsers } from "react-icons/fi";
import RoleViewModelUpdate from "./ViewModel/RoleViewModelUpdate.ts";

interface UpdateRoleViewProps {
  roleId: string;
  onClose: () => void;
  isOpenUpdateRole: boolean;
}

const UpdateRoleView: React.FC<UpdateRoleViewProps> = ({
  roleId,
  onClose,
  isOpenUpdateRole,
}) => {
  const {
    handleShowDetailRole,
    handleSubmitUpdateRole,
    formDataUpdate,
    handleInputChange,
  } = RoleViewModelUpdate({ onClose });

  useEffect(() => {
    if (roleId) {
      handleShowDetailRole(parseInt(roleId, 10));
    }
  }, [roleId]);

  return (
    <div>
      <Modal isOpen={isOpenUpdateRole} placement="top-center" onClose={onClose}>
        <form className="p-4 md:p-5" onSubmit={handleSubmitUpdateRole}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Edit Role</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                endContent={
                  <FiUsers className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Role Name"
                placeholder="Enter Role Name..."
                variant="bordered"
                type="text"
                name="role_name"
                value={formDataUpdate.role_name}
                onChange={handleInputChange}
              />
              <Input
                autoFocus
                endContent={
                  <FiUsers className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Role Description"
                placeholder="Enter Role Description..."
                variant="bordered"
                type="text"
                name="role_description"
                value={formDataUpdate.role_description}
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

export default UpdateRoleView;
