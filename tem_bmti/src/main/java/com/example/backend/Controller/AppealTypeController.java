package com.example.backend.Controller;

import com.example.backend.Entity.Appeal;
import com.example.backend.Entity.AppealType;
import com.example.backend.Repository.AppealRepo;
import com.example.backend.Repository.AppealTypeRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1/appealtype")
public class AppealTypeController {
    private final AppealTypeRepo appealTypeRepo;

    @GetMapping
    public HttpEntity<?> getAppealTypes(){
        List<AppealType> all = appealTypeRepo.findAll();
        return ResponseEntity.ok(all);
    }
}
