package com.example.backend.Repository;

import com.example.backend.Entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubCategoryRepo extends JpaRepository<SubCategory, Integer> {

    // Native query to find all subcategories by category_id
    @Query(value = "SELECT * FROM sub_categories WHERE categories_id = :categoryId ORDER BY created_at ASC", nativeQuery = true)
    List<SubCategory> findAllByCategoryId(@Param("categoryId") Integer categoryId);
}
