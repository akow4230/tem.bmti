package com.example.backend.Repository;

import com.example.backend.Entity.Groups;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GroupsRepo extends JpaRepository<Groups, Integer> {

    @Query(value = "SELECT * FROM groups WHERE department = ?1", nativeQuery = true)
    List<Groups> findByDepartmentName(String departmentName);

    @Query(value = "SELECT DISTINCT department FROM groups", nativeQuery = true)
    List<String> findAllDistinctDepartmentNames();
}
