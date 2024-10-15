package com.example.backend.Controller;

import com.example.backend.Entity.Student;
import com.example.backend.Repository.StudentRepo;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/student")
@RequiredArgsConstructor
public class StudentController {
    private final StudentRepo studentRepo;
    private static final Logger logger = LoggerFactory.getLogger(StudentController.class);

    // Save or update student details
    @PostMapping
    public HttpEntity<?> addStudent(@RequestBody Student student) {
        logger.debug("Received student: {}", student);

        return studentRepo.findByPassport_pin(student.getPassport_pin())
                .map(existingStudent -> {
                    // Update existing student details
                    existingStudent.setFirst_name(student.getFirst_name());
                    existingStudent.setSecond_name(student.getSecond_name());
                    existingStudent.setImage(student.getImage());
                    existingStudent.setGroup_name(student.getGroup_name());
                    existingStudent.setLevel(student.getLevel());
                    existingStudent.setUpdated_at(LocalDateTime.now());

                    Student updatedStudent = studentRepo.save(existingStudent);
                    return new ResponseEntity<>(updatedStudent, HttpStatus.OK);
                })
                .orElseGet(() -> {
                    // Save new student
                    Student savedStudent = studentRepo.save(student);
                    return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
                });
    }

    // Get a list of students by group name
    @GetMapping("/group/{groupName}")
    public HttpEntity<?> getStudentsByGroup(@PathVariable String groupName) {
        List<Student> studentsInGroup = studentRepo.findAllByGroup(groupName);
        return ResponseEntity.ok(studentsInGroup);
    }

    // Get a student by passport pin
    @GetMapping("/{passportPin}")
    public HttpEntity<?> getStudentByPassportPin(@PathVariable String passportPin) {
        Student student = studentRepo.findByPassport_pin(passportPin)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return ResponseEntity.ok(student);
    }

    // Get student data by token (Calls external API using the token)
    @GetMapping("/account/{token}")
    public HttpEntity<?> getStudentByToken(@PathVariable String token) {
        try {
            System.out.println(token);
            RestTemplate restTemplate = new RestTemplate();
            String externalApiUrl = "https://student.bmti.uz/rest/v1/account/me";
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + token);
            HttpEntity<String> request = new HttpEntity<>(headers);
            ResponseEntity<Map> response = restTemplate.exchange(
                    externalApiUrl,
                    HttpMethod.GET,
                    request,
                    Map.class
            );

            // Check if the response is OK and process the data
            if (response.getStatusCode() == HttpStatus.OK) {
                Map<String, Object> responseBody = response.getBody();
                Map<String, Object> data = (Map<String, Object>) responseBody.get("data");
                Map<String, Object> group = (Map<String, Object>) data.get("group");
                Map<String, Object> level = (Map<String, Object>) data.get("level");

                // Save the student data to the local database
                Student student = new Student(
                        (String) data.get("first_name"),
                        (String) data.get("second_name"),
                        (String) data.get("image"),
                        (String) group.get("name"),
                        (String) level.get("name"),
                        (String) data.get("passport_pin")
                );

                return addStudent(student); // Save or update the student
            } else {
                return new ResponseEntity<>("Failed to fetch student data", HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {
            logger.error("Error fetching student data by token: ", e);
            return new ResponseEntity<>("Error occurred while fetching student data", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
