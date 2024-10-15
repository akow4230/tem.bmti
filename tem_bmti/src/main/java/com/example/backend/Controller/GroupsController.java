package com.example.backend.Controller;

import com.example.backend.Entity.Groups;
import com.example.backend.Repository.GroupsRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1/groups")
public class GroupsController {
    private final GroupsRepo groupsRepo;
    private final RestTemplate restTemplate;

    @PostMapping("/{token}")
    public HttpEntity<?> postAllGroups(@PathVariable String token) {
        String apiUrl = "https://student.bmti.uz/rest/v1/data/group-list";
        int page = 1;
        int allPages=55;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<?> requestEntity = new HttpEntity<>(headers);

        try {
            while (allPages>page) {
                String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                        .queryParam("page", page)
                        .toUriString();

                ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, requestEntity, Map.class);
                Map<String, Object> body = response.getBody();
                System.out.println(body);
                if (body != null && body.containsKey("data")) {
                    Object dataObj = body.get("data");

                    // Check if the "data" field is a List or a Map
                    if (dataObj instanceof Map) {
                        Map<String, Object> dataMap = (Map<String, Object>) dataObj;
                        List<Map<String, Object>> items = (List<Map<String, Object>>) dataMap.get("items");
                        for (Map<String, Object> groupData : items) {
                            Groups group = mapToGroupEntity(groupData);
                            groupsRepo.save(group);
                        }
                    }

                   page+=1;
                } else {
                    allPages = 0;  // Stop if response body is empty
                }
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while saving groups: " + e.getMessage());
        }

        return ResponseEntity.ok("Groups saved successfully");
    }

    private Groups mapToGroupEntity(Map<String, Object> groupData) {
        String name = (String) groupData.get("name");
        String departmentName = extractNestedField(groupData, "department", "name");
        String specialtyName = extractNestedField(groupData, "specialty", "name");
        String educationLangName = extractNestedField(groupData, "educationLang", "name");
        return new Groups(departmentName, name, specialtyName, educationLangName);
    }
    private String extractNestedField(Map<String, Object> data, String field, String subField) {
        if (data.containsKey(field)) {
            Map<String, Object> nestedField = (Map<String, Object>) data.get(field);
            if (nestedField != null && nestedField.containsKey(subField)) {
                return (String) nestedField.get(subField);
            }
        }
        return null; // Return null if any field is missing
    }


    @GetMapping("/department/{departmentName}")
    public ResponseEntity<List<Groups>> getGroupsByDepartment(@PathVariable String departmentName) {
        try {
            List<Groups> groups = groupsRepo.findByDepartmentName(departmentName);
            if (groups.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.emptyList());  // No groups found
            }
            return ResponseEntity.ok(groups);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());  // Error occurred
        }
    }

    @GetMapping("/departments")
    public ResponseEntity<List<String>> getAllDepartmentNames() {
        try {
            List<String> departmentNames = groupsRepo.findAllDistinctDepartmentNames();
            return ResponseEntity.ok(departmentNames);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());  // Error occurred
        }
    }
}
