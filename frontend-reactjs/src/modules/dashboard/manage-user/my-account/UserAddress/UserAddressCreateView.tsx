import React from "react";
import {
  Modal,
  Input,
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  RadioGroup,
  Radio,
} from "@nextui-org/react";

import VMCreateUserAddress from "./ViewModel/VMCreateUserAddress.ts";
import PhoneInput from "react-phone-number-input";
import { PiUserPlusLight } from "react-icons/pi";
import { FaRegAddressCard } from "react-icons/fa6";
import { PiHouseLineLight } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { TiDocumentText } from "react-icons/ti";

interface AddUserAddressViewProps {
  isOpenAddAddress: boolean;
  onClose: () => void;
  size?: "5xl";
}

const UserAddressCreateView: React.FC<AddUserAddressViewProps> = ({
  isOpenAddAddress,
  onClose,
  size = "5xl",
}) => {
  const {
    handleSubmitCreateUserAddress,
    handleInputChange,
    formData,
    handleCityChange,
    provinces,
    cities,
    selectedProvince,
    handleProvinceChange,
    handlePhoneChange,
    setFormData,
  } = VMCreateUserAddress({ onClose });

  return (
    <div>
      <Modal
        size={size}
        isOpen={isOpenAddAddress}
        placement="top-center"
        onClose={onClose}
      >
        <form className="p-4 md:p-5" onSubmit={handleSubmitCreateUserAddress}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Add User Address
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
                      label="Full Name"
                      placeholder="Enter Full Name.."
                      variant="bordered"
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <Input
                      autoFocus
                      endContent={
                        <FaRegAddressCard className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Address Line"
                      placeholder="Enter Address Line..."
                      variant="bordered"
                      type="text"
                      name="address_line"
                      value={formData.address_line}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <PhoneInput
                      international={false}
                      defaultCountry="ID"
                      placeholder="Enter phone number"
                      value={formData.number_phone}
                      onChange={handlePhoneChange}
                      className="custom-phone-input"
                      variant="bordered"
                      style={{
                        border: "2px solid #ccc",
                        borderRadius: "10px",
                        padding: "13px",
                      }}
                      limitMaxLength={true}
                      maxLength={15}
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <RadioGroup
                      orientation="horizontal"
                      label="House / Office"
                      name="houseOroffice"
                      value={formData.houseOroffice}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          houseOroffice: event.target.value,
                        });
                      }}
                      style={{
                        border: "2px solid #ccc",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      <Radio value="house">House</Radio>
                      <Radio value="office">Office</Radio>
                      <PiHouseLineLight
                        size={25}
                        style={{
                          justifyContent: "flex-end",
                          marginLeft: 230,
                          marginBottom: 20,
                        }}
                      />
                    </RadioGroup>
                  </div>
                </div>

                <div className="col-span-2 flex-1">
                  <div style={{ marginBottom: "20px" }}>
                    <div
                      className="col-span-2"
                      style={{
                        border: "2px solid #ccc",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      <div
                        style={{
                          justifyContent: "space-between",
                        }}
                        className="flex"
                      >
                        <label
                          htmlFor="province"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Province
                        </label>
                        <div>
                          <SlLocationPin size={20} />
                        </div>
                      </div>
                      <select
                        className="text-black bg-gray-50 border border-gray-300 w-full p-2.5 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        name="province"
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                      >
                        <option className="text-black" value="">
                          Select Province
                        </option>
                        {provinces.map((province) => (
                          <option
                            key={province.id}
                            value={province.id}
                            className="text-black"
                          >
                            {province.province}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <div
                      className="col-span-2"
                      style={{
                        border: "2px solid #ccc",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      <div
                        style={{
                          justifyContent: "space-between",
                        }}
                        className="flex"
                      >
                        <label
                          htmlFor="city"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          City
                        </label>
                        <div>
                          <SlLocationPin size={20} />
                        </div>
                      </div>
                      <select
                        className="text-black bg-gray-50 border border-gray-300 w-full p-2.5 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        name="city"
                        value={formData.city}
                        onChange={handleCityChange}
                      >
                        <option className="text-black" value="">
                          {!formData.province ? "Selected City" : formData.city}
                        </option>
                        {cities.map((city) => (
                          <option
                            key={city.id}
                            value={city.id}
                            className="text-black"
                          >
                            {city.city_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <Input
                      disabled={true}
                      endContent={
                        <TiDocumentText className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Postal Code"
                      type="text"
                      variant="bordered"
                      name="postal_code"
                      value={formData.postal_code}
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

export default UserAddressCreateView;
