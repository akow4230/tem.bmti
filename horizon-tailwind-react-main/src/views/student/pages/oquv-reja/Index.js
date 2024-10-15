import React, {useEffect, useState} from 'react';
import HistoryCard from "../../../admin/marketplace/components/HistoryCard";
import image1 from "../../../../assets/img/profile/image1.png";
import {
    MdBookmark,
    MdLocalPhone,
    MdModeEditOutline, MdOutlineAccessTime, MdOutlineCheckBox,
    MdOutlineDocumentScanner,
    MdOutlineHomeWork,
    MdOutlineMessage, MdOutlineNavigateNext, MdSend
} from "react-icons/md";
import image3 from "../../../../assets/img/profile/image3.png";
import image2 from "../../../../assets/img/profile/image2.png";
import Card from "../../../../components/card";
import ApiCall from "../../../../config";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Index(props) {
    const [user, setUser] = useState({})
    const navigate =  useNavigate()
    const [subcategory, setSubcategory] = useState({
        id:0,
        name:"",
        category:null,
        service_day:0,
        created_at:"2024-09-30T13:19:56.617009"
    })
    const [nativeSubcategory, setNativeSubcategory] = useState({
        id:3,
        name:"",
        icon:<MdBookmark/>,
        strange:true,
        url:"https://student.bmti.uz/education/curriculum",
        path:"/oquv-reja",
    })
    useEffect(() => {
        getSubCategory(8)
        fetchData()
    }, []);

    const getSubCategory = async (category_id) => {
        try {
            const response = await ApiCall(`/api/v1/superadmin/subcategory/${category_id}`, "GET");
            setSubcategory(response.data)
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching subcategories:", error);

        }
    }



        const handleShare = () => {
            const currentUrl = window.location.href;
            const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=Check this out!`;

            // Open Telegram sharing window
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
                console.log(response.data.data)
                setUser(response.data.data)
            } else {
                navigate('/student/login');
            }
        } catch (error) {
            console.error('Error fetching account data:', error);
            navigate('/student/login');
        }
    };


    const sendAppeal = async () =>{
        console.log("hihi")
        await fetchData()
        const data={
            studentId: user?.passport_pin,
            subCategoryId: subcategory.id,
            appealText: "",
            appealFile: null
        }
        try {
            const response = await ApiCall(`/api/v1/student/appeal`, "POST", data);
            setSubcategory(response.data)
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching subcategories:", error);

        }
    }
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
                    <a onClick={()=>sendAppeal()} href={nativeSubcategory.url} target="_blank"  rel="noopener noreferrer"
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

                    </a>

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

        </div>

    );
}

export default Index;