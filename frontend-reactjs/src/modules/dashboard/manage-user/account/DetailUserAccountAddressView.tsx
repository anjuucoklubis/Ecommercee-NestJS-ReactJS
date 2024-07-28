import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  Switch,
  Tabs,
  Tab,
  Card,
  CardBody,
  Button,
  Badge,
  useDisclosure,
} from "@nextui-org/react";
import API_FRONTEND from "../../../../api/api.ts";
import DateComponenttt from "../../../../components/date/date.ts";
import GetAccountViewModel from "./ViewModel/GetAccountViewModel.ts";
import { DataAccountIcon } from "../../../../components/icons/DataAccountIcon.jsx";
import { DataPersonalIcon } from "../../../../components/icons/DataPersonalIcon.jsx";
import { DataAddressIcon } from "../../../../components/icons/DataAddressIcon.jsx";
import ResetPasswordViewModel from "./ViewModel/ResetPasswordViewModel.ts";

interface DetailUserAccountAddressViewProps {
  userId: string;
  onClose: () => void;
  isOpenDetailUser: boolean;
  size?: "5xl";
}

const DetailUserAccountAddressView: React.FC<
  DetailUserAccountAddressViewProps
> = ({ onClose, isOpenDetailUser, userId, size = "5xl" }) => {
  const { getUserByID, getuserDetail } = GetAccountViewModel();
  const {
    handleConfirmResetPassword,
    handleCancelResetPassword,
    setUserId,
  } = ResetPasswordViewModel();
  const { API_URL_USER_PROFILE_IMAGE } = API_FRONTEND();
  const { formatDate } = DateComponenttt();
  const [isVertical, setIsVertical] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (userId) {
      getUserByID(userId).then(() => {
        console.log("Data user:", getuserDetail);
        if (getuserDetail?.id) {
          setUserId(getuserDetail.id);
        }
      });
    }
  }, [userId]);

  const openResetPasswordModal = () => {
    if (getuserDetail?.id) {
      setUserId(getuserDetail.id);
      onOpen();
    } else {
      console.error("User ID is not available to open the modal");
    }
  };

  return (
    <>
      <Modal
        size={size}
        isOpen={isOpenDetailUser}
        placement="top-center"
        onClose={onClose}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Detail User Data
          </ModalHeader>
          <ModalBody>
            <div style={{ margin: 30 }}>
              <div className="flex flex-col px-4">
                <Switch
                  className="mb-4"
                  isSelected={isVertical}
                  onValueChange={setIsVertical}
                >
                  Vertical
                </Switch>
                <div className="flex w-full flex-col">
                  <Tabs
                    aria-label="Options"
                    color="primary"
                    variant="bordered"
                    isVertical={isVertical}
                  >
                    <Tab
                      key="photos"
                      title={
                        <div className="flex items-center space-x-2">
                          <DataAccountIcon />
                          <span>Data Account</span>
                        </div>
                      }
                    >
                      <Card>
                        <CardBody>
                          <div className="tab-content">
                            <div className="tab-pane active" id="data_ortu">
                              <table className="table table-condensed detail-view">
                                <thead>
                                  <tr>
                                    <th>Email</th>
                                    <td>{getuserDetail?.email || "-"}</td>
                                  </tr>
                                  <tr>
                                    <th>Akun di buat pada</th>
                                    <td>
                                      {getuserDetail?.createdAt
                                        ? formatDate(getuserDetail.createdAt)
                                        : "-"}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Akun di update pada</th>
                                    <td>
                                      {getuserDetail?.updateAt
                                        ? formatDate(getuserDetail.updateAt)
                                        : "-"}
                                    </td>
                                  </tr>
                                </thead>
                              </table>
                            </div>
                            <Button onClick={openResetPasswordModal}>
                              Reset Password
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </Tab>
                    <Tab
                      key="Data Profile"
                      title={
                        <div className="flex items-center space-x-2">
                          <DataPersonalIcon />
                          <span>Data Profile</span>
                        </div>
                      }
                    >
                      <Card>
                        <CardBody>
                          <div className="tab-content">
                            <div className="tab-pane active" id="data_personal">
                              <div className="row">
                                <div id="grid-system2" className="col-sm-8">
                                  <div className="box box-solid">
                                    <div
                                      id="grid-system2-body"
                                      className="box-body"
                                    >
                                      <table
                                        id="w0"
                                        className="table table-condensed detail-view"
                                      >
                                        <tbody>
                                          <tr>
                                            <th>Firstname</th>
                                            <td>
                                              {getuserDetail?.userprofile
                                                ?.firstname || "-"}
                                            </td>{" "}
                                          </tr>
                                          <tr>
                                            <th>lastname</th>
                                            <td>
                                              {getuserDetail?.userprofile
                                                ?.lastname || "-"}
                                            </td>{" "}
                                          </tr>
                                          <tr>
                                            <th>Gender</th>
                                            <td>
                                              {getuserDetail?.userprofile
                                                ?.gender || "-"}
                                            </td>{" "}
                                          </tr>
                                          <tr>
                                            <th>Birthday</th>
                                            <td>
                                              {getuserDetail?.userprofile
                                                ?.birthday || "-"}
                                            </td>{" "}
                                          </tr>
                                          <tr>
                                            <th>telephone</th>
                                            <td>
                                              {getuserDetail?.userprofile
                                                ?.telephone || "-"}
                                            </td>{" "}
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div id="grid-system2" className="col-sm-3">
                                  <div className="box box-solid">
                                    <div
                                      id="grid-system2-body"
                                      className="box-body"
                                    >
                                      {getuserDetail?.userprofile ? (
                                        <img
                                          src={`${API_URL_USER_PROFILE_IMAGE}/${getuserDetail.userprofile.image}`}
                                          className="img-thumbnail"
                                          width="200"
                                          alt="Profile"
                                        />
                                      ) : (
                                        <Badge
                                          content="Image Profile Not yet...."
                                          color="danger"
                                          size="lg"
                                        >
                                          <img
                                            src="https://media.istockphoto.com/id/1294780139/id/foto/potret-close-up-pria-tersenyum-dengan-kacamata-dengan-kemeja-biru-ilustrasi-3d-karakter.jpg?s=612x612&w=0&k=20&c=FxcfijJ5ROSDDqu7hT6E8JE9utPq1_0wrVhThXqymb0="
                                            className="img-thumbnail"
                                            width="200"
                                            alt="Null"
                                          />
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Tab>
                    <Tab
                      key="Data Address"
                      title={
                        <div className="flex items-center space-x-2">
                          <DataAddressIcon />
                          <span>Data Address</span>
                        </div>
                      }
                    >
                      <Card>
                        <CardBody>
                          <div className="tab-content">
                            <div className="tab-pane active" id="data_address">
                              <table className="table table-condensed detail-view">
                                <tbody>
                                  {getuserDetail?.useraddress?.map(
                                    (address) => (
                                      <tr key={address.id}>
                                        <td>
                                          <table>
                                            <tbody>
                                              <tr>
                                                <th
                                                  style={{
                                                    paddingRight: "300px",
                                                  }}
                                                >
                                                  Full Name
                                                </th>
                                                <td>
                                                  {address.full_name || "-"}
                                                </td>
                                              </tr>
                                              <tr>
                                                <th
                                                  style={{
                                                    paddingRight: "300px",
                                                  }}
                                                >
                                                  Number Phone
                                                </th>
                                                <td>
                                                  {address.number_phone || "-"}
                                                </td>
                                              </tr>
                                              <tr>
                                                <th
                                                  style={{
                                                    paddingRight: "300px",
                                                  }}
                                                >
                                                  Province
                                                </th>
                                                <td>
                                                  {address.province || "-"}
                                                </td>
                                              </tr>
                                              <tr>
                                                <th
                                                  style={{
                                                    paddingRight: "300px",
                                                  }}
                                                >
                                                  City
                                                </th>
                                                <td>{address.city || "-"}</td>
                                              </tr>
                                              <tr>
                                                <th
                                                  style={{
                                                    paddingRight: "300px",
                                                  }}
                                                >
                                                  Postal Code
                                                </th>
                                                <td>
                                                  {address.postal_code || "-"}
                                                </td>
                                              </tr>

                                              <tr>
                                                <th
                                                  style={{
                                                    paddingRight: "300px",
                                                  }}
                                                >
                                                  Address Line
                                                </th>
                                                <td>
                                                  {address.address_line || "-"}
                                                </td>
                                              </tr>
                                              <tr>
                                                <th
                                                  style={{
                                                    paddingRight: "300px",
                                                  }}
                                                >
                                                  House / Office
                                                </th>
                                                <td>
                                                  {address.houseOroffice || "-"}
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Tab>
                  </Tabs>
                </div>
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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Konfirmasi</ModalHeader>
          <ModalBody>
            Apakah Anda yakin ingin mereset password pengguna ini?
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCancelResetPassword}>Tidak</Button>
            <Button color="danger" onClick={handleConfirmResetPassword}>
              Ya
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DetailUserAccountAddressView;
