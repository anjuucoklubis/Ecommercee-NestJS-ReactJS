import React, { useEffect, useState } from "react";
import {
  Switch,
  Tabs,
  Tab,
  Card,
  CardBody,
  Button,
  useDisclosure,
  Badge,
} from "@nextui-org/react";
import { GetDataMyAccount } from "./ViewModel/GetDataMyAccount.ts";
import { User } from "./MyAccountInterface.ts";
import PartialView from "../../partial/PartialView.tsx";
import { DataAccountIcon } from "../../../../components/icons/DataAccountIcon.jsx";
import { DataPersonalIcon } from "../../../../components/icons/DataPersonalIcon.jsx";
import { DataAddressIcon } from "../../../../components/icons/DataAddressIcon.jsx";
import UserProfileCreateView from "./UserProfile/UserProfileCreateView.tsx";
import { ToastContainer } from "react-toastify";
import UserProfileUpdateView from "./UserProfile/UserProfileUpdateView.tsx";
import UserAddressCreateView from "./UserAddress/UserAddressCreateView.tsx";
import UserAddressUpdateView from "./UserAddress/UserAddressUpdateView.tsx";
import VMDeleteUserAddress from "./UserAddress/ViewModel/VMDeleteUserAddress.ts";
import ChangePasswordView from "../../../auth/changepassword/ChangePasswordView.tsx";

const MyAccountView = () => {
  const { fetchUserProfile, API_URL_USER_PROFILE_IMAGE } = GetDataMyAccount();
  const {
    handleConfirmDelete,
    handleDeleteAddress,
    handleCancelDelete,
    itemToDelete,
  } = VMDeleteUserAddress();
  const [isVertical, setIsVertical] = useState(false);
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenUpdateUserProfile, setIsOpenUpdateUserProfile] = useState(false);
  const [isOpenAddAddress, setIsOpenAddAddress] = useState(false);
  const [isOpenUpdateAddress, setIsOpenUpdateAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);

  const handleEditProfile = (id) => {
    setIsOpenUpdateUserProfile(true);
  };
  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setIsOpenUpdateAddress(true);
  };
  const closeModal = () => {
    setIsOpenUpdateUserProfile(false);
    setIsOpenAddAddress(false);
    setIsOpenUpdateAddress(false);
    setIsOpenChangePassword(false);
  };

  const handleAddress = () => {
    setIsOpenAddAddress(true);
  };

  const handleChangePassword = (id) => {
    setIsOpenChangePassword(true);
  };

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userProfile = await fetchUserProfile();
        setProfile(userProfile);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PartialView>
      <ToastContainer />
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
                              <td>{profile?.email || "-"}</td>
                            </tr>
                            <tr>
                              <th>createdAt</th>
                              <td>{profile?.createdAt || "-"}</td>
                            </tr>
                            <tr>
                              <th>updateAt</th>
                              <td>{profile?.updateAt || "-"}</td>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <Button color="warning" onPress={handleChangePassword}>
                        Change Password
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
                              <div id="grid-system2-body" className="box-body">
                                <table
                                  id="w0"
                                  className="table table-condensed detail-view"
                                >
                                  <tbody>
                                    <tr>
                                      <th>Firstname</th>
                                      <td>
                                        {profile?.userprofile?.firstname || "-"}
                                      </td>{" "}
                                    </tr>
                                    <tr>
                                      <th>lastname</th>
                                      <td>
                                        {profile?.userprofile?.lastname || "-"}
                                      </td>{" "}
                                    </tr>
                                    <tr>
                                      <th>Gender</th>
                                      <td>
                                        {profile?.userprofile?.gender || "-"}
                                      </td>{" "}
                                    </tr>
                                    <tr>
                                      <th>Birthday</th>
                                      <td>
                                        {profile?.userprofile?.birthday || "-"}
                                      </td>{" "}
                                    </tr>
                                    <tr>
                                      <th>telephone</th>
                                      <td>
                                        {profile?.userprofile?.telephone || "-"}
                                      </td>{" "}
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                          <div id="grid-system2" className="col-sm-3">
                            <div className="box box-solid">
                              <div id="grid-system2-body" className="box-body">
                                {profile?.userprofile ? (
                                  <img
                                    src={`${API_URL_USER_PROFILE_IMAGE}/${profile.userprofile.image}`}
                                    className="img-thumbnail"
                                    width="200"
                                    alt="Profile"
                                  />
                                ) : (
                                  <Badge
                                    content="Isi Profile kamu dong...."
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
                      <td>
                        {profile?.userprofile ? (
                          <Button onPress={handleEditProfile} color="warning">
                            Update Profile
                          </Button>
                        ) : (
                          <Button onPress={onOpen} color="success">
                            Add User Profile
                          </Button>
                        )}
                      </td>
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
                            {profile?.useraddress?.map((address) => (
                              <tr key={address.id}>
                                <td>
                                  <table>
                                    <tbody>
                                      <tr>
                                        <th style={{ paddingRight: "300px" }}>
                                          Full Name
                                        </th>
                                        <td>{address.full_name || "-"}</td>
                                      </tr>
                                      <tr>
                                        <th style={{ paddingRight: "300px" }}>
                                          Number Phone
                                        </th>
                                        <td>{address.number_phone || "-"}</td>
                                      </tr>
                                      <tr>
                                        <th style={{ paddingRight: "300px" }}>
                                          Province
                                        </th>
                                        <td>{address.province || "-"}</td>
                                      </tr>
                                      <tr>
                                        <th style={{ paddingRight: "300px" }}>
                                          City
                                        </th>
                                        <td>{address.city || "-"}</td>
                                      </tr>
                                      <tr>
                                        <th style={{ paddingRight: "300px" }}>
                                          Postal Code
                                        </th>
                                        <td>{address.postal_code || "-"}</td>
                                      </tr>

                                      <tr>
                                        <th style={{ paddingRight: "300px" }}>
                                          Address Line
                                        </th>
                                        <td>{address.address_line || "-"}</td>
                                      </tr>
                                      <tr>
                                        <th style={{ paddingRight: "300px" }}>
                                          House / Office
                                        </th>
                                        <td>{address.houseOroffice || "-"}</td>
                                      </tr>
                                      <tr>
                                        <td style={{ paddingTop: "10px" }}>
                                          <div>
                                            <Button
                                              color="warning"
                                              onPress={() =>
                                                handleEditAddress(address)
                                              }
                                            >
                                              Edit Address
                                            </Button>{" "}
                                            <Button
                                              color="danger"
                                              onClick={() =>
                                                handleDeleteAddress(address.id)
                                              }
                                            >
                                              Delete Address
                                            </Button>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <Button onPress={handleAddress} color="success">
                        Add Address
                      </Button>{" "}
                    </div>
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
      <UserProfileCreateView isOpen={isOpen} onClose={onClose} />
      <UserAddressCreateView
        isOpenAddAddress={isOpenAddAddress}
        onClose={closeModal}
      />
      <UserProfileUpdateView
        isOpenUpdateUserProfile={isOpenUpdateUserProfile}
        onClose={closeModal}
      />
      {selectedAddress && (
        <UserAddressUpdateView
          isOpenUpdateAddress={isOpenUpdateAddress}
          onClose={closeModal}
          addressData={selectedAddress}
        />
      )}
      <ChangePasswordView
        isOpenChangePassword={isOpenChangePassword}
        onClose={closeModal}
      />
      {itemToDelete && (
        <div
          id="popup-modal"
          className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
        >
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Konfirmasi Hapus</h3>
            <p className="mb-6">Apakah Anda yakin ingin menghapus item ini?</p>
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
    </PartialView>
  );
};

export default MyAccountView;
