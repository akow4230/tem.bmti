package com.example.backend.Repository;

import com.example.backend.Entity.VoteSubject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface VoteSubjectRepo extends JpaRepository<VoteSubject, UUID> {

    @Query(value = "SELECT * FROM vote_subject WHERE student_id = :studentId", nativeQuery = true)
    VoteSubject findByStudentId(@Param("studentId") UUID studentId);

    @Query(value = "SELECT * FROM vote_subject vs WHERE vs.student_id IN :studentIds", nativeQuery = true)
    List<VoteSubject> findAllByStudentIds(@Param("studentIds") List<UUID> studentIds);
}
