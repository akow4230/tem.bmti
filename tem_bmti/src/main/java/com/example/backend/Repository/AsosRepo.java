package com.example.backend.Repository;

import com.example.backend.Entity.Asos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AsosRepo extends JpaRepository<Asos,Integer> {
    @Query(value = "select * from asos where sub_category_id=:subcategoryId", nativeQuery = true)
    Asos findBySubCategoryId(Integer subcategoryId);
}
