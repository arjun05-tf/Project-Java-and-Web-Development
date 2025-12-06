package com.studybuddy.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import com.studybuddy.exception.NotFoundException;
import com.studybuddy.model.Module;
import com.studybuddy.model.Note;
import com.studybuddy.repository.ModuleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ModuleService {

    private final ModuleRepository repository;
    private final ObjectMapper objectMapper;

    public ModuleService(ModuleRepository repository, ObjectMapper objectMapper) {
        this.repository = repository;
        this.objectMapper = objectMapper;
    }

    public List<Module> listAll() {
        return repository.findAll();
    }

    public Module create(Module module) {
        if (module.getTokensEarned() == null) module.setTokensEarned(0);
        return repository.save(module);
    }

    public Module getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("Module not found: " + id));
    }

    public Module updatePartial(Long id, Map<String, Object> patch) {
        Module existing = getById(id);

        if (patch.containsKey("name")) {
            Object val = patch.get("name");
            if (val != null) existing.setName(String.valueOf(val));
        }
        if (patch.containsKey("examType")) {
            Object val = patch.get("examType");
            if (val != null) existing.setExamType(String.valueOf(val));
        }
        if (patch.containsKey("tokensEarned")) {
            Object val = patch.get("tokensEarned");
            if (val instanceof Number) {
                existing.setTokensEarned(((Number) val).intValue());
            } else {
                try {
                    existing.setTokensEarned(Integer.parseInt(String.valueOf(val)));
                } catch (NumberFormatException ignored) {}
            }
        }
        if (patch.containsKey("notes")) {
            Object notesObj = patch.get("notes");
            if (notesObj != null) {
                try {
                    CollectionType listType = objectMapper.getTypeFactory().constructCollectionType(List.class, Note.class);
                    List<Note> notes = objectMapper.convertValue(notesObj, listType);
                    existing.setNotes(notes);
                } catch (IllegalArgumentException ignored) { }
            }
        }

        return repository.save(existing);
    }

    public void delete(Long id) {
        if (repository.findById(id).isEmpty()) {
            throw new NotFoundException("Module not found: " + id);
        }
        repository.deleteById(id);
    }
}
