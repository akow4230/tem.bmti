package com.example.backend.Controller;

import com.example.backend.Entity.Subject;
import com.example.backend.Repository.SubjectRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/subject")
@RequiredArgsConstructor
public class SubjectController {
    private final SubjectRepo subjectRepo;

    // POST: Create a new subject
    @PostMapping
    public ResponseEntity<Subject> createSubject(@RequestBody Subject subject) {
        Subject savedSubject = subjectRepo.save(subject);
        return new ResponseEntity<>(savedSubject, HttpStatus.CREATED);
    }

    // GET: Retrieve all subjects
    @GetMapping
    public ResponseEntity<Iterable<Subject>> getAllSubjects() {
        Iterable<Subject> subjects = subjectRepo.findAll();
        return new ResponseEntity<>(subjects, HttpStatus.OK);
    }

    @GetMapping("/{groupName}")
    public ResponseEntity<Subject> getSubjectByGroupName(@PathVariable String groupName) {
        Optional<Subject> subject = subjectRepo.findByGroupName(groupName);
        return subject.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // PUT: Update an existing subject
    @PutMapping("/{id}")
    public ResponseEntity<Subject> updateSubject(@PathVariable Integer id, @RequestBody Subject updatedSubject) {
        if (!subjectRepo.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        updatedSubject.setId(id);
        Subject savedSubject = subjectRepo.save(updatedSubject);
        return new ResponseEntity<>(savedSubject, HttpStatus.OK);
    }

    // DELETE: Remove a subject by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubject(@PathVariable Integer id) {
        if (!subjectRepo.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        subjectRepo.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
