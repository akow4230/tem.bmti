package com.example.backend.Controller;

import com.example.backend.Entity.SubCategory;
import com.example.backend.Repository.SubCategoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1/superadmin/subcategory")
public class SubCategoryController {
    private final SubCategoryRepo subCategoryRepo;

    // Get all subcategories
    @GetMapping
    public HttpEntity<?> getAllSubCategories() {
        List<SubCategory> subCategoryList = subCategoryRepo.findAll();
        return ResponseEntity.ok(subCategoryList);
    }

    // Get subcategories by category_id (using native query)

    @GetMapping("/category/{category_id}")
    public HttpEntity<?> getSubCategoriesByCategoryId(@PathVariable Integer category_id) {
        List<SubCategory> subCategoryList = subCategoryRepo.findAllByCategoryId(category_id);
        return ResponseEntity.ok(subCategoryList);
    }


    // Get a specific subcategory by id
    @GetMapping("/{id}")
    public HttpEntity<?> getSubCategoryById(@PathVariable Integer id) {
        Optional<SubCategory> subCategoryOptional = subCategoryRepo.findById(id);
        return subCategoryOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Add a new subcategory (created_at will be automatically set)
    @PostMapping
    public HttpEntity<?> createSubCategory(@RequestBody SubCategory subCategory) {
        SubCategory savedSubCategory = subCategoryRepo.save(subCategory);
        return ResponseEntity.ok(savedSubCategory);
    }

    // Update an existing subcategory (created_at will not be changed)
    @PutMapping
    public HttpEntity<?> updateSubCategory( @RequestBody SubCategory subCategoryDetails) {
        subCategoryRepo.save(subCategoryDetails);
        return ResponseEntity.ok("ok");
    }


}
