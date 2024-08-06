import React, { useEffect, useState } from "react";
import {
  Modal,
  Input,
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  DatePicker,
  RadioGroup,
  Radio,
} from "@nextui-org/react";

import { PiUserPlusLight } from "react-icons/pi";
import { BsGenderAmbiguous } from "react-icons/bs";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import VMUpdateUserProfile from "./ViewModel/VMUpdateUserProfile.ts";
import { GetDataMyAccount } from "../ViewModel/GetDataMyAccount.ts";
import ImageBase64 from "../../../../../utils/imageBase64.ts";

interface UpdateUserProfileViewProps {
  isOpenUpdateUserProfile: boolean;
  onClose: () => void;
  size?: "5xl";
}

const UserProfileUpdateView: React.FC<UpdateUserProfileViewProps> = ({
  isOpenUpdateUserProfile,
  onClose,
  size = "5xl",
}) => {
  const {
    handleSubmitUpdateUserProfile,
    handleInputChange,
    formData,
    handlePhoneChange,
    handleImageChange,
    setFormData,
    handleGenderChange,
  } = VMUpdateUserProfile({ onClose });

  const { fetchUserProfile } = GetDataMyAccount();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userProfile = await fetchUserProfile();
        setFormData({
          firstname: userProfile.userprofile.firstname || "",
          lastname: userProfile.userprofile.lastname || "",
          gender: userProfile.userprofile.gender || "",
          birthday: userProfile.userprofile.birthday || null,
          telephone: userProfile.userprofile.telephone || "",
          image: userProfile.userprofile.image || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  const { DisplayBase64 } = ImageBase64();

  if (loading) {
    // return <div>Loading...</div>;
    return;
  }
  return (
    <div>
      <Modal
        size={size}
        isOpen={isOpenUpdateUserProfile}
        placement="top-center"
        onClose={onClose}
      >
        <form className="p-4 md:p-5" onSubmit={handleSubmitUpdateUserProfile}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Update User Profile
            </ModalHeader>

            <ModalBody>
              <div className="flex gap-5">
                <div className="flex-1" style={{ padding: 10 }}>
                  <div style={{ marginBottom: "20px" }}>
                    <Input
                      autoFocus
                      endContent={
                        <PiUserPlusLight className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="First Name"
                      placeholder="Enter name..."
                      variant="bordered"
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <Input
                      endContent={
                        <PiUserPlusLight className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Last Name"
                      placeholder="Enter Lastname"
                      type="text"
                      variant="bordered"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <RadioGroup
                      orientation="horizontal"
                      label="Gender"
                      name="gender"
                      onChange={(event) =>
                        handleGenderChange(event.target.value)
                      }
                      value={formData.gender}
                      // onChange={(event) =>
                      //   setFormData({ ...formData, gender: event.target.value })
                      // }

                      style={{
                        border: "2px solid #ccc",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      <Radio value="male">Man</Radio>
                      <Radio value="female">Female</Radio>
                      <BsGenderAmbiguous
                        size={25}
                        style={{
                          justifyContent: "flex-end",
                          marginLeft: 230,
                          marginBottom: 20,
                        }}
                      />
                    </RadioGroup>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <div
                      className="flex w-full flex-wrap md:flex-nowrap gap-4"
                      style={{
                        border: "2px solid #ccc",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      <DatePicker
                        label="Birth date"
                        className="max-w-[284px]"
                        isRequired
                        // value={formData.birthday}
                        onChange={(date) =>
                          setFormData({ ...formData, birthday: date })
                        }
                      />
                      <LiaBirthdayCakeSolid
                        size={25}
                        style={{
                          justifyContent: "flex-end",
                          marginLeft: 90,
                          marginTop: 20,
                          bottom: 10,
                        }}
                      />
                      <p>
                        {" "}
                        {"Tanggal saat ini: "}
                        {formData.birthday
                          ? formData.birthday.toString()
                          : "Belum ada tanggal yang dipilih"}
                      </p>
                    </div>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <PhoneInput
                      international={false}
                      defaultCountry="ID"
                      placeholder="Enter phone number"
                      value={formData.telephone}
                      onChange={handlePhoneChange}
                      className="custom-phone-input"
                      variant="bordered"
                      style={{
                        border: "2px solid #ccc",
                        borderRadius: "10px",
                        padding: "18px",
                      }}
                      limitMaxLength={true}
                      maxLength={15}
                    />
                  </div>
                </div>
                <div className="col-span-2 flex-1">
                  <label
                    htmlFor="dropzone-file"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Gambar
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center mb-1">
                        <svg
                          className="w-8 h-8 mb-0 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-0 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">
                            Klik untuk mengunggah{" "}
                          </span>
                          atau seret dan lepas
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleImageChange}
                        // value={`${API_URL_USER_PROFILE_IMAGE}/${formData.image}`}
                      />
                    </label>
                  </div>
                  <div className="flex flex-row justify-between items-start w-full">
                    {formData.image && typeof formData.image === "string" && (
                      <div className="flex flex-col items-start">
                        <label
                          htmlFor="currentImage"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Gambar saat ini
                        </label>
                        <img
                          src={DisplayBase64(formData.image)}
                          alt="Current"
                          className="max-w-full h-auto max-h-20 rounded-lg"
                        />
                      </div>
                    )}
                    {/* <div id="grid-system2" className="col-sm-3">
                    <div className="box box-solid">
                      <div id="grid-system2-body" className="box-body">
                       
                          <img
                            src={`${API_URL_USER_PROFILE_IMAGE}/${formData.image}`}
                            className="img-thumbnail"
                            width="200"
                            alt="Profile"
                          />
                      
                      </div>
                    </div>
                  </div> */}

                    {formData.image && typeof formData.image !== "string" && (
                      <div className="col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Preview
                        </label>
                        <img
                          src={DisplayBase64(formData.image)}
                          alt="Preview"
                          className="max-w-full h-auto max-h-24 rounded-lg"
                        />
                      </div>
                    )}
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

export default UserProfileUpdateView;
