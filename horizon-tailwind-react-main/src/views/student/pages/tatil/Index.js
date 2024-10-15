import React, {useEffect, useState} from 'react';
import {
    MdBookmark, MdFileUpload,
    MdLocalPhone,
    MdModeEditOutline, MdOutlineAccessTime, MdOutlineCheckBox,
    MdOutlineDocumentScanner,
    MdOutlineHomeWork,
    MdOutlineMessage, MdOutlineNavigateNext, MdSchool, MdSend
} from "react-icons/md";
import Card from "../../../../components/card";
import ApiCall from "../../../../config";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Index(props) {
    const [modalWidth, setModalWidth] = useState("360px");

    // Function to handle screen resizing
    const updateModalWidth = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1280) setModalWidth("500px"); // XL screens
        else if (screenWidth >= 768) setModalWidth("500px"); // LG & MD screens
        else setModalWidth("360px"); // SM screens
    };

    useEffect(() => {
        updateModalWidth(); // Set initial width
        window.addEventListener("resize", updateModalWidth); // Update on resize
        return () => window.removeEventListener("resize", updateModalWidth); // Cleanup
    }, []);



    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);
    const [appealText, setAppealText] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [subcategory, setSubcategory] = useState({
        id: 1,
        name: "",
        category: null,
        service_day: 0,
        created_at: "2024-09-30T13:19:56.617009"
    });
    const [asos, setAsos] = useState(null);
    const [sabab, setSabab] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getSubCategory(1);
        fetchData();
    }, []);

    const getSubCategory = async (category_id) => {
        try {
            const response = await ApiCall(`/api/v1/superadmin/subcategory/${category_id}`, "GET");
            setSubcategory(response.data);
            await getAsos(response?.data?.id);
            await getSabab(response?.data?.id)
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    const handleShare = () => {
        const currentUrl = window.location.href;
        const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=Check this out!`;
        window.open(telegramLink, "_blank");
    };

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('https://student.bmti.uz/rest/v1/account/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setUser(response.data.data);
            } else {
                navigate('/student/login');
            }
        } catch (error) {
            console.error('Error fetching account data:', error);
            navigate('/student/login');
        }
    };

    const uploadPdf = async (pdf, prefix) => {
        const formData = new FormData();
        formData.append('photo', pdf);
        formData.append('prefix', prefix);

        try {
            const response = await ApiCall('/api/v1/file/upload', 'POST', formData, null, true);
            return response.data; // Return the UUID of the uploaded PDF
        } catch (error) {
            console.error("Error uploading PDF:", error);
            throw error;
        }
    };

    const sendAppeal = async () => {
        try {
            await fetchData();
            let pdfUrl = null;
            if (selectedFile) {
                pdfUrl = await uploadPdf(selectedFile, 'appeal');

            }

            const data = {
                studentId: user?.passport_pin,
                subCategoryId: subcategory.id,
                appealText: appealText,
                attachmentId: pdfUrl
            };

            const response = await ApiCall(`/api/v1/student/appeal`, "POST", data);
            console.log("Appeal submitted successfully", response.data);
            setShow(false)
            setAppealText("")
            setSelectedFile(null)
        } catch (error) {
            console.error("Error submitting appeal:", error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
        } else {
            alert("Please upload a valid PDF file.");
            setSelectedFile(null);
        }
    };

    const getAsos = async (subCategoryId) => {
        try {
            const response = await ApiCall(`/api/v1/asos/${subCategoryId}`, "GET");
            setAsos(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    }

    const getSabab = async (subcategoryId)=>{
        try {
            const response = await ApiCall(`/api/v1/sabab/${subcategoryId}`, "GET");
            setSabab(response.data);
            console.log(response.data)
        }catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    }

    return (
        <div>
            <div className="mb-5 mt-5 flex items-center align-bottom  px-[26px]">

                <h4 className="mb-[14px] max-w-full text-lg font-bold text-dark md:text-2xl md:leading-[42px] ">
                    {subcategory?.name} xizmatidan foydalanish uchun ariza yuborish

                </h4>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[70%,30%] md:grid-cols-[70%,30%]  gap-5 mt-3 p-8 pt-0 h-full">
                {/* Right Side Section: Appears on Top on Mobile */}
                <div className="col-span-1  p-8 h-full rounded-xl order-1 md:order-2 xl:order-2">
                    {/* Xizmatdan foydalanish */}
                    <div onClick={() => setShow(true)}
                         className="flex text-white w-full items-center rounded-3xl justify-between bg-blue-500 hover:bg-blue-600 p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <div className="flex items-center justify-between">
                            <div
                                className="md:text-sm xl:text-4xl mt-2 flex items-center justify-center rounded-full p-[6px] md:xl text-5xl font-bold dark:!bg-navy-700 dark:text-white">
                                <MdOutlineCheckBox/>
                            </div>
                            <div className="ml-4">
                                <p className="text-xl xl:text-2xl md:text-sm my-2 font-medium dark:text-white">Xizmatdan foydalanish</p>
                            </div>
                            <div
                                className="md:text-sm xl:text-4xl mt-2 flex items-center justify-center rounded-full p-[6px] text-5xl font-bold dark:!bg-navy-700 dark:text-white">
                                <MdOutlineNavigateNext/>
                            </div>
                        </div>
                    </div>

                    {/* Ulashish */}
                    <div onClick={handleShare}
                         className="my-4 flex text-black w-full items-center rounded-3xl justify-between bg-gray-200 hover:bg-gray-300 p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <div className="md:text-sm flex items-center justify-between">
                            <div
                                className="md:text-sm xl:text-4xl mt-2 flex items-center justify-center rounded-full p-[6px] text-5xl font-bold dark:!bg-navy-700 dark:text-white">
                                <MdSend/>
                            </div>
                            <div className="ml-4">
                                <p className="md:text-sm xl:text-2xl text-2xl my-2 font-medium dark:text-white">Ulashish</p>
                            </div>
                            <div
                                className="md:text-sm xl:text-4xl mt-2 flex items-center justify-center rounded-full p-[6px] text-5xl font-bold dark:!bg-navy-700 dark:text-white">
                                <MdOutlineNavigateNext/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Left Side Section: Moves below on Mobile */}
                <div className="col-span-1 order-2 sm:order-2 md:order-1 xl:order-1">
                    <Card extra="w-full p-4 h-full">
                        {/* Project 1 */}
                        <div
                            className="flex w-full items-center justify-between rounded-2xl bg-white hover:bg-blue-50 p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                            <div className="flex items-center">
                                <div
                                    className="mt-2 flex items-center justify-center rounded-full bg-lightPrimary p-[12px] text-5xl font-bold text-brand-500 dark:!bg-navy-700 dark:text-white">
                                    <MdOutlineMessage/>
                                </div>
                                <div className="ml-4">
                                    <p className="text-xl font-medium text-navy-700 dark:text-white">Bu qanday
                                        ishlaydi.</p>
                                    <p className="mt-2 text-sm text-gray-600">Bu qanday ishlashi haqida malumot</p>
                                </div>
                            </div>
                        </div>

                        {/* Project 2 */}
                        <div
                            className="my-2 flex w-full items-center justify-between rounded-2xl bg-white hover:bg-blue-50 p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                            <div className="flex items-center">
                                <div
                                    className="mt-2 flex items-center justify-center rounded-full bg-lightPrimary p-[12px] text-5xl font-bold text-brand-500 dark:!bg-navy-700 dark:text-white">
                                    <MdOutlineHomeWork/>
                                </div>
                                <div className="ml-4">
                                    <p className="text-xl font-medium text-navy-700 dark:text-white">Tashkilot</p>
                                    <p className="mt-2 text-sm text-gray-600">Qaysi tashkilot xizmat korsatishi haqida
                                        qisqacha</p>
                                </div>
                            </div>
                        </div>

                        {/* Project 3 */}
                        <div
                            className="my-2 flex w-full items-center justify-between rounded-2xl bg-white hover:bg-blue-50 p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                            <div className="flex items-center">
                                <div
                                    className="mt-2 flex items-center justify-center rounded-full bg-lightPrimary p-[12px] text-5xl font-bold text-brand-500 dark:!bg-navy-700 dark:text-white">
                                    <MdOutlineDocumentScanner/>
                                </div>
                                <div className="ml-4">
                                    <p className="text-xl font-medium text-navy-700 dark:text-white">Xizmatdan
                                        foydalanish uchun kerakli hujjatlar</p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        {subcategory.service_day === 0 ? "Talab etilmaydi" : "Ariza yozma ravishda .pdf farmatga o'tkazgan holda"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Project 4 */}
                        <div
                            className="my-2 flex w-full items-center justify-between rounded-2xl bg-white hover:bg-blue-50 p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                            <div className="flex items-center">
                                <div
                                    className="mt-2 flex items-center justify-center rounded-full bg-lightPrimary p-[12px] text-5xl font-bold text-brand-500 dark:!bg-navy-700 dark:text-white">
                                    <MdOutlineAccessTime/>
                                </div>
                                <div className="ml-4">
                                    <p className="text-xl font-medium text-navy-700 dark:text-white">Xizmat ko'rsatish
                                        muddati</p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        {subcategory.service_day === 0 ? "O'z vaqtida" : subcategory.service_day + " kunda"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Project 5 */}
                        <div
                            className="my-2 flex w-full items-center justify-between rounded-2xl bg-white hover:bg-blue-50 p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                            <div className="flex items-center">
                                <div
                                    className="mt-2 flex items-center justify-center rounded-full bg-lightPrimary p-[12px] text-5xl font-bold text-brand-500 dark:!bg-navy-700 dark:text-white">
                                    <MdLocalPhone/>
                                </div>
                                <div className="ml-4">
                                    <p className="text-xl font-medium text-navy-700 dark:text-white">Bog'lanish</p>
                                    <p className="mt-2 text-sm text-gray-600">Ishinch telefoni: +9989 94 248-89-89</p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Telegram manzil: <a className="text-blue-500"
                                                            href="https://t.me/BuxMTI_rasmiy">@bmti</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>


            {(asos?.type == 0 || asos?.type == 1) & sabab.length == 0 &&
                <Rodal
                    visible={show}
                    onClose={() => setShow(false)}
                    height={240}
                    customStyles={{
                        width: "90%", // Ensures responsive width
                        maxWidth: modalWidth, // Dynamically controlled width
                        maxHeight: "80vh",

                        padding: "20px",
                        borderRadius: "12px",
                    }}

                >
                    <div className="flex flex-col  items-center px-6 py-5">
                        <h4 className="mb-4 text-center text-lg font-bold text-dark">
                            {subcategory.name} xizmatidan foydalanish uchun ariza yuborish.
                        </h4>
                        <p className="text-center text-sm text-gray-700">
                            {subcategory.service_day} ish kunida javob beriladi.
                        </p>
                        <button onClick={ ()=>sendAppeal()}
                                className="mt-6 w-full sm:w-auto px-4 py-2 rounded-xl bg-brand-500 text-white font-medium text-base transition duration-200 hover:bg-brand-600 dark:bg-brand-400"
                        >
                            Arizani yuborish
                        </button>
                    </div>
                </Rodal>

            }



            {(asos?.type == 0 || asos?.type == 1) & sabab.length >0 &&
                <Rodal width={800} height={600} visible={show} onClose={() => setShow(false)}>
                    <h2 className="text-lg mt-2 font-bold mb-4">Ariza yuborish</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        sendAppeal();
                    }}>
                        <Card
                            className="grid h-full w-full grid-cols-1  gap-3 rounded-[20px] bg-white bg-clip-border p-3 shadow-xl dark:!bg-navy-800">
                            <div className={""}>
                                <label>Arizangiz mazmuni</label>
                                <textarea
                                    rows={7} // This increases the height of the textarea
                                    cols={87} // This defines the width of the textarea
                                    value={appealText}
                                    onChange={(e) => setAppealText(e.target.value)}
                                    className=" bg-white border-2 border-gray-300 rounded-lg p-4 resize-none text-gray-800 focus:outline-none focus:border-blue-400"
                                    placeholder="Ariza matnini kiriting..."
                                />


                            </div>

                            <div className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700">
                                <label
                                    className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 cursor-pointer"
                                >
                                    <MdFileUpload className="text-[80px] text-brand-500 dark:text-white"/>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept=".pdf" // Only accept PDF files
                                        className="hidden"
                                    />
                                    <p className="mt-2 text-sm font-medium text-gray-600">PDF fayl yuklang</p>
                                    {selectedFile && (
                                        <p className="mt-2 text-sm text-gray-600">
                                            Yuklangan fayl: <span className="font-semibold">{selectedFile.name}</span>
                                        </p>
                                    )}
                                </label>
                            </div>


                        </Card>

                        <button
                            className="linear mt-4 flex items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 dark:bg-brand-400">
                            Arizani yuborish
                        </button>
                    </form>
                </Rodal>}


            {(asos?.type == 2) & sabab?.length ==0 &&
                <Rodal width={800} height={600} visible={show} onClose={() => setShow(false)}>
                    <h2 className="text-lg mt-2 font-bold mb-4">Ariza yuborish</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        sendAppeal();
                    }}>
                        <Card
                            className="grid h-full w-full grid-cols-1  gap-3 rounded-[20px] bg-white bg-clip-border p-3 shadow-xl dark:!bg-navy-800">
                            <div className={""}>
                                <label>Arizangiz mazmuni</label>
                                <textarea
                                    rows={7} // This increases the height of the textarea
                                    cols={87} // This defines the width of the textarea
                                    value={appealText}
                                    onChange={(e) => setAppealText(e.target.value)}
                                    className=" bg-white border-2 border-gray-300 rounded-lg p-4 resize-none text-gray-800 focus:outline-none focus:border-blue-400"
                                    placeholder="Ariza matnini kiriting..."
                                />


                            </div>

                            <div className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700">
                                <label
                                    className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 cursor-pointer"
                                >
                                    <MdFileUpload className="text-[80px] text-brand-500 dark:text-white"/>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept=".pdf" // Only accept PDF files
                                        className="hidden"
                                    />
                                    <p className="mt-2 text-sm font-medium text-gray-600">PDF fayl yuklang</p>
                                    {selectedFile && (
                                        <p className="mt-2 text-sm text-gray-600">
                                            Yuklangan fayl: <span className="font-semibold">{selectedFile.name}</span>
                                        </p>
                                    )}
                                </label>
                            </div>


                        </Card>

                        <button
                            className="linear mt-4 flex items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 dark:bg-brand-400">
                            Arizani yuborish
                        </button>
                    </form>
                </Rodal>}

            {(asos?.type == 2) & sabab?.length >0 &&
                <Rodal visible={show}
                       onClose={() => setShow(false)}

                       customStyles={{
                           height: "auto",
                           width: "90%", // Ensures responsive width
                           maxWidth: {modalWidth}, // Dynamically controlled width
                           maxHeight: "80vh",
                           padding: "20px",
                           borderRadius: "12px",
                       }}>
                    <h4 className="mb-4 text-center text-lg font-bold text-dark">
                        {subcategory.name} xizmatidan foydalanish uchun ariza yuborish.
                    </h4>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        sendAppeal();
                    }}>
                        <Card
                            className="grid h-full w-full grid-cols-1  gap-3 rounded-[20px] bg-white bg-clip-border p-3 shadow-xl dark:!bg-navy-800">
                            <div className={""}>

                                {/*<select value={}*/}

                            </div>

                            <div className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700">
                                <label
                                    className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 cursor-pointer"
                                >
                                    <MdFileUpload className="text-[80px] text-brand-500 dark:text-white"/>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept=".pdf" // Only accept PDF files
                                        className="hidden"
                                    />
                                    <p className="mt-2 text-sm font-medium text-gray-600">PDF fayl yuklang</p>
                                    {selectedFile && (
                                        <p className="mt-2 text-sm text-gray-600">
                                            Yuklangan fayl: <span className="font-semibold">{selectedFile.name}</span>
                                        </p>
                                    )}
                                </label>
                            </div>


                        </Card>

                        <button
                            className="linear mt-4 flex items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 dark:bg-brand-400">
                            Arizani yuborish
                        </button>
                    </form>
                </Rodal>}

        </div>

    );
}

export default Index;