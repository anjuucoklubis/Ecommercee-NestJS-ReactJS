import React, { useEffect, useState } from "react";
import {
  Switch,
  Tabs,
  Tab,
  Card,
  CardBody,
  Button,
  useDisclosure,
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

const MyAccountView = () => {
  const { fetchUserProfile } = GetDataMyAccount();
  const [isVertical, setIsVertical] = useState(false);
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenUpdateDiscount, setIsOpenUpdateDiscount] = useState(false);
  const handleEdit = (id) => {
    setIsOpenUpdateDiscount(true);
  };
  const closeModal = () => {
    setIsOpenUpdateDiscount(false);
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
                      <Button color="warning">Change Password</Button>
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
                        </div>
                      </div>
                      <td>
                        {profile?.userprofile ? (
                          <Button onPress={handleEdit} color="warning">Update Profile</Button>
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
                            {profile?.useraddress.map((address, index) => (
                              <tr key={index}>
                                <td>
                                  <table>
                                    <tbody>
                                      <tr>
                                        <th style={{ paddingRight: "300px" }}>
                                          Address Line
                                        </th>
                                        <td>{address.address_line || "-"}</td>
                                      </tr>
                                      <tr>
                                        <th style={{ paddingRight: "300px" }}>
                                          Postal Code
                                        </th>
                                        <td>{address.postal_code || "-"}</td>
                                      </tr>
                                      <tr>
                                        <th style={{ paddingRight: "300px" }}>
                                          City
                                        </th>
                                        <td>{address.city || "-"}</td>
                                      </tr>
                                      <tr>
                                        <th style={{ paddingRight: "300px" }}>
                                          Province
                                        </th>
                                        <td>{address.province || "-"}</td>
                                      </tr>
                                      <tr>
                                        <th style={{ paddingRight: "300px" }}>
                                          Country
                                        </th>
                                        <td>{address.country || "-"}</td>
                                      </tr>
                                      <tr>
                                        <td style={{ paddingTop: "10px" }}>
                                          <div>
                                            <Button color="warning">
                                              Edit
                                            </Button>{" "}
                                            <Button color="danger">
                                              Delete
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
                      <Button color="success">Add Address</Button>{" "}
                    </div>
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
      <UserProfileCreateView isOpen={isOpen} onClose={onClose} />
      <UserProfileUpdateView
        isOpenUpdateDiscount={isOpenUpdateDiscount}
        onClose={closeModal}
      />
    </PartialView>
  );
};

export default MyAccountView;
