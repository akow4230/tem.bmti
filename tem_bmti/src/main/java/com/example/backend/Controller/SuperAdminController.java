package com.example.backend.Controller;

import com.example.backend.DTO.AdminDutyDTO;
import com.example.backend.DTO.UserSave;
import com.example.backend.Entity.AdminDuty;
import com.example.backend.Entity.SubCategory;
import com.example.backend.Entity.User;
import com.example.backend.Enums.UserRoles;
import com.example.backend.Repository.AdminDutyRepo;
import com.example.backend.Repository.RoleRepo;
import com.example.backend.Repository.SubCategoryRepo;
import com.example.backend.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/superadmin")
@RequiredArgsConstructor
public class SuperAdminController {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepo roleRepo;
    private final AdminDutyRepo adminDutyRepo;
    private final UserRepo adminRepo;
    private final SubCategoryRepo subCategoryRepo;
    // Create Admin
    @PostMapping("/admins")
    public HttpEntity<?> createAdmin(@RequestBody UserSave userSave) {
        System.out.println(userSave);
        User user = User.builder()
                .phone(userSave.getPhone())
                .name(userSave.getName())
                .password(passwordEncoder.encode(userSave.getPassword()))
                .roles(List.of(roleRepo.findByName(UserRoles.ROLE_ADMIN)))
                .build();
        userRepo.save(user);
        return ResponseEntity.ok(user);
    }

    // Get Admin by ID
    @GetMapping("/admin/{id}")
    public ResponseEntity<?> getAdmin(@PathVariable UUID id) {
        Optional<User> admin = userRepo.findById(id);
        if (admin.isPresent() && admin.get().getRoles().contains(roleRepo.findByName(UserRoles.ROLE_ADMIN))) {
            return new ResponseEntity<>(admin.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
   @GetMapping("/admins")
    public HttpEntity<?> getAdmins() {
        List<User> admin = userRepo.findAllAdminsByRole();
        return ResponseEntity.ok(admin);
    }

    // Update Admin
    @PutMapping("/admins/{id}")
    public ResponseEntity<?> updateAdmin(@PathVariable UUID id, @RequestBody UserSave userSave) {
        Optional<User> admin = userRepo.findById(id);
        if (admin.isPresent() && admin.get().getRoles().contains(roleRepo.findByName(UserRoles.ROLE_ADMIN))) {
            User existingUser = admin.get();
            existingUser.setName(userSave.getName());
            existingUser.setPhone(userSave.getPhone());
            if (userSave.getPassword() != null && !userSave.getPassword().isEmpty()) {
                existingUser.setPassword(passwordEncoder.encode(userSave.getPassword()));
            }
            userRepo.save(existingUser);
            return new ResponseEntity<>(existingUser, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/admins/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable UUID id) {
        Optional<User> admin = userRepo.findById(id);
        if (admin.isPresent() && admin.get().getRoles().contains(roleRepo.findByName(UserRoles.ROLE_ADMIN))) {
            userRepo.deleteRole(id);
            userRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @GetMapping("/duty")
    public HttpEntity<?> getDuties(){
        List<AdminDuty> duties = adminDutyRepo.findAll();
        return ResponseEntity.ok(duties);
    }

    @PostMapping("/duty")
    public HttpEntity<?> setDutiesForAdmin(@RequestBody List<AdminDutyDTO> adminDutyDTOS){
        adminDutyRepo.deleteByAdminId(adminDutyDTOS.get(0).getAdminId());
       saveDuties(adminDutyDTOS);
        return ResponseEntity.ok("Saved successfully!");
    }

    @PutMapping("/duty")
    public HttpEntity<?> putDutiesForAdmin(@RequestBody List<AdminDutyDTO> adminDutyDTOS) {
        for (AdminDutyDTO adminDutyDTO : adminDutyDTOS) {
                boolean empty = adminDutyRepo.existsByAdminIdAndSubCategoryId(adminDutyDTO.getAdminId(), adminDutyDTO.getSubCategoryId()).isEmpty();
                System.out.println(empty);
                if(empty) {
                    adminDutyRepo.deleteByAdminId(adminDutyDTO.getAdminId());
                }else {
                    System.out.print(adminDutyDTO);
                }

            }
            return ResponseEntity.ok("Compiled successfully!");

    }




    private void saveDuties(@RequestBody List<AdminDutyDTO> adminDutyDTOS) {

        for (AdminDutyDTO adminDutyDTO : adminDutyDTOS) {
            User admin = adminRepo.findById(adminDutyDTO.getAdminId()).orElseThrow();
            SubCategory subCategory = subCategoryRepo.findById(adminDutyDTO.getSubCategoryId()).orElseThrow();
            AdminDuty adminDuty = new AdminDuty(admin, subCategory, LocalDateTime.now());
            adminDutyRepo.save(adminDuty);
        }
    }
}
