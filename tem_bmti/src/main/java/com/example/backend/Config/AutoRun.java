package com.example.backend.Config;

import com.example.backend.Entity.*;
import com.example.backend.Enums.AppealTypes;
import com.example.backend.Enums.UserRoles;
import com.example.backend.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Configuration
@RequiredArgsConstructor
public class AutoRun implements CommandLineRunner {
    private final AsosRepo asosRepo;
    private final RoleRepo roleRepo;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final CategoryRepo categoryRepo;
    private final SubCategoryRepo subcategoryRepo;
    private final AppealTypeRepo appealTypeRepo;
    private final DeanDutyRepo deanDutyRepo;
    @Override
    public void run(String... args) throws Exception {
        if (roleRepo.findAll().isEmpty()) {
            saveRoles();
        }
        checkAndCreateUser("admin", "00000000", "Default Admin", UserRoles.ROLE_ADMIN);
        checkAndCreateUser("superadmin", "00000000", "Super Admin", UserRoles.ROLE_SUPERADMIN);
        checkAndCreateUser("rektor", "00000000", "Siddiqova Sadoqat G‘afforovna", UserRoles.ROLE_REKTOR);

        // Create categories and subcategories
        createCategoriesAndSubcategories();

//        CREATE APPEAL TYPE
        createAppealType();
        saveAsos();
        saveDens();
        saveDeanDuty();
    }

    private void saveDens() {
        if (roleRepo.findAllDenByRoleId(7).isEmpty()) {
            userRepo.saveAll(List.of(
                    new User(UUID.randomUUID(), "dekan1", passwordEncoder.encode("00000000"), "Dekan 1", List.of(roleRepo.findByName(UserRoles.ROLE_DEKAN))),
                    new User(UUID.randomUUID(), "dekan2",  passwordEncoder.encode("00000000"), "Dekan 2", List.of(roleRepo.findByName(UserRoles.ROLE_DEKAN))),
                    new User(UUID.randomUUID(), "dekan3",  passwordEncoder.encode("00000000"), "Dekan 3", List.of(roleRepo.findByName(UserRoles.ROLE_DEKAN))),
                    new User(UUID.randomUUID(), "dekan4",  passwordEncoder.encode("00000000"), "Dekan 4", List.of(roleRepo.findByName(UserRoles.ROLE_DEKAN))),
                    new User(UUID.randomUUID(), "dekan5",  passwordEncoder.encode("00000000"), "Dekan 5", List.of(roleRepo.findByName(UserRoles.ROLE_DEKAN))),
                    new User(UUID.randomUUID(), "dekan6",  passwordEncoder.encode("00000000"), "Dekan 6", List.of(roleRepo.findByName(UserRoles.ROLE_DEKAN))),
                    new User(UUID.randomUUID(), "dekan7",  passwordEncoder.encode("00000000"), "Dekan 7", List.of(roleRepo.findByName(UserRoles.ROLE_DEKAN))),
                    new User(UUID.randomUUID(), "dekan8",  passwordEncoder.encode("00000000"), "Dekan 8", List.of(roleRepo.findByName(UserRoles.ROLE_DEKAN))),
                    new User(UUID.randomUUID(), "dekan9",  passwordEncoder.encode("00000000"), "Dekan 9", List.of(roleRepo.findByName(UserRoles.ROLE_DEKAN))),
                    new User(UUID.randomUUID(), "dekan10",  passwordEncoder.encode("00000000"), "Dekan 10", List.of(roleRepo.findByName(UserRoles.ROLE_DEKAN))),
                    new User(UUID.randomUUID(), "dekan11",  passwordEncoder.encode("00000000"), "Dekan 11", List.of(roleRepo.findByName(UserRoles.ROLE_DEKAN)))
            ));
        }

    }
    private void saveDeanDuty() {
        if (deanDutyRepo.findAll().isEmpty()) {
            User user1 = userRepo.findByPhone("dekan1").orElseThrow();
            User user2 = userRepo.findByPhone("dekan2").orElseThrow();
            User user3 = userRepo.findByPhone("dekan3").orElseThrow();
            User user4 = userRepo.findByPhone("dekan4").orElseThrow();
            User user5 = userRepo.findByPhone("dekan5").orElseThrow();
            User user6 = userRepo.findByPhone("dekan6").orElseThrow();
            User user7 = userRepo.findByPhone("dekan7").orElseThrow();
            User user8 = userRepo.findByPhone("dekan8").orElseThrow();
            User user9 = userRepo.findByPhone("dekan9").orElseThrow();
            User user10 = userRepo.findByPhone("dekan10").orElseThrow();
            User user11 = userRepo.findByPhone("dekan11").orElseThrow();

            deanDutyRepo.saveAll(List.of(
                    new DeanDuty(1, user1, "Kimyoviy va oziq-ovqat texnologiyalari", LocalDateTime.now()),
                    new DeanDuty(2, user2, "Neft-gaz texnologiyasi", LocalDateTime.now()),
                    new DeanDuty(3, user3, "To’qimachilik va charm sanoat", LocalDateTime.now()),
                    new DeanDuty(4, user4, "Paxta va yengil sanoat texnologiyalari", LocalDateTime.now()),
                    new DeanDuty(5, user5, "Arxitektura-qurilish", LocalDateTime.now()),
                    new DeanDuty(6, user6, "Energetika", LocalDateTime.now()),
                    new DeanDuty(7, user7, "Texnologik jarayonlarni boshqaruv tizimlari", LocalDateTime.now()),
                    new DeanDuty(8, user8, "Yer usti transporti tizimlari", LocalDateTime.now()),
                    new DeanDuty(9, user9, "Magistratura bo`limi", LocalDateTime.now()),
                    new DeanDuty(10, user10, "Sirtqi bo`lim", LocalDateTime.now()),
                    new DeanDuty(11, user11, "Qo'shma ta'lim dasturlarini muvofiqlashtirish bo'limi", LocalDateTime.now())
            ));
        }
    }


    private void saveAsos() {
        if(asosRepo.findAll().isEmpty()){
            List<Asos> asos = asosRepo.saveAll(List.of(
                    new Asos(subcategoryRepo.findById(1).orElseThrow(), 2),
                    new Asos(subcategoryRepo.findById(2).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(3).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(4).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(5).orElseThrow(), 2),
                    new Asos(subcategoryRepo.findById(6).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(7).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(8).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(9).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(10).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(11).orElseThrow(), 2),
                    new Asos(subcategoryRepo.findById(12).orElseThrow(), 2),
                    new Asos(subcategoryRepo.findById(13).orElseThrow(), 2),
                    new Asos(subcategoryRepo.findById(14).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(15).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(16).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(17).orElseThrow(), 2),
                    new Asos(subcategoryRepo.findById(18).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(19).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(20).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(21).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(22).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(23).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(24).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(25).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(26).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(27).orElseThrow(), 2),
                    new Asos(subcategoryRepo.findById(28).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(29).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(30).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(31).orElseThrow(), 2),
                    new Asos(subcategoryRepo.findById(32).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(33).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(34).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(35).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(36).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(37).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(38).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(39).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(40).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(41).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(42).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(43).orElseThrow(), 1),
                    new Asos(subcategoryRepo.findById(44).orElseThrow(), 1)
            ));

        }
    }

    private void createAppealType() {
        if (appealTypeRepo.findAll().isEmpty()){
            appealTypeRepo.saveAll(List.of(
                    new AppealType(1, AppealTypes.INPROGRESS),
                    new AppealType(2, AppealTypes.COMPLETED),
                    new AppealType(3, AppealTypes.PENDING),
                    new AppealType(4, AppealTypes.CANCELED)
            ));
        }
    }

    private void checkAndCreateUser(String phone, String password, String name, UserRoles role) {
        Optional<User> userByPhone = userRepo.findByPhone(phone);
        if (userByPhone.isEmpty()) {
            User user = User.builder()
                    .phone(phone)
                    .name(name)  // Storing the user's name
                    .password(passwordEncoder.encode(password))
                    .roles(List.of(roleRepo.findByName(role)))
                    .build();
            userRepo.save(user);
        }
    }

    private List<Role> saveRoles() {
        return roleRepo.saveAll(List.of(
                new Role(1, UserRoles.ROLE_ADMIN),
                new Role(2, UserRoles.ROLE_STUDENT),
                new Role(3, UserRoles.ROLE_REKTOR),
                new Role(4, UserRoles.ROLE_TEACHER),
                new Role(5, UserRoles.ROLE_SUPERADMIN),
                new Role(6, UserRoles.ROLE_USER),
                new Role(7, UserRoles.ROLE_DEKAN)
        ));
    }

    private void createCategoriesAndSubcategories() {
        if (categoryRepo.findAll().isEmpty()) {
            Category category1 = new Category("O`quv faoliyati");
            Category category2 = new Category("Ijtimoiy iqtisodiy faoliyat");
            Category category3 = new Category("Ilmiy tadqiqot va innovatsiya");
            Category category4 = new Category("Axborot tizimlari");

            categoryRepo.saveAll(List.of(category1, category2, category3, category4));

            // Subcategories for each category
            subcategoryRepo.saveAll(List.of(
                    // Subcategories for category 1
                    new SubCategory(1,"Akademik ta'til olish haqida ariza", LocalDateTime.now(), category1, 2 ),
                    new SubCategory(2,"Talabalar safidan chektlashganlik haqida ma'lumot", LocalDateTime.now(), category1, 2 ),
                    new SubCategory(3,"Oʻzlashtirish natija (baho)lari havida ma'lumot", LocalDateTime.now(), category1, 0 ),
                    new SubCategory(4,"Dars jadvali toʻgʻrisida ma'lumot", LocalDateTime.now(), category1, 0 ),
                    new SubCategory(5,"Oʻqishni koʻchirish va kreditlarni tan olish toʻgʻrisida ma'lumot", LocalDateTime.now(), category1, 2 ),
                    new SubCategory(6,"Oʻqishni tiklashga ariza berish", LocalDateTime.now(), category1, 2 ),
                    new SubCategory(7,"Shaxsiy ta'lim traektoriyasini shakillantirish", LocalDateTime.now(), category1, 0 ),
                    new SubCategory(8,"Yillik oʻquv reja haqida ma'lumot", LocalDateTime.now(), category1, 2 ),
                    new SubCategory(9,"Sillabus (oʻquv dasturi) haqida ma'lumot", LocalDateTime.now(), category1, 2 ),
                    new SubCategory(10,"Imtihonlar jadvalini koʻrish", LocalDateTime.now(), category1, 0),
                    new SubCategory(11,"Qoldirilgan imtihonlarni qayta topshirishga ruxsat (sababli hollarda)", LocalDateTime.now(), category1, 2 ),
                    new SubCategory(12,"Imtihon natijalariga appelyasiya shikoyati kiritish", LocalDateTime.now(), category1, 2 ),
                    new SubCategory(13,"Guruhdan-guruhga oʻtish (asoslangan hollarda)", LocalDateTime.now(), category1, 2 ),
                    new SubCategory(14,"Talabalar almashinuv dasturlari haqida ma'lumot", LocalDateTime.now(), category1, 2 ),
                    new SubCategory(15,"Akademik qarzdorlikda fanlar toʻlov qiymatini aniqlash", LocalDateTime.now(), category1, 2 ),
                    new SubCategory(16,"Qoʻshma ta'lim dasturlari haqida ma'lumot", LocalDateTime.now(), category1, 0),
                    new SubCategory(17,"Diplom (ilova, dublikat) olish", LocalDateTime.now(), category1, 2 ),
                    new SubCategory(18,"Akademik TRANSKRIPT olish", LocalDateTime.now(), category1, 2 ),
                    new SubCategory(19,"Kredit modul tizimi haqida ma'lumot", LocalDateTime.now(), category1, 0 ),

                    // Subcategories for category 2
                    new SubCategory(20,"Toʻlov shartnoma olish", LocalDateTime.now(), category2, 0 ),
                    new SubCategory(21,"Arxivdan ma'lumotlar olish", LocalDateTime.now(), category2, 2 ),
                    new SubCategory(22,"Harbiy majburiyat boʻyicha ma'lumot", LocalDateTime.now(), category2, 2 ),
                    new SubCategory(23,"Ta'lim joyidan ma'lumotnoma olish", LocalDateTime.now(), category2, 2 ),
                    new SubCategory(24,"Karyera markazi haqida ma'lumot", LocalDateTime.now(), category2, 2 ),
                    new SubCategory(25,"Oʻquv kurslar va markaяlar haqida ma'lumot", LocalDateTime.now(), category2, 2 ),
                    new SubCategory(26,"Talabalar turar joyida yashashga ariza", LocalDateTime.now(), category2, 0 ),
                    new SubCategory(27,"Shikoyat yoki takliflar kiritish", LocalDateTime.now(), category2, 2 ),
                    new SubCategory(28,"Fakultetlar haqida ma'lumot", LocalDateTime.now(), category2, 0 ),
                    new SubCategory(29,"Stipendiyalar haqida ma'lumot", LocalDateTime.now(), category2, 2 ),
                    new SubCategory(30,"Ichki tartib qoidalar haqida ma'lumot", LocalDateTime.now(), category2,  0),
                    new SubCategory(31,"Yututuqlarga erishganligi uchun moddiy ragʻbat olish", LocalDateTime.now(), category2, 2 ),
                    new SubCategory(32,"Moddiy yordam olish uchun ariza", LocalDateTime.now(), category2, 2 ),

                    // Add the rest of subcategories for category 2...

                    // Subcategories for category 3
                    new SubCategory(33,"Grantlar va tanlovlar haqida ma'mot", LocalDateTime.now(), category3, 2 ),
                    new SubCategory(34,"Ilmiy konferensiyalar haqida ma'mot", LocalDateTime.now(), category3, 2 ),
                    new SubCategory(35,"Ilmiy maqola yozish uchun konsultasiya", LocalDateTime.now(), category3, 2 ),
                    new SubCategory(36,"Innovasion gʻoya va startapni rshyxatdan oʻtkazish", LocalDateTime.now(), category3, 0 ),
                    new SubCategory(37,"Ustoz-shogird maktabiga a'zo boʻlish", LocalDateTime.now(), category3, 2 ),
                    new SubCategory(38,"Nomdor stipendiyalar haqida ma'lumot", LocalDateTime.now(), category3, 2 ),
                    new SubCategory(39,"Ilmiy loyihalar toʻgʻrisida konsultatsiya", LocalDateTime.now(), category3, 2 ),

                    // Add the rest of subcategories for category 3...

                    // Subcategories for category 4
                    new SubCategory(40,"Hemis tizimi boʻyicha konsultatsiya", LocalDateTime.now(), category4, 2 ),
                    new SubCategory(41,"Hemis tizimida shaxsiy ma'lumotlarni tahrirlash", LocalDateTime.now(), category4, 2 ),
                    new SubCategory(42,"Hemis tizimida  parolni oʻzgartirish", LocalDateTime.now(), category4, 2 ),
                    new SubCategory(43,"Oʻquv jarayoniga oid dasturiy mahsulotlardan foydalanish boʻyicha yordam", LocalDateTime.now(), category4, 2 ),
                    new SubCategory(44,"Zoom dasturiga ulanishga texnik yordam olish", LocalDateTime.now(), category4, 2 )

                    // Add the rest of subcategories for category 4...
            ));

        }
    }
}
