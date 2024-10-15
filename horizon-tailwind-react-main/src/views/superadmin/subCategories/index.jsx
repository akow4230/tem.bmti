import React, { useEffect, useState } from "react";
import ApiCall from "../../../config";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Card from "../../../components/card";
import {MdDelete, MdModeEditOutline, MdOutlinePlaylistAdd} from "react-icons/md";

const SubCategories = () => {
  const [admins, setAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [asosList, setAsosList] = useState([]); // State for asos data

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    if (admins.length > 0) {
      fetchAsosData();
    }
  }, [admins]);

  // Fetch categories
  const getCategory = async () => {
    try {
      const response = await ApiCall(`/api/v1/superadmin/category`, "GET");
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch subcategories based on selected category ID
  const getSubCategory = async (category_id) => {
    if (category_id == "") {
      setAdmins([]);
      return;
    }
    try {
      const response = await ApiCall(`/api/v1/superadmin/subcategory/category/${category_id}`, "GET");
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Fetch asos data for each admin
  const fetchAsosData = async () => {
    const asosPromises = admins.map(async (admin) => {
      try {
        const response = await ApiCall(`/api/v1/asos/${admin.id}`, "GET");
        return response.data.type === 0
            ? "Kerak emas"
            : response.data.type === 1
                ? "Ixtiyoriy"
                : "Majburiy";
      } catch (error) {
        console.error("Error fetching asos:", error);
        return "Error";
      }
    });

    const asosResults = await Promise.all(asosPromises);
    setAsosList(asosResults);
  };


  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);
    getSubCategory(categoryId);
  };

  // Update category logic
  const updateCategory = async () => {

    try {
      const response = await ApiCall(`/api/v1/asos`, "PUT", asos);
    } catch (error) {
      console.error("Error updating asos:", error);
    }

    try {
      const response = await ApiCall(`/api/v1/sabab/${editingAdmin.id}`, "PUT", asos);
    } catch (error) {
      console.error("Error updating asos:", error);
      try {
        await ApiCall(`/api/v1/superadmin/subcategory`, "PUT", editingAdmin);
        await getCategory();
        setEditingAdmin(null);
        setShow(false);
      } catch (error) {
        console.error("Error updating category:", error);
      }
    }
    try{
      // await ApiCall(`/api/v1/sabab/subcategory/${editingAdmin.id}`, "DELETE");

      for (let item of sabab) {
        if (item.id) {
          await ApiCall(`/api/v1/sabab/${item.id}`, "PUT", item);
        } else {
          // Otherwise, create a new sabab
          await ApiCall(`/api/v1/sabab`, "POST", {
            ...item,
            subCategory: editingAdmin,
          });
        }
      }
    }catch (err){
      console.log(err)
    }
    await getSubCategory(selectedCategoryId)
    setShow(false)
    setSabab([])
  }

  const [asos, setAsos] = useState(null)
  const [sabab, setSabab] = useState([])
  const handleEditClick = async (category) => {
    try {
      const response = await ApiCall(`/api/v1/asos/${category.id}`, "GET");
      setAsos(response.data)
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }

    try {
      const response = await ApiCall(`/api/v1/sabab/${category.id}`, "GET");
      setSabab(response.data)
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }

    setEditingAdmin(category);
    setShow(true);
  };
// Add new sabab
  const handleAddSabab = () => {
    const newSabab = { title: "", subCategory: editingAdmin };
    setSabab([...sabab, newSabab]);
  };

// Delete sabab
  const handleDeleteSabab = async (sababId, index) => {
    if (sababId) {
      // If the sabab has an id, delete it from the server
      try {
        await ApiCall(`/api/v1/sabab/${sababId}`, "DELETE");
        const updatedSababList = sabab.filter((s) => s.id !== sababId);
        setSabab(updatedSababList);
      } catch (error) {
        console.error("Error deleting sabab:", error);
      }
    } else {
      // If the sabab doesn't have an id, remove it from the local state
      const updatedSababList = sabab.filter((_, i) => i !== index);
      setSabab(updatedSababList);
    }
  };

  return (
      <div>
        <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
          <div className="mt-5 grid h-full grid-cols-4 gap-5 md:grid-cols-3"></div>
          <div>
            <select
                onChange={handleCategoryChange}
                className="w-75 my-2 mb-4 px-3 py-2 border rounded"
            >
              <option value="">Kategoriyani tanlang</option>
              {category.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid w-50 m-auto h-full grid-cols-1 gap-5 md:grid-cols-1 pb-0 pr-32">
          <Card extra={"w-full h-full "}>
            <div className="p-4 overflow-x-scroll xl:overflow-x-hidden">
              <table className="w-full">
                <thead>
                <tr>
                  <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                    <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                      №
                    </div>
                  </th>
                  <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                    <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                      Xizmat turi
                    </div>
                  </th>
                  <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                    <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                      Xizmat muddati
                    </div>
                  </th>
                  <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                    <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                      Asos
                    </div>
                  </th>
                  <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                    <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600"></div>
                  </th>
                </tr>
                </thead>
                <tbody>
                {admins?.map((row, index) => (
                    <tr className={"border-b-2"} key={index}>
                      <td className={"p-2 "}>
                        <p className="mr-[10px] text-sm font-semibold text-navy-700 dark:text-white">
                          {index + 1}
                        </p>
                      </td>
                      <td>
                        <p className="mr-[10px] text-sm font-semibold text-navy-700 dark:text-white">
                          {row.name}
                        </p>
                      </td>
                      <td>
                        <p className="mr-[10px] text-sm font-semibold text-navy-700 dark:text-white">
                          {row.service_day == 0
                              ? "O'z vaqtida"
                              : `${row.service_day} kunda`}
                        </p>
                      </td>

                      <td>
                        <p className="mr-[10px] text-sm font-semibold text-navy-700 dark:text-white">
                          {asosList[index] || "Loading..."}
                        </p>
                      </td>

                      <td className={"flex my-1"}>
                        <p className="mr-[10px] text-sm font-semibold text-navy-700 dark:text-white">
                          <MdModeEditOutline
                              className="h-6 w-6 cursor-pointer"
                              onClick={() => handleEditClick(row)}
                          />
                        </p>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <Rodal width={800} height={500} visible={show} onClose={() => setShow(false)}>
          <h2 className="text-lg mt-2 font-bold mb-4">
            {editingAdmin && "Xizmat turini tahrirlash"}
          </h2>
          <form className={""} onSubmit={(e) => {
            e.preventDefault();
                if (editingAdmin) {
                  updateCategory();
                }
              }}
          >
            <div className={"flex gap-10"}>
              <div className={"w-1/2 pt-0 p-4"}>
                <div className="mb-4 mt-4">
                  <label className="block mb-2">Xizmat nomi:</label>
                  <input
                      type="text"
                      value={editingAdmin && editingAdmin.name}
                      onChange={(e) => {
                        if (editingAdmin) {
                          setEditingAdmin({...editingAdmin, name: e.target.value});
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div className={"flex gap-4 justify-between"}>
                  <div className="mb-4 mt-2">
                    <label className="block mb-2">Xizmat ko'rsatish kuni</label>
                    <input
                        type="text"
                        value={editingAdmin && editingAdmin.service_day}
                        onChange={(e) => {
                          if (editingAdmin) {
                            setEditingAdmin({
                              ...editingAdmin,
                              service_day: e.target.value,
                            });
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4 mt-2">
                    <label className="block mb-2 ">Asos</label>
                    <select
                        value={asos ? asos.type : ""}
                        onChange={(e) => setAsos({...asos, type: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                      <option value={0}>Shart emas</option>
                      <option value={1}>Ixtiyoriy</option>
                      <option value={2}>Majburiy</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className={"w-1/2 pt-0 p-4"}>
                <div className="mb-4 mt-4">
                  <label className="block mb-2 bold text-xl">Sabablar</label>
                  {sabab.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <label className="block mb-2">Sabab {index+1}</label>
                        <input

                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const updatedSababs = sabab.map((s, i) => i === index ? {
                                ...s,
                                title: e.target.value
                              } : s);
                              setSabab(updatedSababs);
                            }}
                            className="w-2/3 px-3 py-2 border border-gray-300 rounded"
                        />
                        <MdDelete
                            className=" text-red-500 "
                            size={20}
                            onClick={() => handleDeleteSabab(item.id, index)}
                        />
                      </div>
                  ))}
                  <MdOutlinePlaylistAdd
                      className="text-blue-500 cursor-pointer mt-2"
                      size={28} // Adjust the size here
                      onClick={handleAddSabab}
                  />

                </div>

              </div>
            </div>


            <button className=" bg-blue-500 text-white py-2 px-4 rounded ">
              Saqlash
            </button>
          </form>
        </Rodal>
      </div>
  );
  };

  export default SubCategories;
