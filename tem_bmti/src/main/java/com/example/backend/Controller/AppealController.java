package com.example.backend.Controller;

import com.example.backend.DTO.AppealDto;
import com.example.backend.Entity.*;
import com.example.backend.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1/student/appeal")
public class AppealController {
    private final UserRepo userRepo;
    private final StudentRepo studentRepo;
    private final SubCategoryRepo subCategoryRepo;
    private final AttachmentRepo attachmentRepo;
    private final AppealRepo appealRepo;
    private final AppealTypeRepo appealTypeRepo;
    private final AsosRepo asosRepo;
    private final SababRepo sababRepo;
    @PostMapping
    public HttpEntity<?> postAppeal(@RequestBody AppealDto appealDto, Principal principal){
        System.out.println(appealDto);
        Student student = studentRepo.findByPassport_pin(appealDto.getStudentId()).orElseThrow();
        SubCategory subCategory = subCategoryRepo.findById(appealDto.getSubCategoryId()).orElseThrow();
        User superadmin =  userRepo.findByPhone("superadmin").orElseThrow();
        Asos asos = asosRepo.findBySubCategoryId(appealDto.getSubCategoryId());
        List<Sabab> allBySubCategoryId = sababRepo.findAllBySubCategoryId(appealDto.getSubCategoryId());
        if( (asos.getType()==0 || asos.getType()==1)){
            if(subCategory.getService_day()==0){
                AppealType appealType =  appealTypeRepo.findById(2).orElseThrow();
                Appeal appeal = new Appeal(student, LocalDateTime.now(), subCategory, appealDto.getAppealText(), null, superadmin,LocalDateTime.now(),"",null, appealType);
                appealRepo.save(appeal);
            }else {
                AppealType appealType =  appealTypeRepo.findById(2).orElseThrow();
                Appeal appeal = new Appeal(student, LocalDateTime.now(), subCategory, appealDto.getAppealText(), null, null,LocalDateTime.now(),"",null, appealType);
                appealRepo.save(appeal);
            }


        }
        if(asos.getType()==2 ){
            AppealType appealType =  appealTypeRepo.findById(1).orElseThrow();
            Attachment attachment = attachmentRepo.findById(appealDto.getAttachmentId()).orElseThrow();
            Appeal appeal = new Appeal(student, LocalDateTime.now(), subCategory, appealDto.getAppealText(),attachment , null,LocalDateTime.now(),"",null, appealType);
            appealRepo.save(appeal);
        }




        return ResponseEntity.ok("Aplication created successfully!");
    }




}
