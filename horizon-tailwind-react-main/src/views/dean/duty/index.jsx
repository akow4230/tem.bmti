import React, { useEffect, useState } from "react";
import ApiCall from "../../../config";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/card";
import {
    MdCheckCircleOutline, MdDownload,
    MdFileUpload,

} from "react-icons/md";
import Rodal from "rodal";

const Duty = () => {
    const [admin, setAdmin] = useState(null);
    const [duty, setDuty] = useState([]);
    const navigate = useNavigate();
    const [appealType, setAppealType] = useState([]);
    const [appeals, setAppeals] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(0);
    const [selectedAppealType, setSelectedAppealType] = useState(0);

    const [show, setShow] = useState(false);
    const [appealText, setAppealText] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(() => {
        getAdmin();
        getAppealType();
    }, []);

    const getAppeal = async (id, subcategoryId = 0, appealTypeId = 0, page = 0, size = 15) => {
        const obj = {
            subcategoryId: subcategoryId || 0,
            appealTypeId: appealTypeId || 0,
        };

        try {
            const response = await ApiCall(`/api/v1/admin/appeal/${id}?page=${page}&size=${size}`, "POST", obj);
            setAppeals(response.data);
            console.log(response.data.content);
        } catch (error) {
            navigate("/404")
            console.error("Error fetching appeals data:", error);
        }
    };

    const getAdmin = async () => {
        try {
            const response = await ApiCall("/api/v1/auth/decode", "GET", null);
            setAdmin(response.data);
            await getDuty(response?.data?.id);
            await getAppeal(response?.data?.id);
        } catch (error) {
            navigate("/404");
            console.error("Error fetching account data:", error);
        }
    };

    const getDuty = async (adminId) => {
        try {
            const response = await ApiCall(`/api/v1/admin/duty/${adminId}`, "GET", null);
            setDuty(response.data);
        } catch (error) {
            navigate("/404")
            console.error("Error fetching duty data:", error);
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

    const getAppealType = async () => {
        try {
            const response = await ApiCall(`/api/v1/appealtype`, "GET", null);
            setAppealType(response.data);
        } catch (error) {
            console.error("Error fetching appeal type data:", error);
        }
    };

    const handleSearchClick = () => {
        if (admin?.id) {
            getAppeal(admin.id, selectedSubcategory, selectedAppealType);
        }
    };

    const [answer, setAnswer] = useState(null)
    function handleAnswer(appeal) {
        setAnswer(appeal)
        setShow(true)
    }

    const sendAppeal = async () =>{

    }
    return (
        <div>
            <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-4">
                {/* Subcategory Select */}
                <select
                    className="form-select p-2 rounded text-xl"
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(Number(e.target.value))}
                >
                    <option value={0}>Xizmat turi</option>
                    {duty.map((item) => (
                        <option key={item?.id} value={item?.subCategory?.id}>
                            {item?.subCategory?.name}
                        </option>
                    ))}
                </select>

                {/* Appeal Type Select */}
                <select
                    className="form-select p-2 rounded text-xl"
                    value={selectedAppealType}
                    onChange={(e) => setSelectedAppealType(Number(e.target.value))}
                >
                    <option value={0}>Xizmat holati</option>
                    {appealType.map((item) => (
                        <option key={item?.id} value={item?.id}>
                            {item?.name}
                        </option>
                    ))}
                </select>

                <div></div>

                {/* Search Button */}
                <button onClick={handleSearchClick} className="bg-blue-600 text-white text-xl rounded-xl w-1/2">
                    Qidirish
                </button>
            </div>

            <div className="grid h-full grid-cols-1 my-4 gap-5 md:grid-cols-1 pt-0 pb-0">
                <Card extra={"w-full h-full"}>
                    <div className="p-2 overflow-x-scroll xl:overflow-x-hidden">
                        <table className="w-full text-start">
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>Ism</th>
                                <th>Xizmat turi</th>
                                <th>Murojaat vaqti</th>
                                <th>Murojaat Holati</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {appeals?.content?.map((row, index) => (
                                <tr key={index} className={"border-b-2"}>
                                    <td>{index + 1}</td>
                                    <td>{row?.student?.second_name} {row?.student?.first_name}</td>
                                    <td>{row?.subCategory?.name}</td>
                                    <td>{new Date(row?.created_at).toLocaleDateString()}</td>
                                    <th >{row?.appealType?.name}</th>
                                    <th>
                                    {/*<MdDangerous className="h-6 w-6 text-brand-500 dark:text-white" />*/}
                                        {row?.appealType?.name==="INPROGRESS"&&<button onClick={()=>handleAnswer(row)} className={"bg-blue-400 rounded"}>JAVOB</button>}
                                        {row?.appealType?.name==="COMPLETED"&&<MdCheckCircleOutline className="h-6 w-6 text-brand-500 dark:text-white" />}
                                        {row?.appealType?.name==="CENCELED"&&<MdCheckCircleOutline className="h-6 w-6 text-brand-500 dark:text-white" />}
                                    </th>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>


            <Rodal width={800} height={650} visible={show} onClose={() => setShow(false)}>
                <h2 className="text-lg mt-2 font-bold mb-4">Ariza Javob yuborish</h2>
                <div className={""}>

                    <div className={"flex gap-5 border-2 p-2"}>
                        <img width={60} style={{borderRadius: "50%"}} src={answer?.student.image}/>
                        <div>
                            <h1>{answer?.student.first_name} {answer?.student.second_name}</h1>
                            <h1>{answer?.student.group_name}</h1>
                        </div>
                        <div className={"mx-16"}>
                            <h1>Ariza faylini yuklash</h1>
                            <MdDownload className="text-[40px] text-brand-500 dark:text-white"/>
                        </div>
                    </div>
                    <div className={"overflow-auto overflow-y-scroll h-[100px] w-full"}>
                        <h1 className={"bold text-xl"}>Arixa mazmuni</h1>
                        <p>{answer?.appealText}</p>

                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        sendAppeal();
                    }}>
                        <Card
                            className="grid h-full w-full grid-cols-1  gap-3 rounded-[20px] bg-white bg-clip-border p-3 shadow-xl dark:!bg-navy-800">


                            <div className={"my-4"}>
                                <label>Ariza javob mazmuni</label>
                                <textarea
                                    rows={2}
                                    cols={80}
                                    value={appealText}
                                    onChange={(e) => setAppealText(e.target.value)}
                                    className=" bg-white border-2 border-gray-300 rounded-lg p-4 resize-none text-gray-800 focus:outline-none focus:border-blue-400"
                                    placeholder="Ariza matnini kiriting..."
                                />

                            </div>

                            <div className="col-span-1 h-full  w-1/2 rounded-xl bg-lightPrimary dark:!bg-navy-700">
                                <label className="flex h-full  flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 cursor-pointer">
                                    <MdFileUpload className="text-[40px] text-brand-500 dark:text-white"/>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept=".pdf" // Only accept PDF files
                                        className="hidden"
                                    />
                                    <p className="mt-2 text-sm font-medium text-gray-600">Javob faylini yuklang pdf: </p>
                                    {selectedFile && (
                                        <p className="mt-2 text-sm text-gray-600">
                                            Javob fayli: <span className="font-semibold">{selectedFile.name}</span>
                                        </p>
                                    )}
                                </label>
                            </div>

                            <div className="col-span-1 h-full  w-1/2 rounded-xl bg-lightPrimary dark:!bg-navy-700">

                            </div>
                        </Card>

                        <button
                            className="linear mt-4 flex items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 dark:bg-brand-400">
                            Arizani yuborish
                        </button>
                    </form>

                </div>

            </Rodal>

        </div>
    );
};

export default Duty;
