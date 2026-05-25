package app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Parcel {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;

        @Enumerated(EnumType.STRING)
        private Status status;

        private String sender;
        private String receiver;
        private String destination;

        @Enumerated(EnumType.STRING)
        private Size size;

        private LocalDate creationTime;

        public Parcel() {
                this.creationTime = LocalDate.now();
        }
}
