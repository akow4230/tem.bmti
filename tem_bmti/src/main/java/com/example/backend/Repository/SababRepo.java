package com.example.backend.Repository;

import com.example.backend.Entity.Sabab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SababRepo extends JpaRepository<Sabab, Integer> {
    @Query(value = "select * from sabab where sub_category_id =:subCategoryId", nativeQuery = true)
    List<Sabab> findAllBySubCategoryId(Integer subCategoryId);


    @Query(value = "DELETE FROM sabab where sub_category_id=:subCategoryId", nativeQuery = true)
    void deleteAllBySubcategory(Integer subCategoryId);
}
