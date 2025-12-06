package com.studybuddy;

import com.studybuddy.model.Module;
import com.studybuddy.model.Note;
import com.studybuddy.repository.ModuleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class StudyBuddyApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudyBuddyApplication.class, args);
    }

    @Bean
    CommandLineRunner seedData(ModuleRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                Module calculus = new Module("Calculus I", "written");
                calculus.addNote(new Note("Integration basics"));

                Module db = new Module("Database Systems", "presentation");
                db.addNote(new Note("ER modeling summary"));

                repository.save(calculus);
                repository.save(db);
            }
        };
    }
}
