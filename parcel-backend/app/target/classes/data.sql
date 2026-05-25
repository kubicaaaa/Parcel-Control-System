CREATE TABLE IF NOT EXISTS parcel (
                                      id INT PRIMARY KEY,
                                      status VARCHAR(50),
    sender VARCHAR(255),
    receiver VARCHAR(255),
    destination VARCHAR(255),
    size VARCHAR(50),
    creation_time DATE
    );

INSERT INTO parcel (status, sender, receiver, destination, size, creation_time) VALUES ('SENT', 'John Doe', 'Jane Smith', 'Warsaw', 'SMALL', '2026-05-01');
INSERT INTO parcel (status, sender, receiver, destination, size, creation_time) VALUES ('SENT', 'Alice Brown', 'Bob Johnson', 'Krakow', 'MEDIUM', '2026-05-10');
INSERT INTO parcel (status, sender, receiver, destination, size, creation_time) VALUES ('DELIVERED', 'Charlie White', 'Diana Black', 'Gdansk', 'LARGE', '2026-05-15');
INSERT INTO parcel (status, sender, receiver, destination, size, creation_time) VALUES ('CANCELLED', 'Eve Green', 'Frank Blue', 'Poznan', 'SMALL', '2026-05-20');
INSERT INTO parcel (status, sender, receiver, destination, size, creation_time) VALUES ('CANCELLED', 'Grace Red', 'Henry Yellow', 'Wroclaw', 'MEDIUM', '2026-05-22');