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
import ChangePasswordViewModel from "./ChangePasswordViewModel.ts";
import { ToastContainer } from "react-toastify";
import { MdPassword } from "react-icons/md";

interface AddUserProfileViewProps {
  isOpenChangePassword: boolean;
  onClose: () => void;
  size?: "5xl";
}

const ChangePasswordView: React.FC<AddUserProfileViewProps> = ({
  isOpenChangePassword,
  onClose,
  size = "5xl",
}) => {
  const { handleSubmitChangePassword, handleInputChangePassword, formData } =
    ChangePasswordViewModel({ onClose });

  return (
    <div>
      <Modal
        size={size}
        isOpen={isOpenChangePassword}
        placement="top-center"
        onClose={onClose}
      >
        <form className="p-4 md:p-5" onSubmit={handleSubmitChangePassword}>
          <ModalContent>
            <ToastContainer />
            <ModalHeader className="flex flex-col gap-1">
              Change New Password
            </ModalHeader>
            <ModalBody>
              <div className="flex gap-5">
                <div className="flex-1" style={{ padding: 10 }}>
                  <div style={{ marginBottom: "20px" }}>
                    <Input
                      autoFocus
                      endContent={
                        <MdPassword
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                          size={30}
                        />
                      }
                      label="Old Password"
                      placeholder="Enter Old Password..."
                      variant="bordered"
                      type="password"
                      name="oldPassword"
                      onChange={handleInputChangePassword}
                      value={formData.oldPassword}
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <Input
                      autoFocus
                      endContent={
                        <MdPassword
                          className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                          size={30}
                        />
                      }
                      label="New Password"
                      placeholder="Enter New Password..."
                      type="password"
                      variant="bordered"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChangePassword}
                    />
                  </div>
                </div>
              </div>
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

export default ChangePasswordView;
