package com.example.backend.Repository;

import com.example.backend.Entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SubjectRepo extends JpaRepository<Subject, Integer> {

    @Query(value = "SELECT * FROM subjects WHERE group_name = :groupName", nativeQuery = true)
    Optional<Subject> findByGroupName(@Param("groupName") String groupName);

}
