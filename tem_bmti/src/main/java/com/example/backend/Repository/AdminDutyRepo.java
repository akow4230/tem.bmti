package com.example.backend.Repository;

import com.example.backend.Entity.AdminDuty;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface AdminDutyRepo extends JpaRepository<AdminDuty, Integer> {
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM admin_duty WHERE admin_id = :adminId", nativeQuery = true)
    void deleteByAdminId(UUID adminId);

    @Query(value = "select * from admin_duty where admin_id = :adminId", nativeQuery = true)
    List<AdminDuty> findAllByAdminId(UUID adminId);

    @Query(value = "select * from admin_duty where admin_id=:adminId and sub_category_id=:subCategoryId", nativeQuery = true)
    List<AdminDuty> existsByAdminIdAndSubCategoryId( UUID adminId,  Integer subCategoryId);

}
