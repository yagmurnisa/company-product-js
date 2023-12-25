import React, { Fragment, useEffect, useState } from "react";
import { Table, Button, Modal, Input, Alert } from "antd";
import { addProductService, getProducts, deleteProductService, editProductService } from "../service";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const Products = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [modalError, setModalError]= useState(null);
    const [newProduct, setNewProduct] = useState({name: "", category:"", amount:"", unit:"", companyNumber:""});
    const [editedProduct, setEditedProduct] = useState(null);
    const [editing, setEditing] = useState(false); //for opening modal
    const [adding, setAdding] = useState(false); //for opening modal

    useEffect(()=> {
        const fetchData = async () => {
          let data = await getProducts();
          console.log(data);
          if (data?.error) {
            setError(data.error);
          }
          else if (data) {
            setProducts(data);
          }
        };
        fetchData();
    },[]);

    const addProduct = async () => {
        if (newProduct.name.trim() === '' || newProduct.category.trim() === '' ||
        newProduct.amount.trim() === ''|| newProduct.unit.trim() === '' || newProduct.companyNumber.trim() === '' ) {
            setModalError("fields can not be empty");
        }
        else {
            let data = await addProductService(newProduct);
            console.log(data);
            if (data?.error){
                setModalError(data.error);
            }
            else if (data) {
                setProducts([{...data}, ...products]);
                resetAdding();
            }
        }
    };

    const deleteProduct = async (record) => {
        let data = await deleteProductService(record._id);
        if (data?.error) {
            setError(data.error);
        }
        else if (data) {
            setProducts(products.filter((product) => product._id !== data));
        }
    };

    const editProduct = async() => {
        if (editedProduct.name.trim() === '' || editedProduct.category.trim() === '' ||
        editedProduct.amount.trim() === ''|| editedProduct.unit.trim() === '' ) {
            setModalError("fields can not be empty");
        }
        else {
            let data = await editProductService(editedProduct);
            if (data?.error) {
                setModalError(data.error); 
            }
            else if (data) {
            setProducts(products.map((product) => {
                if (product._id === data._id) 
                    return data;
                 else 
                    return product;
                })
            );
            resetEditing();
            };
        };
    };

    const toggleDelete = (record) => {
        Modal.confirm({
            title: "Delete this product?",
            onOk: () => {
                deleteProduct(record)
            }
        })
    };

    const toggleEdit = (record) => {
        console.log(record);
        setEditing(true);
        setEditedProduct({...record});
    };

    const toggleAdd = () => {
        setAdding(true);
    };

    const resetAdding = () => {
        setModalError(null);
        setAdding(false);
        setNewProduct({name: "", category:"", amount:"", unit:"", companyNumber:""});
    };

    const resetEditing = () => {
        setModalError(null);
        setEditing(false);
        setEditedProduct(null);
    };

    const columns = [ 
        { 
        key: "name", 
        title: "Product Name", 
        dataIndex: "name", 
        }, 
        { 
        key: "category", 
        title: "Category", 
        dataIndex: "category", 
        }, 
        { 
        key: "amount", 
        title: "Amount", 
        dataIndex: "amount", 
        }, 
        {
        key: "unit", 
        title: "Unit", 
        dataIndex: "unit", 
        },
        {
        key: "company", 
        title: "Company Legal Number", 
        dataIndex: ['company', 'legalNumber'],
        },
        {
        key: "company", 
        title: "Company Name", 
        dataIndex: ['company', 'name'],
       
        },
        {
        key: "actions",
        title:"Actions",
        render: (record) => {
            return (
                <>
                <EditOutlined onClick={()=> toggleEdit(record)}/>
                <DeleteOutlined onClick={()=> toggleDelete(record)} style={{color: "red", marginLeft: 10}}/>
                </>
            )
        }
        }]

    return (
        <div className="container">
            {!error ? (
            <>
            <h2>Products</h2>
            <Button style={{marginBottom: 10}} onClick={toggleAdd}>Add New Product</Button>
            <Table dataSource={products} columns={columns}/>
            <Modal title="Add New Product" open={adding} onCancel={() => resetAdding()} onOk={() => addProduct()}>
                <Input
                style={{marginTop: 10}}
                value={newProduct.name}
                placeholder="Name"
                onChange={(e) => {
                    setNewProduct({ ...newProduct, name: e.target.value });
                }}
                />
                <Input
                style={{marginTop: 10}}
                value={newProduct.category}
                placeholder="Category"
                onChange={(e) => {
                    setNewProduct({ ...newProduct, category: e.target.value });
                }}
                />
                <Input
                style={{marginTop: 10}}
                value={newProduct.amount}
                placeholder="Amount"
                onChange={(e) => {
                    setNewProduct({ ...newProduct, amount: e.target.value });
                }}
                />
                <Input
                style={{marginTop: 10}}
                value={newProduct.unit}
                placeholder="Unit"
                onChange={(e) => {
                    setNewProduct({ ...newProduct, unit: e.target.value });
                }}
                />
                <Input
                style={{marginTop: 10}}
                value={newProduct.companyNumber}
                placeholder="Company Legal Number"
                onChange={(e) => {
                    setNewProduct({ ...newProduct, companyNumber: e.target.value });
                }}
                />
                {modalError && <Alert style={{marginTop: 10}} message={modalError} type="error" />}
            </Modal>
            <Modal title="Edit Product" open={editing} onCancel={() => resetEditing()} onOk={() => editProduct()}>
                <Input
                style={{marginTop: 10}}
                value={editedProduct?.name}
                placeholder="Name"
                onChange={(e) => {
                    setEditedProduct({ ...editedProduct, name: e.target.value });
                }}
                />
                <Input
                style={{marginTop: 10}}
                value={editedProduct?.category}
                placeholder="Category"
                onChange={(e) => {
                    setEditedProduct({ ...editedProduct, category: e.target.value });
                }}
                />
                <Input
                style={{marginTop: 10}}
                value={editedProduct?.amount}
                placeholder="Amount"
                onChange={(e) => {
                    setEditedProduct({ ...editedProduct, amount: e.target.value });
                }}
                />
                <Input
                style={{marginTop: 10}}
                value={editedProduct?.unit}
                placeholder="Unit"
                onChange={(e) => {
                    setEditedProduct({ ...editedProduct, unit: e.target.value });
                }}
                />
                {modalError && <Alert style={{marginTop: 10}} message={modalError} type="error" />}
            </Modal>
            </>
            ) : (
                <Alert style={{marginTop: 10}} message={error} type="error" />
            )}
        </div>
    )
}