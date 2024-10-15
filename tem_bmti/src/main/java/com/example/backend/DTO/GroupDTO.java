package com.example.backend.DTO;

import com.example.backend.Entity.Student;
import com.example.backend.Entity.VoteSubject;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class GroupDTO {
    private String groupName;
    private List<Student> students;
    private List<VoteSubject> voteSubjects;
}
