// import React, { useEffect, useState } from "react";

// import {
//   Link,
//   Snippet,
//   Listbox,
//   ListboxItem,
//   ListboxSection,
//   Tabs,
//   Tab,
//   Card,
//   CardBody,
//   Switch,
//   Button,
// } from "@nextui-org/react";
// import { GetDataMyAccount } from "./ViewModel/GetDataMyAccount.ts";
// import useAuth from "../../../hooks/useAuth.ts";
// import { User } from "./MyAccountInterface.ts";
// import PartialView from "../partial/PartialView.tsx";
// import { DataAccountIcon } from "../../../components/icons/DataAccountIcon.jsx";
// import { DataPersonalIcon } from "../../../components/icons/DataPersonalIcon.jsx";
// import { DataAddressIcon } from "../../../components/icons/DataAddressIcon.jsx";

// const MyAccountView = () => {
//   const { fetchUserProfile } = GetDataMyAccount();
//   const [isVertical, setIsVertical] = useState(false);

//   const user = useAuth();
//   const [profile, setProfile] = useState<User | null>(null);

//   useEffect(() => {
//     const getUserProfile = async () => {
//       try {
//         const userProfile = await fetchUserProfile();
//         setProfile(userProfile);
//       } catch (error) {
//         console.error("Failed to fetch user profile:", error);
//       }
//     };

//     getUserProfile();
//   }, []);

//   return (
//     <PartialView>
//       <div style={{ margin: 30 }}>
//         <div className="flex flex-col px-4">
//           <Switch
//             className="mb-4"
//             isSelected={isVertical}
//             onValueChange={setIsVertical}
//           >
//             Vertical
//           </Switch>
//           <div className="flex w-full flex-col">
//             <Tabs
//               aria-label="Options"
//               color="primary"
//               variant="bordered"
//               isVertical={isVertical}
//             >
//               <Tab
//                 key="photos"
//                 title={
//                   <div className="flex items-center space-x-2">
//                     <DataAccountIcon />
//                     <span>Data Account</span>
//                   </div>
//                 }
//               >
//                 <Card>
//                   <CardBody>
//                     <div className="tab-content">
//                       <div className="tab-pane active" id="data_ortu">
//                         <table className="table table-condensed detail-view">
//                           <thead>
//                             <tr>
//                               <th>Email</th>
//                               <td>{profile?.email}</td>
//                             </tr>
//                             <tr>
//                               <th>createdAt</th>
//                               <td>{profile?.createdAt}</td>
//                             </tr>
//                             <tr>
//                               <th>updateAt</th>
//                               <td>{profile?.updateAt}</td>
//                             </tr>
//                           </thead>
//                         </table>
//                       </div>
//                       <Button color="warning">Change Password</Button>
//                     </div>
//                   </CardBody>
//                 </Card>
//               </Tab>
//               <Tab
//                 key="Data Personal"
//                 title={
//                   <div className="flex items-center space-x-2">
//                     <DataPersonalIcon />
//                     <span>Data Personal</span>
//                   </div>
//                 }
//               >
//                 <Card>
//                   <CardBody>
//                     <div className="tab-content">
//                       <div className="tab-pane active" id="data_personal">
//                         <div className="row">
//                           <div id="grid-system2" className="col-sm-8">
//                             <div className="box box-solid">
//                               <div id="grid-system2-body" className="box-body">
//                                 <table
//                                   id="w0"
//                                   className="table table-condensed detail-view"
//                                 >
//                                   <tbody>
//                                     <tr>
//                                       <th>Firstname</th>
//                                       <td>{profile?.userprofile.firstname}</td>
//                                     </tr>
//                                     <tr>
//                                       <th>lastname</th>
//                                       <td>{profile?.userprofile.lastname}</td>
//                                     </tr>
//                                     <tr>
//                                       <th>telephone</th>
//                                       <td>{profile?.userprofile.telephone}</td>
//                                     </tr>
//                                   </tbody>
//                                 </table>
//                               </div>
//                             </div>
//                           </div>
//                           {/* <div id="grid-system2" className="col-sm-3">
//                             <div className="box box-solid">
//                               <div id="grid-system2-body" className="box-body">
//                                 <img
//                                   src=""
//                                   className="img-thumbnail"
//                                   width="200"
//                                 />
//                               </div>
//                             </div>
//                           </div> */}
//                         </div>
//                       </div>
//                       <Button color="warning">Edit Data Personal</Button>
//                     </div>
//                   </CardBody>
//                 </Card>
//               </Tab>
//               <Tab
//                 key="Data Address"
//                 title={
//                   <div className="flex items-center space-x-2">
//                     <DataAddressIcon />
//                     <span>Data Address</span>
//                   </div>
//                 }
//               >
//                 <Card>
//                   <CardBody>
//                     <div className="tab-content">
//                       <div className="tab-pane active" id="data_address">
//                         <table className="table table-condensed detail-view">
//                           <tbody>
//                             {profile?.useraddress.map((address, index) => (
//                               <tr key={index}>
//                                 <td>
//                                   <table>
//                                     <tbody>
//                                       <tr>
//                                         <th
//                                           style={{
//                                             paddingRight: "300px",
//                                           }}
//                                         >
//                                           Address Line
//                                         </th>
//                                         <td>{address.address_line}</td>
//                                         {/* <td>
//                                           <Button color="warning">
//                                             Edit
//                                           </Button>

//                                           <Button color="danger">
//                                             Delete
//                                           </Button>
//                                         </td> */}
//                                       </tr>
//                                       <tr>
//                                         <th
//                                           style={{
//                                             paddingRight: "300px",
//                                           }}
//                                         >
//                                           Postal Code
//                                         </th>
//                                         <td>{address.postal_code}</td>
//                                       </tr>
//                                       <tr>
//                                         <th
//                                           style={{
//                                             paddingRight: "300px",
//                                           }}
//                                         >
//                                           City
//                                         </th>
//                                         <td>{address.city}</td>
//                                       </tr>
//                                       <tr>
//                                         <th
//                                           style={{
//                                             paddingRight: "300px",
//                                           }}
//                                         >
//                                           Province
//                                         </th>
//                                         <td>{address.province}</td>
//                                       </tr>
//                                       <tr>
//                                         <th
//                                           style={{
//                                             paddingRight: "300px",
//                                           }}
//                                         >
//                                           Country
//                                         </th>
//                                         <td>{address.country}</td>
//                                       </tr>
//                                       <tr>
//                                         <td style={{ paddingTop: "10px" }}>
//                                           <div>
//                                             <Button
//                                               color="warning"
//                                               // size="small"
//                                               // onClick={() => handleEdit(address)}
//                                             >
//                                               Edit
//                                             </Button>{" "}
//                                             <Button
//                                               color="danger"
//                                               // size="small"
//                                               // onClick={() =>
//                                               //   handleDelete(address.id)
//                                               // }
//                                             >
//                                               Delete
//                                             </Button>
//                                           </div>
//                                         </td>
//                                       </tr>
//                                     </tbody>
//                                   </table>
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </CardBody>
//                 </Card>
//               </Tab>
//             </Tabs>
//           </div>
//         </div>
//       </div>
//     </PartialView>
//   );
// };

// export default MyAccountView;

import React, { useEffect, useState } from "react";
import { Switch, Tabs, Tab, Card, CardBody, Button } from "@nextui-org/react";
import { GetDataMyAccount } from "./ViewModel/GetDataMyAccount.ts";
import useAuth from "../../../../hooks/useAuth.ts";
import { User } from "./MyAccountInterface.ts";
import PartialView from "../../partial/PartialView.tsx";
import { DataAccountIcon } from "../../../../components/icons/DataAccountIcon.jsx";
import { DataPersonalIcon } from "../../../../components/icons/DataPersonalIcon.jsx";
import { DataAddressIcon } from "../../../../components/icons/DataAddressIcon.jsx";

const MyAccountView = () => {
  const { fetchUserProfile } = GetDataMyAccount();
  const [isVertical, setIsVertical] = useState(false);
  const user = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
                key="Data Personal"
                title={
                  <div className="flex items-center space-x-2">
                    <DataPersonalIcon />
                    <span>Data Personal</span>
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
                                      {/* Gunakan optional chaining untuk menghindari error jika userprofile null */}
                                    </tr>
                                    <tr>
                                      <th>lastname</th>
                                      <td>
                                        {profile?.userprofile?.lastname || "-"}
                                      </td>{" "}
                                      {/* Gunakan optional chaining untuk menghindari error jika userprofile null */}
                                    </tr>
                                    <tr>
                                      <th>telephone</th>
                                      <td>
                                        {profile?.userprofile?.telephone || "-"}
                                      </td>{" "}
                                      {/* Gunakan optional chaining untuk menghindari error jika userprofile null */}
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button color="warning">Edit Data Personal</Button>
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
    </PartialView>
  );
};

export default MyAccountView;
