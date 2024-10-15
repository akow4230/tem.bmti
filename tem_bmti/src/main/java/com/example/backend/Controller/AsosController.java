package com.example.backend.Controller;

import com.example.backend.Entity.Asos;
import com.example.backend.Repository.AsosRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1/asos")
public class AsosController {
    private final AsosRepo asosRepo;


    @GetMapping("/{subCategoryId}")
    public HttpEntity<?> getAsosByCategory(@PathVariable Integer subCategoryId) {
        System.out.print(subCategoryId);
        Asos asos=asosRepo.findBySubCategoryId(subCategoryId);
        if (asos==null) {
            System.out.printf("hi");
            return ResponseEntity.notFound().build();
        }
        System.out.print(asos);
        return ResponseEntity.ok(asos);
    }

    @PutMapping
    private HttpEntity<?> putAsos(@RequestBody Asos asos) {
        asosRepo.save(asos);
        return ResponseEntity.ok("ok");
    }

    @PostMapping()
    public HttpEntity<?> postAsos(@RequestBody Asos asos) {
        asosRepo.save(asos);
        return ResponseEntity.ok(asos);
    }

    @DeleteMapping("/{asosId}")
    private HttpEntity<?> deleteAsos(@PathVariable int asosId) {
        asosRepo.deleteById(asosId);
        return ResponseEntity.ok().build();
    }
}
