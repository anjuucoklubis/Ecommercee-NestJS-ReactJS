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
import { MailIcon } from "../../../../components/icons/MailIcon.tsx";
import RoleViewModelGet from "./ViewModel/RoleViewModelGet.ts";

interface DetailRoleProps {
  roleId: string;
  onClose: () => void;
  isOpenDetailRole: boolean;
  size?: "5xl";
}

const DetailRoleView: React.FC<DetailRoleProps> = ({
  onClose,
  isOpenDetailRole,
  roleId,
  size = "5xl",
}) => {
  const { getRoleDetail, getRoleById } = RoleViewModelGet();

  useEffect(() => {
    if (roleId && !isNaN(parseInt(roleId, 10))) {
      getRoleById(parseInt(roleId, 10));
    } else {
      console.error("Invalid roleId:", roleId);
    }
  }, [roleId]);

  useEffect(() => {
    console.log("Updated getRoleDetail:", getRoleDetail);
  }, [getRoleDetail]);

  console.log("wkwkw", getRoleDetail?.role_name);

  return (
    <Modal
      size={size}
      isOpen={isOpenDetailRole}
      placement="top-center"
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Detail Role {getRoleDetail?.role_name}
        </ModalHeader>
        <ModalBody>
          <div className="flex-1">
            <div style={{ marginBottom: "30px" }}>
              <p style={{ marginBottom: "10px" }}>Role</p>

              <Input
                autoFocus
                // endContent={
                //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                // }
                label="Role Name"
                variant="bordered"
                type="text"
                value={getRoleDetail?.role_name || ""}
                isReadOnly
                disabled={true}
              />
              <Input
                autoFocus
                // endContent={
                //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                // }
                label="Role Description"
                variant="bordered"
                type="text"
                value={getRoleDetail?.role_description || ""}
                isReadOnly
                disabled={true}
              />
              <Input
                autoFocus
                // endContent={
                //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                // }
                label="Count Users"
                variant="bordered"
                type="text"
                value={getRoleDetail?.userCount ? getRoleDetail.userCount.toString() : "0"}
                isReadOnly
                disabled={true}
              />
            </div>
            <div>
              <p style={{ marginBottom: "10px" }}>Users Assign</p>
              <Table removeWrapper aria-label="Product Details Table">
                <TableHeader>
                  <TableColumn>Email User</TableColumn>
                </TableHeader>
                <TableBody>
                  {getRoleDetail?.users && getRoleDetail.users.length > 0 ? (
                    getRoleDetail.users.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell>{user.email}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={1}>No users found.</TableCell>
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

export default DetailRoleView;
