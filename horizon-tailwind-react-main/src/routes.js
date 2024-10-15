import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import Home from "views/admin/home";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";
import Subject from "views/admin/subject"
import Duty from "views/admin/duty"

// student imports
import MainDashboardStudent from "views/student/default";
import InProgress from "views/student/inProgres";
import Tatil from "views/student/pages/tatil/Index"
import Chetlashtirish from "views/student/pages/talabalar-safidan/Index"
import DarsJadvali from "views/student/pages/dars-jadvali/Index"
import Akademinqarzdorlik from  "views/student/pages/akademik-qarzdorlik/Index"
import Akademintranskript from  "views/student/pages/akademink-transkript/Index";
import Appelatsiya from  "views/student/pages/appelatsiya/Index";
import Diplomilova from "views/student/pages/diplom-ilova/Index";
import Guruhdanguruhga from "views/student/pages/guruhdanguruhga/Index"
import Imtihonlarjadvali from "views/student/pages/imtihonlar-jadvali/Index"
import Kreditmodul from "views/student/pages/kredit-modul/Index"
import Oqishnikochirish from "views/student/pages/oqishin-kochirish/Index"
import Oqishnitiklash from "views/student/pages/oqishin-tiklash/Index"
import Oquvreja from "views/student/pages/oquv-reja/Index"
import Ozlashtirish from "views/student/pages/ozlashtirish/Index"
import Qoldirilganimtihonlar from "views/student/pages/qoldirilgan-imtihonlar/Index"
import Qoshmatalim from "views/student/pages/qoshma-talim/Index"
import Shaxsiytalim from "views/student/pages/shaxsiy-talim/Index"
import Sillabs from "views/student/pages/sillabs/Index"
import StudentAppeals from "views/student/appeals/index"

// dean imports
import DeanHome from "views/dean/default/index";
import DeanDuty from "views/dean/duty/index"



// superadmin
import MainDashboardSuper from "views/superadmin/default";
import SuperadminAdmins from "views/superadmin/tables";
import SuperadminGroups from "views/superadmin/subject";
import SuperAdminCategories from "views/superadmin/categories"
import SuperAdminSubCategories from "views/superadmin/subCategories"
// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdDocumentScanner,
  MdOutlineDocumentScanner,
  MdOutlinePayments,
  MdPayment,
  MdCastForEducation,
  MdPersonalInjury,
  MdOutlineSubject,
  MdSubject,
  MdWallpaper,
  MdFirstPage,
  MdSettingsApplications,
  MdOutlineTextFields,
  MdOutlineWrapText,
  MdOutlineAttachment,
  MdAttachFile,
  MdOutlinePlayLesson,
  MdPlayLesson,
  MdPin,
  MdSocialDistance,
  MdOutlineMap,
  MdOutlineLibraryAddCheck,
  MdOutlinePolymer,
  MdCalendarToday,
  MdGeneratingTokens,
  MdAddTask,
  MdOutlinePublish,
  MdOutlineScience,
  MdOutlineAirlineSeatFlat,
  MdOutlineMapsHomeWork,
  MdNaturePeople,
  MdOutlinePersonAdd,
  MdOutlineLiving,
  MdOutlineEmojiPeople,
  MdOutlinePeopleOutline,
  MdArticle,
  MdAutoAwesomeMotion,
  MdOutlineSettings,
  MdCameraFront,
  MdManageAccounts,
  MdOutlineAddToPhotos,
  MdOutlineAssignment,
  MdOutlineAutoStories,
  MdOutlineBallot,
  MdOutlineChecklistRtl,
  MdOutlineCreditCardOff,
  MdOutlineDriveFileMove,
  MdOutlineFlipCameraAndroid,
  MdOutlineLeaderboard,
  MdOutlineMarkunreadMailbox,
  MdOutlineMoveToInbox,
  MdOutlineMenuBook,
  MdOutlineNoteAlt,
  MdOutlineNote,
  MdOutlinePictureInPicture,
  MdOutlineQueryStats,
  MdOutlineSubtitles,
  MdOutlineVilla,
  MdOutlineWysiwyg,
  MdPadding,
  MdPriceChange,
  MdReceiptLong,
  MdRedeem,
  MdSpa,
  MdAllInbox,
  MdChat,
  MdDesignServices,
  MdOutlineSafetyDivider,
  MdOutlineWeb,
  MdQuestionAnswer,
  MdSchool,
  MdMiscellaneousServices,
  MdOutlineSettingsSuggest,
  MdPhotoFilter, MdPersonalVideo,
} from "react-icons/md";
import Categories from "./views/superadmin/categories";
const superadmin =[

]
const routes = [
  {
    name: "Bosh sahifa",
    layout: "/student",
    path: "appeals",
    icon: <MdHome className="h-6 w-6" />,
    component: <StudentAppeals />,
    stranger: false,
    url: ""
  },
  {
    name: "Bosh sahifa",
    layout: "/student",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboardStudent />,
    stranger: false,
    url: ""
  },

  {
    id:1,
    name: "ozlashtirish",
    layout: "/student",
    path: "ozlashtirish",
    icon: <MdPayment className="h-6 w-6" />,
    component: <Ozlashtirish />,
    stranger: false,
    url: "https://kontrakt.edu.uz"
  },
  {
    id:2,
    name: "tatil",
    layout: "/student",
    path: "tatil",
    icon: <MdOutlinePayments className="h-6 w-6" />,
    component: <Tatil />,
    stranger: false,
    url: ""
  },
  {
    id:3,
    name: "Talabalar safidan chetlashganlik haqida ma'lumot",
    layout: "/student",
    path: "chetlashtirish",
    icon: <MdCastForEducation className="h-6 w-6" />,
    component: <Chetlashtirish />,
    stranger: false,
    url: "chetlashtirish"
  },

  {
    id:4,
    name: "Dars jadvali toʻgʻrisida ma'lumot",
    layout: "/student",
    path: "darsjadvali",
    icon: <MdPersonalInjury className="h-6 w-6" />,
    component: <DarsJadvali />,
    stranger: false,
    url: ""
  },

  {
    id:5,
    name:"Oʻqishni koʻchirish va kreditlarni tan olish toʻgʻrisida ma'lumot",
    icon:<MdCameraFront/>,
    strange:false,
    layout: "/student",
    path:"oqishni-kochirish",
    component: <Oqishnikochirish/>,
    url:"",
  },
  {
    id:6,
    layout: "/student",
    name:"Oʻqishni tiklashga ariza berish",
    icon:<MdManageAccounts/>,
    strange:false,
    path:"oqishni-tiklash",
    component: <Oqishnitiklash/>,
    url:"",
  },
  {
    id:7,
    name:"Shaxsiy ta'lim traektoriyasini shakillantirish",
    icon:<MdOutlineAddToPhotos/>,
    strange:false,
    url:"",
    component: <Shaxsiytalim/>,
    layout: "/student",
    path:"/shaxsiy-talim",
  },
  {
    id:8,
    name:"Yillik oʻquv reja haqida ma'lumot",
    icon:<MdOutlineAssignment/>,
    strange:true,
    component: <Oquvreja/>,
    url:"https://student.bmti.uz/education/curriculum",
    layout: "/student",
    path: "oquv-reja"
  },
  {
    id:9,
    name:"Sillabus (oʻquv dasturi) haqida ma'lumot",
    icon:<MdOutlineAutoStories/>,
    strange:false,
    url:"",
    component: <Sillabs/>,
    layout: "/student",
    path: "sillabus",
  },
  {
    id:10,
    name:"Imtihonlar jadvalini koʻrish",
    icon:<MdOutlineBallot/>,
    strange:true,
    component: <Imtihonlarjadvali/>,
    url:"https://student.bmti.uz/test/exams",
    layout: "/student",
    path:"imtihonlar-jadvali"
  },
  {
    id:11,
    name:"Qoldirilgan imtihonlarni qayta topshirishga ruxsat (sababli hollarda)",
    icon:<MdOutlineChecklistRtl/>,
    strange:false,
    url:"",
    component: <Qoldirilganimtihonlar/>,
    layout: "/student",
    path:"qoldirilgan-imtihonlar"
  },
  {
    id:12,
    name:"Imtihon natijalariga appelyasiya shikoyati kiritish",
    icon:<MdOutlineCreditCardOff/>,
    strange:false,
    url:"",
    component: <Appelatsiya/>,
    layout: "/student",
    path:"appelatsiya",
  },
  {
    id:13,
    name:"Guruhdan-guruhga oʻtish (asoslangan hollarda)",
    icon:<MdOutlineDriveFileMove/>,
    strange:false,
    url:"",
    component: <Guruhdanguruhga/>,
    layout: "/student",
    path: "gruhdan-gruhga"
  },
  // {
  //   id:14,
  //   name:"Talabalar almashinuv dasturlari haqida ma'lumot",
  //   icon:<MdOutlineFlipCameraAndroid/>,
  //   strange:false,
  //   url:"",
  //   component: <Talabalaralmashinuvi/>,
  //   layout: "/student",
  //   path:"talabalar-almashinuvi",
  // },
  {
    id:15,
    name:"Akademik qarzdorlikda fanlar toʻlov qiymatini aniqlash",
    icon:<MdOutlineLeaderboard/>,
    strange:false,
    url:"",
    component: <Akademinqarzdorlik/>,
    layout: "/student",
    path:"akademik-qarzdorlik"
  },
  {
    id:16,
    name:"Qoʻshma ta'lim dasturlari haqida ma'lumot",
    icon:<MdOutlineMarkunreadMailbox/>,
    strange:true,
    url:"https://bmti.uz/",
    component: <Qoshmatalim/>,
    layout: "/student",
    path:"qoshma-talim"
  },
  {
    id:17,
    name:"Diplom (ilova, dublikat) olish",
    icon:<MdOutlineMoveToInbox/>,
    strange:false,
    url:"/some1",
    component: <Diplomilova/>,
    layout: "/student",
    path:"diplom-ilova"
  },
  {
    id:18,
    name:"Akademik TRANSKRIPT olish",
    icon:<MdOutlineMenuBook/>,
    strange:false,
    url:"/some1",
    component: <Akademintranskript/>,
    layout: "/student",
    path:"akademik-transkript"
  },
  {
    id:19,
    name:"Kredit modul tizimi haqida ma'lumot",
    icon:<MdOutlineNoteAlt/>,
    strange:true,
    component: <Kreditmodul/>,
    url:"https://lex.uz/uz/docs/-6689499",
    layout: "/student",
    path:"kredit-modul"
  },

  // {
  //   id:20,
  //   name:"Toʻlov shartnoma olish",
  //   icon:<MdOutlinePayments/>,
  //   strange:true,
  //   url:"https://kontrakt.edu.uz/",
  //   path:"tolov-shartnoma",
  //   layout: "/student",
  //   component: <Tolovshartnoma/>,
  // },
  // {
  //   id:21,
  //   name:"Arxivdan ma'lumotlar olish",
  //   icon:<MdOutlineMoveToInbox/>,
  //   strange:false,
  //   url:"/some2",
  //   component: <Arxivmalumotlari/>,
  //   layout: "/student",
  //   path:"arxiv-malumotlari"
  // },
  // {
  //   id:22,
  //   name:"Harbiy majburiyat boʻyicha ma'lumot",
  //   icon:<MdOutlineNote/>,
  //   strange:false,
  //   url:"/some2",
  //   component: <Harbiymajburiyat/>,
  //   layout: "/student",
  //   path:"harbiy-majburiyat"
  // },
  // {
  //   id:23,
  //   name:"Ta'lim joyidan ma'lumotnoma olish",
  //   icon:<MdOutlinePictureInPicture/>,
  //   strange:false,
  //   url:"/some2",
  //   component: <Talimyonalishi/>,
  //   layout: "/student",
  //   path:"talim-yonalishi"
  // },
  // {
  //   id:24,
  //   name:"Karyera markazi haqida ma'lumot",
  //   icon:<MdOutlineQueryStats/>,
  //   strange:false,
  //   url:"/some2",
  //   component: <Karyeramarkazi/>,
  //   layout: "/student",
  //   path:"karyera-markazi"
  // },
  // {
  //   id:25,
  //   name:"Oʻquv kurslar va markazlar haqida ma'lumot",
  //   icon:<MdOutlineSubtitles/>,
  //   strange:false,
  //   url:"/",
  //   component: <Kursmarkazlari/>,
  //   layout: "/student",
  //   path:"kurslar-markazlar"
  // },
  // {
  //   id:26,
  //   name:"Talabalar turar joyida yashashga ariza",
  //   icon:<MdOutlineVilla/>,
  //   strange:true,
  //   component: <Talabalarturarjoyi/>,
  //   url:"https://my.gov.uz/uz",
  //   layout: "/student",
  //   path:"talabalar-turarjoyi"
  // },
  // {
  //   id:27,
  //   name:"Shikoyat yoki takliflar kiritish",
  //   icon:<MdOutlineWysiwyg/>,
  //   strange:false,
  //   url:"/some2",
  //   component: <Shikoyattaklif/>,
  //   layout: "/student",
  //   path:"shikoyat-taklif"
  // },
  // {
  //   id:28,
  //   name:"Fakultetlar haqida ma'lumot",
  //   icon:<MdPadding/>,
  //   strange:true,
  //   url:"https://bmti.uz/fakultet/fakultet",
  //   component: <Fakultetlar/>,
  //   layout: "/student",
  //   path:"fakultetlar"
  // },
  // {
  //   id:29,
  //   name:"Stipendiyalar haqida ma'lumot",
  //   icon:<MdPriceChange/>,
  //   strange:false,
  //   url:"/some2",
  //   component: <Stipendiya/>,
  //   layout: "/student",
  //   path:"stipendiya"
  // },
  // {
  //   id:30 ,
  //   name:"Ichki tartib qoidalar haqida ma'lumot",
  //   icon:<MdReceiptLong/>,
  //   strange:true,
  //   url:"https://bmti.uz/",
  //   component: <Ichkitartib/>,
  //   layout: "/student",
  //   path:"ichki-tartib"
  // },
  // {
  //   id:31,
  //   name:"Yututuqlarga erishganligi uchun moddiy ragʻbat olish",
  //   icon:<MdRedeem/>,
  //   strange:false,
  //   url:"/some2",
  //   component: <Yutuqlar/>,
  //   layout: "/student",
  //   path:"yutuqlar"
  // },
  // {
  //   id:32,
  //   name:"Moddiy yordam olish uchun ariza",
  //   icon:<MdSpa/>,
  //   strange:false,
  //   url:"/some2",
  //   component: <Moddiyyordam/>,
  //   layout: "/student",
  //   path:"moddiy-yordam"
  // },
  //
  //
  // {
  //   id:33,
  //   name:"Grantlar va tanlovlar haqida ma'mot",
  //   icon:<MdAllInbox/>,
  //   strange:false,
  //   url:"/some3",
  //   component: <Grantlar/>,
  //   layout: "/student",
  //   path:"grantlar"
  // },
  // {
  //   id:34,
  //   name:"Ilmiy konferensiyalar haqida ma'mot",
  //   icon:<MdCastForEducation/>,
  //   strange:false,
  //   url:"/some3",
  //   component: <Ilmiykonferensiya/>,
  //   layout: "/student",
  //   path:"ilmiy-konferensiya"
  // },
  // {
  //   id:35,
  //   name:"Ilmiy maqola yozish uchun konsultasiya",
  //   icon:<MdChat/>,
  //   strange:false,
  //   url:"/some3",
  //   component: <Ilmiymaqola/>,
  //   layout: "/student",
  //   path:"ilmiy-maqola"
  // },
  // {
  //   id:36,
  //   name:"Innovasion gʻoya va startapni rshyxatdan oʻtkazish",
  //   icon:<MdDesignServices/>,
  //   strange:true,
  //   url:"https://mininnovation.uz/",
  //   component: <Innovatsiongoya/>,
  //   layout: "/student",
  //   path:"innovatsion-goya"
  // },
  // {
  //   id:37,
  //   name:"Ustoz-shogird maktabiga a'zo boʻlish",
  //   icon:<MdOutlineSafetyDivider/>,
  //   strange:false,
  //   url:"/some3",
  //   component: <Ustozshogird/>,
  //   layout: "/student",
  //   path:"ustoz-shogird"
  // },
  // {
  //   id:38,
  //   name:"Nomdor stipendiyalar haqida ma'lumot",
  //   icon:<MdOutlineWeb/>,
  //   strange:false,
  //   url:"/some3",
  //   component: <Nomdorstipendiyalar/>,
  //   layout: "/student",
  //   path:"nomdor-stipendiyalar"
  // },
  // {
  //   id:39,
  //   name:"Ilmiy loyihalar toʻgʻrisida konsultatsiya",
  //   icon:<MdQuestionAnswer/>,
  //   strange:false,
  //   url:"/some3",
  //   component: <Ilmiyloyihalar/>,
  //   layout: "/student",
  //   path:"ilmiy-loyihalar"
  // },
  //
  // {
  //   id:40,
  //   name:"Hemis tizimi boʻyicha konsultatsiya",
  //   icon:<MdSchool/>,
  //   strange:false,
  //   url:"",
  //   component: <Hemiskonsultatsiya/>,
  //   path:"/hemis-konsultatsiya"
  // },
  // {
  //   id:41,
  //   name:"Hemis tizimida shaxsiy ma'lumotlarni tahrirlash",
  //   icon:<MdMiscellaneousServices/>,
  //   strange:false,
  //   url:"/some4",
  //   component: <Hemisshaxsiy/>,
  //   path:"/hemis-shaxsiy"
  // },
  // {
  //   id:42,
  //   name:"Hemis tizimida  parolni oʻzgartirish",
  //   icon:<MdOutlineSettingsSuggest/>,
  //   strange:false,
  //   path:"/hemis-parol",
  //   component: <Hemisparol/>,
  //   url:"/some4"
  // },
  // {
  //   id:43,
  //   name:"Oʻquv jarayoniga oid dasturiy mahsulotlardan foydalanish boʻyicha yordam",
  //   icon:<MdPhotoFilter/>,
  //   strange:false,
  //   url:"/some4",
  //   component: <Dasturiyyordam/>,
  //   path:"/dasturiy-yordam"
  // },
  // {
  //   id:44,
  //   name:"Zoom dasturiga ulanishga texnik yordam olish",
  //   icon:<MdPersonalVideo/>,
  //   strange:false,
  //   component: <Zoom/>,
  //   url:"/some4",
  //   path:"/zoom"
  // },
  //
  //

  //   old
  {
    name: "Bosh sahifa",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },

  {
    name: "Xizmat ko'rsatish",
    layout: "/admin",
    path: "duty",
    icon: <MdOutlineSettings className="h-6 w-6" />,
    component: <Duty />,
  },

  {
    name: "Tanlov fanlari",
    layout: "/admin",
    path: "vote",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <Subject />,
  },

  {

    name: "Bosh sahifa",
    layout: "/admin",
    path: "home",
    icon: <MdHome className="h-6 w-6" />,
    component: <Home />,
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "nft-marketplace",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: "data-tables",
  //   component: <DataTables />,
  // },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "profile",
  //   icon: <MdPerson className="h-6 w-6" />,
  //   component: <Profile />,
  // },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "sign-in",
  //   icon: <MdLock className="h-6 w-6" />,
  //   component: <SignIn />,
  // },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "rtl",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <RTLDefault />,
  // },
  //

  // dekan

  {
    name: "Bosh sahifa",
    layout: "/dean",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <DeanHome />,
  },

  {
    name: "Xizmat ko'rsatish",
    layout: "/dean",
    path: "duty",
    icon: <MdOutlineSettings className="h-6 w-6" />,
    component: <DeanDuty />,
  },







  //   superadmin

  {
    name: "Bosh sahifa",
    layout: "/superadmin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboardSuper />,
  },
  {
    name: "Adminlar",
    layout: "/superadmin",
    path: "admins",
    icon: <MdPerson className="h-6 w-6" />,
    component: <SuperadminAdmins />,
  },
  {
    name: "Gruhlar",
    layout: "/superadmin",
    path: "groups",
    icon: <MdCastForEducation className="h-6 w-6" />,
    component: <SuperadminGroups />,
  },
  {
    name: "Kategoriyalar",
    layout: "/superadmin",
    path: "categories",
    icon: <MdArticle className="h-6 w-6" />,
    component: <SuperAdminCategories />,
  },
  {
    name: "Xizmat turlari",
    layout: "/superadmin",
    path: "subcategories",
    icon: <MdAutoAwesomeMotion className="h-6 w-6" />,
    component: <SuperAdminSubCategories />,
  },


];
export default routes;
