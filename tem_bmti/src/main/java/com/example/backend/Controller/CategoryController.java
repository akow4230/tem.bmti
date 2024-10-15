package com.example.backend.Controller;

import com.example.backend.Entity.Category;
import com.example.backend.Repository.CategoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1/superadmin/category")
public class CategoryController {
        private final CategoryRepo categoryRepo;

        @GetMapping
        public HttpEntity<?> getCategories(){
            System.out.println("hi k");
           List<Category> categoryList= categoryRepo.findAllCategoriesOrderByCreatedAtAsc();
           return ResponseEntity.ok(categoryList);
        }

        @PostMapping
        public HttpEntity<?> addCategory(@RequestBody Category category){
            Category category1 = new Category(category.getName(), LocalDateTime.now());
            categoryRepo.save(category1);
            return ResponseEntity.ok("Category saved successfully!");
        }

        @PutMapping
        public HttpEntity<?> putCategory(@RequestBody Category category){
            System.out.println(category);
            categoryRepo.save(category);
            return ResponseEntity.ok("Category updated successfully!");
        }

        @DeleteMapping("/id")
        public HttpEntity<?> deleteCategory(@RequestParam Integer id){
            categoryRepo.deleteById(id);
            return ResponseEntity.ok("Category deleted successfully!");

        }
}
