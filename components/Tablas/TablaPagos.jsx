'use client'
import React, { useState } from "react";
import {MagnifyingGlassIcon,ChevronDownIcon,PlusIcon,EllipsisVerticalIcon} from '@heroicons/react/24/outline'; //estos son iconos atraidos desde Tailwind

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
//   Chip,
//   User,
  Pagination,
  DropdownSection,
} from "@nextui-org/react";

//import {columns, users, statusOptions} from "./_data";
//import {capitalize} from "./_utils";
import { columns, users, statusOptions, columnsTable} from "./_data/_data";
import { capitalize } from "./_data/_utils";
import { columnsPagos} from "./dataPagos/data";
import Form from "../borrarForm/Form";
import FormikPayments from "../formik/formikPagos/FormikPayments";

// const statusColorMap = {
//   active: "success",
//   paused: "danger",
//   vacation: "warning",
// };

//const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];
const INITIAL_VISIBLE_COLUMNS_PAGOS = ["id","fechapago","salariobase","horasextras","totalhorasextras","descuentos","id_usuario","acciones"];

export function TablaPagos({dataPagos}) {
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState(INITIAL_VISIBLE_COLUMNS_PAGOS);
    const [statusFilter, setStatusFilter] = useState("all");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "age",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);
    console.log(selectedKeys)

    const hasSearchFilter = Boolean(filterValue);
    const [stateButtonAll, setStateButtonAll] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const toggleForm =  React.useCallback(()=>{
        setShowForm(!showForm);
    },[showForm]);
    

    //TODO: funcionalidad de eliminar todos los items seleccionados Pendiente
    const BotonEliminarSeleccionados =  React.useCallback(()=>{
        if(selectedKeys === "all"){
            console.log("eliminar todo los filas con ALL");
        }else{
            const valuesArray = Array.from(selectedKeys)
            console.log('eliminar todos los filas ALLSeleccionandos: ', valuesArray)
        }
       //return null;
    }, [selectedKeys]);

    const headerColumns = React.useMemo(() => {
       // console.log(visibleColumns);
        if (visibleColumns.includes('all')) {
            // setVisibleColumns(["id", "name","age", "role","team","email", "status", "actions","all"]);
            return columnsPagos
        };
        const filterColumns = columnsPagos.filter((columnPago) =>{return visibleColumns.includes(columnPago.uid)});
        //console.log(filterColumns)
        return filterColumns;
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...dataPagos];
        //console.log(hasSearchFilter)
        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
            console.log(filterValue)
        }

        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.status),
            );
            console.log(filteredUsers)
        }
        console.log(filteredUsers.length)

        return filteredUsers;
    }, [ filterValue, statusFilter,hasSearchFilter,dataPagos]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const resultado = filteredItems.slice(start, end);
        console.log(resultado)

        return resultado;
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        const list = [...items]
        //console.log(list)
        const ordenar = [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
        console.log(ordenar)
        return ordenar
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((pagoData, columnKey) => {
        //console.log(pagoData)
        //console.log(columnKey)
        const cellValue = pagoData[columnKey];
        //console.log(cellValue)

        switch (columnKey) {
                case"id":
                    return (
                        <div className="text-justify">
                            <p className="text-bold text-small capitalize">{cellValue}</p>
                        </div>
                    );
                case "fechapago":
                    const dateFechaPago = new Date(cellValue);
                    const formattedDateFechaPago = dateFechaPago.toISOString().split('T')[0];
                    return (
                        <div>
                            <p className="text-bold text-small capitalize ">{formattedDateFechaPago}</p>
                        </div>
                    );
            case "salariobase":
                return (
                    <div>
                        <p className="text-bold text-small capitalize">Q {cellValue}</p>
                    </div>
                );
            case "descuentos":
                return (
                    <div>
                        <p className="text-bold text-small capitalize">Q {cellValue}</p>
                    </div>
                );
            case "salarioneto":
                return (
                    <div>
                        <p className="text-bold text-small capitalize">Q {cellValue}</p>
                    </div>
                );
            case "id_usuario":
                return (
                    <div className="text-justify">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                    </div>
                );
            case "createdat":
                const dateCreatedat = new Date(cellValue);
                const formattedDateCreatedat = dateCreatedat.toISOString().split('T')[0];
                return (
                    <div>
                        <p className="text-bold text-small capitalize ">{formattedDateCreatedat}</p>
                    </div>
                );
            case "updatedat":
                const dateUpdatedat = new Date(cellValue);
                const formattedDateUpdatedat = dateUpdatedat.toISOString().split('T')[0];
                return (
                    <div>
                        <p className="text-bold text-small capitalize ">{formattedDateUpdatedat}</p>
                    </div>
                );
            case "acciones":
                return (
                <div className="relative flex justify-center items-center gap-2 ">
                    <Dropdown>
                    <DropdownTrigger >
                        <Button isIconOnly size="sm" variant="light">
                        <EllipsisVerticalIcon className="text-default-300 w-6" />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu className="text-black dark:text-white">
                        <DropdownItem>View</DropdownItem>
                        <DropdownItem>Edit</DropdownItem>
                        <DropdownItem>Delete</DropdownItem>
                    </DropdownMenu>
                    </Dropdown>
                </div>
                );
            default:
            return cellValue;
        }
    }, []);

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

    const onClear = React.useCallback(()=>{
        setFilterValue("")
        setPage(1)
    },[])

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%] text-black dark:text-white"
                        placeholder="Search by name..."
                        startContent={<MagnifyingGlassIcon className="w-6 "/>}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex ">
                                <Button endContent={<ChevronDownIcon className="text-small w-5" />} variant="flat">
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
                                    <DropdownItem key={status.uid} className="capitalize text-black">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}

                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small w-5" />} variant="flat">
                                Columnas
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                            //disabledKeys={stateButtonAll ? ['id', 'name','age', 'role','team','email', 'status', 'actions'] : null}
                            disallowEmptySelection
                            aria-label="Table Columns"
                            closeOnSelect={false}
                            selectedKeys={visibleColumns}
                            selectionMode="multiple"
                            onSelectionChange={(state)=>{
                                const valuesArray = Array.from(state)
                                //console.log(valuesArray)
                                setVisibleColumns(valuesArray);
                            }}
                            >
                                <DropdownSection  title="Por Columnas" showDivider className="h-52 overflow-y-auto">
                                    {columnsPagos.map((column) => (
                                        <DropdownItem isDisabled={stateButtonAll} key={column.uid} className="capitalize text-black">
                                            {capitalize(column.name)}
                                        </DropdownItem>
                                    ))}
                                </DropdownSection>
                                <DropdownItem
                                    key="all"
                                    className="text-success"
                                    color="success"
                                    description="Mostrar Todas las Columnas"
                                    onClick={()=>{
                                        if(stateButtonAll){
                                            //console.log('mostrar menos')
                                            setVisibleColumns(INITIAL_VISIBLE_COLUMNS_PAGOS)
                                            setStateButtonAll((s)=>!s)
                                        }else{
                                            //console.log('mostrar todos')
                                            const listaTemporal = ["all"];
                                            columnsPagos.forEach(column => {
                                                listaTemporal.push(column.uid)
                                            });
                                            setVisibleColumns(listaTemporal)
                                            setStateButtonAll((s)=>!s)
                                        }
                                    }}
                                    >
                                    {stateButtonAll ? 'Mostrar Menos' : 'Mostrar Todos'}
                                </DropdownItem>

                            </DropdownMenu>
                        </Dropdown>
                        <Button color="primary" endContent={<PlusIcon className="text-small w-5"/>} onClick={toggleForm}>
                            Añadir nuevo pago
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <div>
                            <span className="text-default-400 text-small">Total: {dataPagos.length} Pagos</span>
                        </div>
                        {selectedKeys === "all" || filteredItems.length === selectedKeys.size
                            ? (<Button onClick={()=>BotonEliminarSeleccionados()}>Eliminar Todo</Button>)
                            : null}
                        </div>
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
        onRowsPerPageChange,
        stateButtonAll,
        onSearchChange,
        onClear,
        dataPagos,
        selectedKeys,
        filteredItems.length,
        BotonEliminarSeleccionados,
        
        toggleForm,
        
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
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys,  page, pages,onNextPage,onPreviousPage,filteredItems.length]);

    return (
        <div>
            <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{wrapper: "max-h-[600px] text-black dark:text-white",}}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={(keyRow)=>{
            setSelectedKeys(keyRow)
        }} //valores que seleccionan dentro de la tabla
        onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>

                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={"center"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No users found"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
        {showForm && <FormikPayments toggleForm={toggleForm}></FormikPayments>}
        </div>
    );
}

export default TablaPagos;