package com.studybuddy.controller;

import com.studybuddy.model.Module;
import com.studybuddy.service.ModuleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/modules")
public class ModuleController {

    private final ModuleService service;

    public ModuleController(ModuleService service) {
        this.service = service;
    }

    @GetMapping
    public List<Module> listAll() {
        return service.listAll();
    }

    @PostMapping
    public ResponseEntity<Module> createModule(@Valid @RequestBody Module module) {
        Module created = service.create(module);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public Module getModule(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Module updateModule(@PathVariable Long id, @RequestBody Map<String, Object> patch) {
        // Accept partial updates using a generic map - frontend sends {name:..., examType:...} etc.
        return service.updatePartial(id, patch);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteModule(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
