package com.example.backend.Controller;

import com.example.backend.DTO.AdminAppealFilterDTO;
import com.example.backend.DTO.AdminDutyDTO;
import com.example.backend.DTO.GroupDTO;
import com.example.backend.Entity.*;
import com.example.backend.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {
    private final StudentRepo studentRepo;
    private final VoteSubjectRepo voteSubjectRepo;
    private final AdminDutyRepo adminDutyRepo;
    private final AppealRepo appealRepo;
    @GetMapping("/bygroup")
    public HttpEntity<?> getByGroup() {
        List<Student> students = studentRepo.findAll();
        Map<String, List<Student>> groupedStudents = students.stream()
                .collect(Collectors.groupingBy(Student::getGroup_name));
        List<UUID> studentIds = students.stream()
                .map(Student::getId)
                .collect(Collectors.toList());
        List<VoteSubject> voteSubjects = voteSubjectRepo.findAllByStudentIds(studentIds);
        Map<UUID, List<VoteSubject>> studentVoteSubjectsMap = voteSubjects.stream()
                .collect(Collectors.groupingBy(voteSubject -> voteSubject.getStudent().getId()));
        List<GroupDTO> groupDTOList = groupedStudents.entrySet().stream()
                .map(entry -> {
                    String groupName = entry.getKey();
                    List<Student> groupStudents = entry.getValue();
                    List<VoteSubject> groupVoteSubjects = groupStudents.stream()
                            .flatMap(student -> studentVoteSubjectsMap.getOrDefault(student.getId(), List.of()).stream())
                            .collect(Collectors.toList());
                    return new GroupDTO(groupName, groupStudents, groupVoteSubjects);
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(groupDTOList);
    }

    @GetMapping("/duty/{adminId}")
    public HttpEntity<?> getAdminDuty(@PathVariable UUID adminId){
        List<AdminDuty> adminDuties;
        adminDuties = adminDutyRepo.findAllByAdminId(adminId);
        return ResponseEntity.ok(adminDuties);
    }
    @PostMapping("/appeal/{adminId}")
    public HttpEntity<?> getAppealsForAdmin(@PathVariable UUID adminId,
                                            @RequestBody AdminAppealFilterDTO adminAppealFilterDTO,
                                            @RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "15") int size) {

        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Appeal> appealsPage = Page.empty();
        System.out.println(adminAppealFilterDTO);
        List<AdminDuty> adminDuties = adminDutyRepo.findAllByAdminId(adminId);
        if (adminAppealFilterDTO.getSubcategoryId() > 0 && adminAppealFilterDTO.getAppealTypeId() > 0) {
            appealsPage = appealRepo.findByAdminIdAndBySubcategoryIdAndAppealTypeId(adminAppealFilterDTO.getSubcategoryId(), adminAppealFilterDTO.getAppealTypeId(), pageRequest);
        }
        else if (adminAppealFilterDTO.getSubcategoryId() == 0 && adminAppealFilterDTO.getAppealTypeId() > 0) {
            List<Appeal> allAppeals = new ArrayList<>();
            for (AdminDuty adminDuty : adminDuties) {
                Page<Appeal> appeals = appealRepo.findBySubcategoryIdAndAppealTypeId(adminDuty.getSubCategory().getId(), adminAppealFilterDTO.getAppealTypeId(), pageRequest);
                allAppeals.addAll(appeals.getContent());
            }
            appealsPage = new PageImpl<>(allAppeals, pageRequest, allAppeals.size());
        }
        else if (adminAppealFilterDTO.getSubcategoryId() > 0 && adminAppealFilterDTO.getAppealTypeId() == 0) {
            appealsPage = appealRepo.findBySubcategoryId( adminAppealFilterDTO.getSubcategoryId(), pageRequest);
        }
        else {
            List<Appeal> allAppeals = new ArrayList<>();
            for (AdminDuty adminDuty : adminDuties) {
                Page<Appeal> appeals = appealRepo.findBySubcategoryId(adminDuty.getSubCategory().getId(), pageRequest);
                allAppeals.addAll(appeals.getContent());
            }
            appealsPage = new PageImpl<>(allAppeals, pageRequest, allAppeals.size());
        }

        return ResponseEntity.ok(appealsPage);
    }

}
