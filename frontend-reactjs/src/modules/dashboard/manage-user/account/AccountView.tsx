import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  useDisclosure,
} from "@nextui-org/react";
import { statusOptions } from "../../../../datadummy/dataa.ts";
import { capitalize } from "../../../../utils/utils.ts";
import { PlusIcon } from "../../../../components/icons/PlusIcon.tsx";
import { VerticalDotsIcon } from "../../../../components/icons/VerticalDotsIcon.tsx";
import { ChevronDownIcon } from "../../../../components/icons/ChevronDownIcon.tsx";
import { SearchIcon } from "../../../../components/icons/SearchIcon.tsx";
import PartialView from "../../partial/PartialView.tsx";
import { ToastContainer } from "react-toastify";
import DateComponenttt from "../../../../components/date/date.ts";
import GetAccountViewModel from "./ViewModel/GetAccountViewModel.ts";
import DetailUserAccountAddressView from "./DetailUserAccountAddressView.tsx";
import DeleteAccountViewModel from "./ViewModel/DeleteAccountViewMode.ts";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "email",
  "UserRole.role_name",
  "createdAt",
  "updateAt",
  "actions",
];

export default function AccountView() {
  // ========================
  const { getAllUsers, columns } = GetAccountViewModel();
  const { formatDate } = DateComponenttt();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isOpenDetailUser, setIsOpenDetailUser] = useState(false);
  const [userIdToDetail, setUserIdToDetail] = useState(null);
  const handleView = (id) => {
    setUserIdToDetail(id);
    setIsOpenDetailUser(true);
  };

  // const [isOpenUpdateUser, setIsOpenUpdateUser] = useState(false);
  // const [userIdToUpdate, setUserIdToUpdate] = useState(null);
  // const handleEdit = (id) => {
  //   setUserIdToUpdate(id);
  //   setIsOpenUpdateUser(true);
  // };
  const closeModal = () => {
    setIsOpenDetailUser(false);
    setUserIdToDetail(null);
    // setIsOpenUpdateUser(false);
    // setUserIdToUpdate(null);
  };

  const { setUserId, handleCancelDelete, deleteUserAccount, userId } =
    DeleteAccountViewModel();
  // ========================

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...getAllUsers];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (getAllUsers) =>
          getAllUsers.email.toLowerCase().includes(filterValue.toLowerCase()) ||
          getAllUsers.UserRole.role_name
            .toLowerCase()
            .includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((getAllUsers) =>
        Array.from(statusFilter).includes(getAllUsers.email)
      );
    }

    return filteredUsers;
  }, [getAllUsers, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      if (sortDescriptor.column) {
        const first = a[sortDescriptor.column];
        const second = b[sortDescriptor.column];
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      }
      return 0;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (user, columnKey) => {
      const cellValue =
        columnKey === "UserRole.role_name"
          ? user.UserRole.role_name
          : user[columnKey];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: user.avatar }}
              description={user.email}
              name={cellValue}
            >
              {user.email}
            </User>
          );
        // case "user":
        //   return (
        //     <div className="flex flex-col">
        //       <p className="text-bold text-small capitalize">{cellValue}</p>
        //       <p className="text-bold text-tiny capitalize text-default-400">
        //         {user.team}
        //       </p>
        //     </div>
        //   );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[user.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "createdAt":
          return formatDate(cellValue || null) || "-";

        case "updateAt":
          return cellValue && cellValue !== "1970-01-01T00:00:00.000Z"
            ? formatDate(cellValue)
            : "-";
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Dynamic Actions"
                  onAction={(key) => {
                    if (key === "View") {
                      handleView(user.id);
                    } else if (key === "Delete") {
                      setUserId(user.id);
                    }
                  }}
                >
                  <DropdownItem
                    key="View"
                    color="success"
                    className="shadow-lg transform hover:scale-105 transition duration-500"
                  >
                    View
                  </DropdownItem>
                  <DropdownItem
                    key="Delete"
                    color="danger"
                    className="shadow-lg transform hover:scale-105 transition duration-500"
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    // [setItemToDelete]
    []
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <h1> Account Admin</h1>
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name or role..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {getAllUsers.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    getAllUsers.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <PartialView>
      <ToastContainer />
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DetailUserAccountAddressView
        isOpenDetailUser={isOpenDetailUser}
        onClose={closeModal}
        userId={userIdToDetail || ""}
      />
      {/* <UpdateUserView
        isOpenUpdateUser={isOpenUpdateUser}
        onClose={closeModal}
        userId={userIdToUpdate || ""}
      />
      <AddUserView isOpen={isOpen} onClose={onClose} /> */}

      {userId && (
        <div
          id="popup-modal"
          className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
        >
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Konfirmasi Hapus</h3>
            <p className="mb-6">Apakah Anda yakin ingin menghapus user ini?</p>
            <div className="flex" style={{ justifyContent: "space-between" }}>
              <button
                className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md mr-2 shadow-lg transform hover:scale-y-150 transition duration-500"
                onClick={deleteUserAccount}
              >
                Ya, saya yakin
              </button>
              <button
                className="text-gray-800 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md shadow-lg transform hover:scale-y-150 transition duration-500"
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
}
