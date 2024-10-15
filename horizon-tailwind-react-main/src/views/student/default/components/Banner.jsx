import React, {useEffect, useState} from "react";
import nft1 from "assets/img/nfts/NftBanner1.png";
import {
  MdAllInbox,
  MdArrowForward,
  MdAssignmentInd,
  MdBookmark,
  MdCalendarViewMonth,
  MdCameraFront, MdCastForEducation, MdChat, MdDesignServices,
  MdGeneratingTokens,
  MdGesture,
  MdManageAccounts, MdMiscellaneousServices,
  MdOutlineAddToPhotos,
  MdOutlineAssignment,
  MdOutlineAutoStories,
  MdOutlineBallot,
  MdOutlineChecklistRtl,
  MdOutlineCreditCardOff,
  MdOutlineDriveFileMove,
  MdOutlineFlipCameraAndroid,
  MdOutlineLeaderboard,
  MdOutlineLogout,
  MdOutlineMarkunreadMailbox,
  MdOutlineMenuBook,
  MdOutlineMoveToInbox,
  MdOutlineNote,
  MdOutlineNoteAlt,
  MdOutlinePageview,
  MdOutlinePayments,
  MdOutlinePictureInPicture,
  MdOutlineQueryStats, MdOutlineSafetyDivider,
  MdOutlineSettingsApplications, MdOutlineSettingsSuggest,
  MdOutlineSubtitles,
  MdOutlineVilla, MdOutlineWeb,
  MdOutlineWysiwyg,
  MdPadding, MdPersonalVideo, MdPhotoFilter,
  MdPriceChange, MdQuestionAnswer,
  MdReceiptLong, MdRedeem, MdSchool, MdSpa,
  MdWallpaper
} from "react-icons/md";
import Card from "../../../../components/card";
import CardMenu from "../../../../components/card/CardMenu";
import {BsCloudCheck} from "react-icons/bs";
import ApiCall from "../../../../config";
import {Link} from "react-router-dom";


const Banner1 = (props) => {
  // Define categories with subcategories
  const mySubCategories = [
        {
          id:1,
          name:"Akademik ta'til olish haqida ariza",
          icon:<MdSchool/>,
          strange:false,
          url:"",
          path:"/tatil",
        },
        {
          id:2,
          name:"Talabalar sayfidan chektlashganlik haqida ma'lumot",
          icon:<MdAssignmentInd/>,
          strange:false,
          url:"",
          path:"/chetlashtirish",
        },
        {
          id:3,
          name:"Oʻzlashtirish natija (baho)lari havida ma'lumot",
          icon:<MdBookmark/>,
          strange:true,
          url:"https://student.bmti.uz/education/performance",
          path:"/ozlashtirish",
        },
        {
          id:4,
          name:"Dars jadvali toʻgʻrisida ma'lumot",
          icon:<MdCalendarViewMonth/>,
          strange:true,
          url:"https://student.bmti.uz/education/time-table",
          path: "/darsjadvali",
        },
        {
          id:5,
          name:"Oʻqishni koʻchirish va kreditlarni tan olish toʻgʻrisida ma'lumot",
          icon:<MdCameraFront/>,
          strange:false,
          url:"/oqishni-kochirish",
          path:"",
        },
        {
          id:6,
          name:"Oʻqishni tiklashga ariza berish",
          icon:<MdManageAccounts/>,
          strange:false,
          path:"/oqishni-tiklash",
          url:"",
        },
        {
          id:7,
          name:"Shaxsiy ta'lim traektoriyasini shakillantirish",
          icon:<MdOutlineAddToPhotos/>,
          strange:false,
          url:"",
          path:"/shaxsiy-talim",
        },
        {
          id:8,
          name:"Yillik oʻquv reja haqida ma'lumot",
          icon:<MdOutlineAssignment/>,
          strange:true,
          url:"https://student.bmti.uz/education/curriculum",
          path: "oquv-reja"
        },
        {
          id:9,
          name:"Sillabus (oʻquv dasturi) haqida ma'lumot",
          icon:<MdOutlineAutoStories/>,
          strange:false,
          url:"",
          path: "sillabus",
        },
        {
          id:10,
          name:"Imtihonlar jadvalini koʻrish",
          icon:<MdOutlineBallot/>,
          strange:true,
          url:"https://student.bmti.uz/test/exams",
          path:"/imtihonlar-jadvali"
        },
        {
          id:11,
          name:"Qoldirilgan imtihonlarni qayta topshirishga ruxsat (sababli hollarda)",
          icon:<MdOutlineChecklistRtl/>,
          strange:false,
          url:"",
          path:"/qoldirilgan-imtihonlar"
        },
        {
          id:12,
          name:"Imtihon natijalariga appelyasiya shikoyati kiritish",
          icon:<MdOutlineCreditCardOff/>,
          strange:false,
          url:"",
          path:"/appelatsiya",
        },
        {
          id:13,
          name:"Guruhdan-guruhga oʻtish (asoslangan hollarda)",
          icon:<MdOutlineDriveFileMove/>,
          strange:false,
          url:"",
          path: "/gruhdan-gruhga"
        },
        {
          id:14,
          name:"Talabalar almashinuv dasturlari haqida ma'lumot",
          icon:<MdOutlineFlipCameraAndroid/>,
          strange:false,
          url:"",
          path:"/talabalar-almashinuvi",
        },
        {
          id:15,
          name:"Akademik qarzdorlikda fanlar toʻlov qiymatini aniqlash",
          icon:<MdOutlineLeaderboard/>,
          strange:false,
          url:"",
          path:"/akademik-qarzdorlik"
        },
        {
          id:16,
          name:"Qoʻshma ta'lim dasturlari haqida ma'lumot",
          icon:<MdOutlineMarkunreadMailbox/>,
          strange:true,
          url:"https://bmti.uz/",
          path:"/qoshma-talim"
        },
        {
          id:17,
          name:"Diplom (ilova, dublikat) olish",
          icon:<MdOutlineMoveToInbox/>,
          strange:false,
          url:"/some1",
          path:"/diplom-ilova"
        },
        {
          id:18,
          name:"Akademik TRANSKRIPT olish",
          icon:<MdOutlineMenuBook/>,
          strange:false,
          url:"/some1",
          path:"/akademik-transkript"
        },
        {
          id:19,
          name:"Kredit modul tizimi haqida ma'lumot",
          icon:<MdOutlineNoteAlt/>,
          strange:true,
          url:"https://lex.uz/uz/docs/-6689499",
          path:"/kredit-modul"
        },

        {
          id:20,
          name:"Toʻlov shartnoma olish",
          icon:<MdOutlinePayments/>,
          strange:true,
          url:"https://kontrakt.edu.uz/",
          path:"/tolov-shartnoma"
        },
        {
          id:21,
          name:"Arxivdan ma'lumotlar olish",
          icon:<MdOutlineMoveToInbox/>,
          strange:false,
          url:"/some2",
          path:"/arxiv-malumotlari"
        },
        {
          id:22,
          name:"Harbiy majburiyat boʻyicha ma'lumot",
          icon:<MdOutlineNote/>,
          strange:false,
          url:"/some2",
          path:"/harbiy-majburiyat"
        },
        {
          id:23,
          name:"Ta'lim joyidan ma'lumotnoma olish",
          icon:<MdOutlinePictureInPicture/>,
          strange:false,
          url:"/some2",
          path:"/talim-yonalishi"
        },
        {
          id:24,
          name:"Karyera markazi haqida ma'lumot",
          icon:<MdOutlineQueryStats/>,
          strange:false,
          url:"/some2",
          path:"/karyera-markazi"
        },
        {
          id:25,
          name:"Oʻquv kurslar va markazlar haqida ma'lumot",
          icon:<MdOutlineSubtitles/>,
          strange:false,
          url:"/",
          path:"/kurslar-markazlar"
        },
        {
          id:26,
          name:"Talabalar turar joyida yashashga ariza",
          icon:<MdOutlineVilla/>,
          strange:true,
          url:"https://my.gov.uz/uz",
          path:"/talabalar-turarjoyi"
        },
        {
          id:27,
          name:"Shikoyat yoki takliflar kiritish",
          icon:<MdOutlineWysiwyg/>,
          strange:false,
          url:"/some2",
          path:"shikoyat-taklif"
        },
        {
          id:28,
          name:"Fakultetlar haqida ma'lumot",
          icon:<MdPadding/>,
          strange:true,
          url:"https://bmti.uz/fakultet/fakultet",
          path:"/fakultetlar"
        },
        {
          id:29,
          name:"Stipendiyalar haqida ma'lumot",
          icon:<MdPriceChange/>,
          strange:false,
          url:"/some2",
          path:"/stipendiya"
        },
        {
          id:30 ,
          name:"Ichki tartib qoidalar haqida ma'lumot",
          icon:<MdReceiptLong/>,
          strange:true,
          url:"https://bmti.uz/",
          path:"/ichki-tartib"
        },
        {
          id:31,
          name:"Yututuqlarga erishganligi uchun moddiy ragʻbat olish",
          icon:<MdRedeem/>,
          strange:false,
          url:"/some2",
          path:"/yutuqlar"
        },
        {
          id:32,
          name:"Moddiy yordam olish uchun ariza",
          icon:<MdSpa/>,
          strange:false,
          url:"/some2",
          path:"/moddiy-yordam"
        },


        {
          id:33,
          name:"Grantlar va tanlovlar haqida ma'mot",
          icon:<MdAllInbox/>,
          strange:false,
          url:"/some3",
          path:"/grantlar"
        },
        {
          id:34,
          name:"Ilmiy konferensiyalar haqida ma'mot",
          icon:<MdCastForEducation/>,
          strange:false,
          url:"/some3",
          path:"/ilmiy-konferensiya"
        },
        {
          id:35,
          name:"Ilmiy maqola yozish uchun konsultasiya",
          icon:<MdChat/>,
          strange:false,
          url:"/some3",
          path:"/ilmiy-maqola"
        },
        {
          id:36,
          name:"Innovasion gʻoya va startapni rshyxatdan oʻtkazish",
          icon:<MdDesignServices/>,
          strange:true,
          url:"https://mininnovation.uz/",
          path:"/innovatsion-goya"
        },
        {
          id:37,
          name:"Ustoz-shogird maktabiga a'zo boʻlish",
          icon:<MdOutlineSafetyDivider/>,
          strange:false,
          url:"/some3",
          path:"/ustoz-shogird"
        },
        {
          id:38,
          name:"Nomdor stipendiyalar haqida ma'lumot",
          icon:<MdOutlineWeb/>,
          strange:false,
          url:"/some3",
          path:"/nomdor-stipendiyalar"
        },
        {
          id:39,
          name:"Ilmiy loyihalar toʻgʻrisida konsultatsiya",
          icon:<MdQuestionAnswer/>,
          strange:false,
          url:"/some3",
          path:"/ilmiy-loyihalar"
        },

        {
          id:40,
          name:"Hemis tizimi boʻyicha konsultatsiya",
          icon:<MdSchool/>,
          strange:false,
          url:"",
          path:"/hemis-konsultatsiya"
        },
        {
          id:41,
          name:"Hemis tizimida shaxsiy ma'lumotlarni tahrirlash",
          icon:<MdMiscellaneousServices/>,
          strange:false,
          url:"/some4",
          path:"/hemis-shaxsiy"
        },
        {
          id:42,
          name:"Hemis tizimida  parolni oʻzgartirish",
          icon:<MdOutlineSettingsSuggest/>,
          strange:false,
          path:"/hemis-parol",
          url:"/some4"
        },
        {
          id:43,
          name:"Oʻquv jarayoniga oid dasturiy mahsulotlardan foydalanish boʻyicha yordam",
          icon:<MdPhotoFilter/>,
          strange:false,
          url:"/some4",
          path:"/dasturiy-yordam"
        },
        {
          id:44,
          name:"Zoom dasturiga ulanishga texnik yordam olish",
          icon:<MdPersonalVideo/>,
          strange:false,
          url:"/some4",
          path:"/zoom"
        },


  ];
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    getCategory()

  }, []);
  const getCategory = async () => {
    try {
      const response = await ApiCall(`/api/v1/superadmin/category`, "GET");
      setCategory(response.data)
      setActiveCategory(response?.data[0])
      getSubCategory(1)
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  const getSubCategory = async (category_id) => {
    try {
      const response = await ApiCall(`/api/v1/superadmin/subcategory/category/${category_id}`, "GET");
      setSubCategory(response.data)
    } catch (error) {
      console.error("Error fetching subcategories:", error);

    }
  };
  const [activeCategory, setActiveCategory] = useState();

  return (
      <>
        <div
            className="flex w-full flex-col rounded-[20px] bg-cover px-[30px] py-[30px] md:px-[64px] md:py-[56px] md:pb-0 "
            style={{backgroundImage: `url(${nft1})`}}>
          <div className="w-full pb-0 p-4 pt-0">
            <div className="flex flex-wrap w-full justify-between">
              <div id="text" className="w-full md:w-[70%] mb-2 md:mb-0">
                <h4 className="mb-[14px] max-w-full text-xl font-bold text-white md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
                  {props.name}
                </h4>
                <p className="mb-[40px] max-w-full text-base font-medium text-[#E3DAFF] md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%]">
                  shaxsiy kabinetga xush kelibsiz!
                </p>
              </div>
              <div id="showmore" className="w-full md:w-[30%]">
                <button
                    className="text-black flex linear rounded-xl bg-white px-4 mt-2 py-2 text-center text-base font-medium transition duration-200 hover:!bg-white/80 active:!bg-white/70"
                >
                  Barcha xizmatlar &nbsp;
                  <MdArrowForward className="pt-1 h-5 w-5"/>
                </button>
              </div>
            </div>

            {/* Category Tabs */}
              <div>
                  <ul className="flex flex-wrap border-b mb-4 my-2">
                      {category?.map((item, index) => (
                          <li
                              key={index}
                              className={`mr-1 ${
                                  activeCategory.name === item.name
                                      ? "border-l border-t border-r rounded-t bg-white"
                                      : "text-white"
                              }`}
                          >
                              <button
                                  onClick={() => {
                                      getSubCategory(item.id);
                                      setActiveCategory(item);
                                  }}
                                  className={`inline-block w-full sm:w-auto py-2 px-4 font-semibold ${
                                      activeCategory.name === item.name
                                          ? "text-blue-400"
                                          : "text-white hover:text-blue-900"
                                  } ${
                                      index !== 0 ? "mt-2 sm:mt-0" : ""
                                  } xl:text-xl lg:text-lg md:text-md sm:text-sm text-xs`}
                                  // Adjusting text sizes for different screen sizes
                              >
                                  {item.name}
                              </button>
                          </li>
                      ))}
                  </ul>

                  {/* Subcategories of the active category */}

              </div>
          </div>


        </div>
          <div
              className="p-4 !z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <ul className="flex flex-wrap justify-start gap-3 mx-auto p-2">
                  {subCategory.map((subcategory, index) => (

                      <Link to={"/student" + mySubCategories[subcategory.id - 1]?.path} key={index} id={subcategory?.id}
                            className="mx-auto w-[250px]  "> {/* Set width here */}
                          <Card extra={"w-full h-full p-2 hover:!bg-blue-100 "}>
                              <div className="mb-auto flex flex-col items-center justify-center">
                                  <div
                                      className="mt-2 flex items-center justify-center rounded-full bg-lightPrimary p-[12px] text-5xl font-bold text-brand-500 dark:!bg-navy-700 dark:text-white">
                            {   mySubCategories[subcategory.id-1]?.icon }
                          </div>
                          <p className="px-5 text-center text-base font-normal text-gray-800 md:!px-0 xl:!px-8">
                            {subcategory?.name}
                          </p>
                        </div>
                      </Card>
                    </Link>

            ))}
          </ul>
        </div>
      </>

  );
};

export default Banner1;
