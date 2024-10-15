package com.example.backend.Repository;

import com.example.backend.Entity.Appeal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface AppealRepo extends JpaRepository<Appeal, Integer> {


    @Query(value = "SELECT * FROM appeal WHERE  sub_category_id = :subcategoryId AND appeal_type_id = :appealTypeId ORDER BY created_at ASC", nativeQuery = true)
    Page<Appeal> findByAdminIdAndBySubcategoryIdAndAppealTypeId( Integer subcategoryId, Integer appealTypeId, Pageable pageable);

    @Query(value = "SELECT * FROM appeal WHERE admin_id = :adminId AND appeal_type_id = :appealTypeId ORDER BY created_at ASC", nativeQuery = true)
    Page<Appeal> findByAppealTypeId(UUID adminId, Integer appealTypeId, Pageable pageable);

    @Query(value = "SELECT * FROM appeal WHERE sub_category_id = :subcategoryId ORDER BY created_at ASC", nativeQuery = true)
    Page<Appeal> findBySubcategoryId(Integer subcategoryId, Pageable pageable);

    @Query(value = "SELECT * FROM appeal WHERE admin_id = :adminId ORDER BY created_at ASC", nativeQuery = true)
    Page<Appeal> findByAdminId(UUID adminId, Pageable pageable);
    @Query(value = "SELECT * FROM appeal WHERE sub_category_id = :subcategoryId AND appeal_type_id = :appealTypeId ORDER BY created_at ASC", nativeQuery = true)
    Page<Appeal> findBySubcategoryIdAndAppealTypeId(Integer subcategoryId, Integer appealTypeId, Pageable pageable);



}
