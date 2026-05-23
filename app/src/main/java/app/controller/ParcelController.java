package app.controller;

import app.model.Parcel;
import app.service.ParcelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/parcels")
public class ParcelController {

    private final ParcelService service;

    public ParcelController(ParcelService service) {
        this.service = service;
    }

    @GetMapping
    public List<Parcel> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Parcel> getById(@PathVariable int id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Parcel create(@RequestBody Parcel parcel) {
        return service.create(parcel);
    }

    @PutMapping("/{id}")
    public Parcel update(@PathVariable int id, @RequestBody Parcel parcel) {
        return service.update(id, parcel);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}