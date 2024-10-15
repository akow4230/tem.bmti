package com.example.backend.Controller;

import com.example.backend.Entity.Sabab;
import com.example.backend.Repository.SababRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1/sabab")
public class SababController {
    private final SababRepo sababRepo;

    @GetMapping("/{subCategoryId}")
    public HttpEntity<?> getSabab(@PathVariable Integer subCategoryId) {
        List<Sabab> sababs = sababRepo.findAllBySubCategoryId(subCategoryId);
        System.out.println(sababs);
        return ResponseEntity.ok(sababs);
    }

    @PostMapping
    public HttpEntity<?> addSabab(@RequestBody Sabab sabab) {
        if(sabab.getTitle()==""){
            return ResponseEntity.badRequest().body("Title is empty");
        }
        sababRepo.save(sabab);
        return ResponseEntity.ok(sabab);
    }

    @DeleteMapping("/{sababId}")
    public HttpEntity<?> deleteSabab(@PathVariable Integer sababId) {
        sababRepo.deleteById(sababId);
        return ResponseEntity.ok("deleted sabab");
    }

    @DeleteMapping("/subcategory/{subCategoryId}")
    public HttpEntity<?> deleteSababBySubcategory(@PathVariable Integer subCategoryId) {
        sababRepo.deleteAllBySubcategory(subCategoryId);
        return ResponseEntity.ok("deleted sabab");
    }
}
