import React, { useEffect, useState } from "react";
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
import DiscountProductViewModelGet from "./ViewModel/DiscountProductViewModelGet.ts";
import DiscountProductViewModelDelete from "./ViewModel/DiscountProductViewModelDelete.ts";
import AddDiscountProductView from "./AddDiscountProductView.tsx";
import UpdateDiscountProductView from "./UpdateCategoryProductView.tsx";
import DateComponenttt from "../../../../components/date/date.ts";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "product_discount_name",
  "product_discount_description",
  "product_discount_percent",
  "product_discount_active",
  "actions",
];

export default function DiscountProductView() {
  const { formatDate } = DateComponenttt();
  const { discount, columns } = DiscountProductViewModelGet();
  const {
    handleConfirmDelete,
    handleCancelDelete,
    itemToDelete,
    setItemToDelete,
  } = DiscountProductViewModelDelete();

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
    column: "name",
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
    let filteredCategories = [...discount];

    if (hasSearchFilter) {
      filteredCategories = filteredCategories.filter((category) =>
        category.product_discount_name
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredCategories = filteredCategories.filter((category) =>
        Array.from(statusFilter).includes(category.id)
      );
    }

    return filteredCategories;
  }, [discount, filterValue, statusFilter]);

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

  const [isOpenUpdateDiscount, setIsOpenUpdateDiscount] = useState(false);
  const [discountIdToEdit, setUpdateIdToEdit] = useState(null);

  const handleEdit = (id) => {
    setUpdateIdToEdit(id);
    setIsOpenUpdateDiscount(true);
  };

  const closeModal = () => {
    setIsOpenUpdateDiscount(false);
    setUpdateIdToEdit(null);
  };

  const renderCell = React.useCallback(
    (discount, columnKey) => {
      const cellValue = discount[columnKey];

      switch (columnKey) {
        case "name":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "createdAt":
          return formatDate(cellValue || null) || "-";

        case "updatedAt":
          return cellValue && cellValue !== "1970-01-01T00:00:00.000Z"
            ? formatDate(cellValue)
            : "-";
        case "product_discount_active":
          return (
            <Chip
              className="capitalize"
              color={cellValue ? "success" : "danger"}
              size="sm"
              variant="flat"
            >
              {cellValue ? "Active" : "Inactive"}
            </Chip>
          );
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
                    if (key === "Edit") {
                      handleEdit(discount.id);
                    } else if (key === "Delete") {
                      setItemToDelete(discount.id);
                    }
                  }}
                >
                  <DropdownItem key="Edit" color="warning">
                    Edit
                  </DropdownItem>
                  <DropdownItem key="Delete" color="danger">
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
    [setItemToDelete]
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

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-2">
        <h1>Category Product</h1>
        <div className="flex justify-between gap-1 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-1">
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
            Total {discount.length} discount
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
    discount.length,
    onSearchChange,
    onClear,
    onRowsPerPageChange,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex w-full justify-between border-t border-default-100">
        <span className="text-default-400 text-small">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
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

  useEffect(() => {
    console.log("hahah", discount);
  }, [discount]);

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
        <TableBody emptyContent="No discount found" items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <UpdateDiscountProductView
        isOpenUpdateDiscount={isOpenUpdateDiscount}
        onClose={closeModal}
        discountId={discountIdToEdit || ""}
      />

      <AddDiscountProductView isOpen={isOpen} onClose={onClose} />

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
}
