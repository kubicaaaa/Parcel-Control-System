package app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Parcel {
        @Id
        private int id;
        private String name;
        private LocalDate CreationTime;
        private String desc;

        public Parcel() {
                this.CreationTime = LocalDate.now();
        }
}
