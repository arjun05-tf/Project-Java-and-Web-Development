package com.studybuddy.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "modules")
public class Module {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String examType;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "module_id")
    private List<Note> notes = new ArrayList<>();

    private Integer tokensEarned = 0;

    public Module() {}

    public Module(String name, String examType) {
        this.name = name;
        this.examType = examType;
    }

    // getters / setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getExamType() { return examType; }
    public void setExamType(String examType) { this.examType = examType; }

    public List<Note> getNotes() { return notes; }
    public void setNotes(List<Note> notes) { this.notes = notes; }

    public Integer getTokensEarned() { return tokensEarned; }
    public void setTokensEarned(Integer tokensEarned) { this.tokensEarned = tokensEarned; }

    public void addNote(Note note) { this.notes.add(note); }

    public void removeNoteById(Long noteId) { this.notes.removeIf(n -> Objects.equals(n.getId(), noteId)); }
}
