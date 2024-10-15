package com.example.backend.Repository;

import com.example.backend.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepo extends JpaRepository<Category, Integer> {
    @Query(value = "SELECT * FROM categories ORDER BY created_at ASC", nativeQuery = true)
    List<Category> findAllCategoriesOrderByCreatedAtAsc();
}
