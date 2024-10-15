package com.example.backend.Controller;

import com.example.backend.Entity.Student;
import com.example.backend.Entity.Subject;
import com.example.backend.Entity.VoteSubject;
import com.example.backend.Repository.StudentRepo;
import com.example.backend.Repository.SubjectRepo;
import com.example.backend.Repository.VoteSubjectRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/votesubject")
@RequiredArgsConstructor
public class VoteSubjectController {
    private final VoteSubjectRepo voteSubjectRepo;
    private final StudentRepo studentRepo;
    private final SubjectRepo subjectRepo;
    // POST: Create a new vote
    @PostMapping
    public HttpEntity<?> createVote(@RequestBody VoteSubject vote) {
        VoteSubject savedVote = voteSubjectRepo.save(vote);
        return ResponseEntity.ok("Vote saved successfully!");
    }

    // GET: Retrieve all votes
    @GetMapping
    public HttpEntity<?> getAllVotes() {
        Iterable<VoteSubject> votes = voteSubjectRepo.findAll();
        return ResponseEntity.ok(votes);
    }

    // GET by student ID: Retrieve votes by student ID
    @GetMapping("/student/{passportPin}")
    public HttpEntity<?> getVoteByStudentId(@PathVariable String passportPin) {
        Student student = studentRepo.findByPassport_pin(passportPin).orElseThrow();
        VoteSubject voteSubject = voteSubjectRepo.findByStudentId(student.getId());
        if (voteSubject == null){
            System.out.println(1);
            Optional<Subject> subject = subjectRepo.findByGroupName(student.getGroup_name());
            if(subject.isEmpty()){
                System.out.println(2);
                return ResponseEntity.ok("Siz uchun tanlov fanlari mavjud emas!");
            }
            System.out.println(3);
            VoteSubject voteSubject1 = new VoteSubject(student, subject.get(), 0);
            voteSubjectRepo.save(voteSubject1);
            return ResponseEntity.ok(voteSubject1);

        }
        return ResponseEntity.ok(voteSubject);

    }

    // PUT: Update an existing vote
    @PutMapping("/{id}/{status}")
    public ResponseEntity<VoteSubject> updateVote(@PathVariable UUID id, @PathVariable Integer status) {
        System.out.println(status);
        VoteSubject existingVote = voteSubjectRepo.findById(id).orElseThrow();
        existingVote.setStatus(status); // Update the status
        VoteSubject savedVote = voteSubjectRepo.save(existingVote); // Save the updated object

        return new ResponseEntity<>(savedVote, HttpStatus.OK);
    }



    // DELETE: Remove a vote by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVote(@PathVariable UUID id) {
        if (!voteSubjectRepo.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        voteSubjectRepo.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
