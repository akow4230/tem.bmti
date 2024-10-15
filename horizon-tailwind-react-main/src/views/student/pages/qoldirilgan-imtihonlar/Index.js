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
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);
    const [appealText, setAppealText] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [subcategory, setSubcategory] = useState({
        id: 11,
        name: "",
        category: null,
        service_day: 0,
        created_at: "2024-09-30T13:19:56.617009"
    });
    const navigate = useNavigate();

    useEffect(() => {
        getSubCategory(11);
        fetchData();
    }, []);

    const getSubCategory = async (category_id) => {
        try {
            const response = await ApiCall(`/api/v1/superadmin/subcategory/${category_id}`, "GET");
            setSubcategory(response.data);
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
    return (
        <div>
            <div className="mb-5 mt-5 flex items-center align-bottom  px-[26px]">
                <h4 className="text-2xl my-2 mx-2 font-bold text-navy-700 dark:text-white">
                    {subcategory.name} xizmatidan foydalanish uchun ariza yuborish
                </h4>

            </div>
            <div className="mt-3 p-8 pt-0 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
                <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
                    <Card extra={"w-full p-4 h-full"}>

                        {/* Project 1 */}
                        <div
                            className="flex w-full items-center justify-between rounded-2xl bg-white hover:bg-blue-50  p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                            <div className="flex items-center">
                                <div
                                    className="mt-2 flex items-center justify-center rounded-full bg-lightPrimary p-[12px] text-5xl font-bold text-brand-500 dark:!bg-navy-700 dark:text-white">
                                    <MdOutlineMessage/>
                                </div>
                                <div className="ml-4">
                                    <p className="text-xl font-medium text-navy-700 dark:text-white">
                                        Bu qanday ishlaydi.
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Bu qanday ishlashi haqida malumot

                                    </p>
                                </div>
                            </div>

                        </div>
                        {/* Project 2 */}
                        <div
                            className="my-2 flex w-full items-center justify-between rounded-2xl bg-white hover:bg-blue-50  p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                            <div className="flex items-center">
                                <div
                                    className="mt-2 flex items-center justify-center rounded-full bg-lightPrimary p-[12px] text-5xl font-bold text-brand-500 dark:!bg-navy-700 dark:text-white">
                                    <MdOutlineHomeWork/>
                                </div>
                                <div className="ml-4">
                                    <p className="text-xl font-medium text-navy-700 dark:text-white">
                                        Tashkilot
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Qaysi tashkilot xizmat korsatishi haqida qisqacha

                                    </p>
                                </div>
                            </div>

                        </div>
                        {/* Project 3 */}
                        <div
                            className="my-2 flex w-full items-center justify-between rounded-2xl bg-white hover:bg-blue-50  p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                            <div className="flex items-center">
                                <div
                                    className="mt-2 flex items-center justify-center rounded-full bg-lightPrimary p-[12px] text-5xl font-bold text-brand-500 dark:!bg-navy-700 dark:text-white">
                                    <MdOutlineDocumentScanner/>
                                </div>
                                <div className="ml-4">
                                    <p className="text-xl font-medium text-navy-700 dark:text-white">
                                        Xizmatdan foydalanish uchun kerakli hujjatlar
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600">

                                        {subcategory.service_day===0?"Talab etilmaydi":"ariza yozma ravishda .pdf farmatga o'tkazgan holda"}

                                    </p>
                                </div>
                            </div>

                        </div>
                        {/* Project 3 */}
                        <div
                            className="my-2 flex w-full items-center justify-between rounded-2xl bg-white hover:bg-blue-50  p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                            <div className="flex items-center">
                                <div
                                    className="mt-2 flex items-center justify-center rounded-full bg-lightPrimary p-[12px] text-5xl font-bold text-brand-500 dark:!bg-navy-700 dark:text-white">
                                    <MdOutlineAccessTime/>
                                </div>
                                <div className="ml-4">
                                    <p className="text-xl font-medium text-navy-700 dark:text-white">
                                        Xizmat ko'rsatish muddati
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        {subcategory.service_day===0?"O'z vaqtida":subcategory.service_day+" kunda"}

                                    </p>
                                </div>
                            </div>

                        </div>
                        {/* Project 4 */}
                        <div
                            className="my-2 flex w-full items-center justify-between rounded-2xl bg-white hover:bg-blue-50  p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                            <div className="flex items-center">
                                <div
                                    className="mt-2 flex items-center justify-center rounded-full bg-lightPrimary p-[12px] text-5xl font-bold text-brand-500 dark:!bg-navy-700 dark:text-white">
                                    <MdLocalPhone/>
                                </div>
                                <div className="ml-4">
                                    <p className="text-xl font-medium text-navy-700 dark:text-white">
                                        Bog'lanish
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Ishinch telefoni: +9989 94 248-89-89

                                    </p>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Telegram manzil: <a className={"text-blue-500"} href={"https://t.me/BuxMTI_rasmiy"}>@bmti</a>

                                    </p>
                                </div>
                            </div>

                        </div>

                    </Card>


                </div>

                {/* right side section */}

                <div className="col-span-1 pt-0 p-8 h-full w-full rounded-xl 2xl:col-span-1 ">
                    {/* xizmatdan foydalanish */}
                    <div onClick={()=>setShow(true)}
                         className=" flex text-white w-full items-center rounded-3xl justify-between  bg-blue-500 hover:bg-blue-600  p-3  shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <div className="flex items-center justify-between">
                            <div
                                className="mt-2 flex items-center justify-center rounded-full  p-[6px] text-5xl font-bold  dark:!bg-navy-700 dark:text-white">
                                <MdOutlineCheckBox/>
                            </div>
                            <div className="ml-4 ">
                                <p className="text-xl my-2 font-medium  dark:text-white">
                                    Xizmatdan foydalanish
                                </p>

                            </div>
                            <div
                                className="mt-2 flex items-center justify-center rounded-full  p-[6px] text-5xl font-bold  dark:!bg-navy-700 dark:text-white">
                                <MdOutlineNavigateNext/>
                            </div>
                        </div>

                    </div>

                    {/* ulashish */}
                    <div onClick={handleShare}
                         className="my-4 flex text-black w-full items-center rounded-3xl justify-between  bg-gray-200 hover:bg-gray-300  p-3  shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <div className="flex items-center justify-between ">
                            <div
                                className="mt-2 flex items-center justify-center rounded-full  p-[6px] text-5xl font-bold  dark:!bg-navy-700 dark:text-white">
                                <MdSend/>
                            </div>
                            <div className="ml-4 ">
                                <p className="text-2xl my-2 font-medium  dark:text-white">
                                    Ulashish
                                </p>

                            </div>
                            <div
                                className="mt-2 flex items-center justify-center rounded-full  p-[6px] text-5xl font-bold  dark:!bg-navy-700 dark:text-white">
                                <MdOutlineNavigateNext/>
                            </div>
                        </div>

                    </div>

                </div>
            </div>



            <Rodal width={800} height={600} visible={show} onClose={() => setShow(false)}>
                <h2 className="text-lg mt-2 font-bold mb-4">Ariza yuborish</h2>
                <form onSubmit={(e) => { e.preventDefault(); sendAppeal(); }}>
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
                            {/*<ReactQuill*/}
                            {/*    value={appealText}*/}
                            {/*    onChange={(e) => setAppealText(e.target.value)}*/}
                            {/*    theme="snow"*/}
                            {/*    placeholder="Ariza matnini kiriting..."*/}
                            {/*    modules={{*/}
                            {/*        toolbar: [*/}
                            {/*            [{ 'font': [] }, { 'size': [] }],*/}
                            {/*            ['bold', 'italic', 'underline', 'strike'],*/}
                            {/*            [{ 'color': [] }, { 'background': [] }],*/}
                            {/*            [{ 'script': 'sub' }, { 'script': 'super' }],*/}
                            {/*            [{ 'align': [] }],*/}
                            {/*            ['clean']  // Clear formatting button*/}
                            {/*        ]*/}
                            {/*    }}*/}
                            {/*/>*/}

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
            </Rodal>
        </div>

    );
}

export default Index;